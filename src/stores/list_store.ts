import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import showToast from '../toast'

import { InventoryItem, ListItem, ListItemState, Place } from '../types'

import { useInventoryStore } from './inventory_store'
import { useLimitStore } from './limit_store'

export const useListStore = defineStore('list', () => {
  const states = ref(new Map())

  const list = computed(() => {
    const inventory_store = useInventoryStore()
    const limit_store = useLimitStore()
    const inventoryMap: Record<Place, InventoryItem> = new Map()
    for (const inventoryItem of inventory_store.inventory) {
      if (inventoryMap.has(inventoryItem.product)) {
        inventoryMap
          .get(inventoryItem.product)
          .places.set(inventoryItem.place, inventoryItem.amount)
      } else {
        inventoryMap.set(inventoryItem.product, { places: new Map() })
        inventoryMap
          .get(inventoryItem.product)
          .places.set(inventoryItem.place, inventoryItem.amount)
      }
    }
    const list = []
    for (const inventoryItem of inventoryMap) {
      const data = { product: inventoryItem[0], amount: 0, places: [] }
      for (const place of inventoryItem[1].places) {
        data.places.push(place[0])
        data.amount += place[1]
      }
      if (states.value.has(data.product.id)) {
        data.state = states.value.get(data.product.id)
      } else {
        states.value.set(data.product.id, ListItemState.PERSISTENT)
        data.state = states.value.get(data.product.id)
      }
      data.limit = limit_store.byId(data.product.id).min_amount
      list.push(new ListItem(data))
    }
    return list
  })

  const persistent = computed<Array<ListItem>>(() => {
    return list.value.filter((item) => item.state == ListItemState.PERSISTENT)
  })

  const basketed = computed<Array<ListItem>>(() => {
    return list.value.filter((item) => item.state == ListItemState.PENDING_DELETION)
  })

  function toBasketById(id: number) {
    if (states.value.has(id)) {
      states.value.set(id, ListItemState.PENDING_DELETION)
    } else {
      throw Error(`id ${id} not found`)
    }
    showToast('Basketed' + id)
  }
  function unBasketById(id: number) {
    const inventory_store = useInventoryStore()
    const item = inventory_store.inventory.value.find((n) => n.product.id == id)
    item.state = ListItemState.PERSISTENT
    item.targetAmount = null
    item.targetPlaceId = null
    showToast('Basketed' + item)
  }

  function clearBasket() {}

  return { list, basketed, persistent, toBasketById, unBasketById, clearBasket }
})
