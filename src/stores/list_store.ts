import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import showToast from '../toast'

import { InventoryItem, ListItem, ListItemState, Place } from '../types'

import { useInventoryStore } from './inventory_store'
import { useLimitStore } from './limit_store'
import { useProductStore } from './product_store'

export const useListStore = defineStore('list', () => {
  const states = ref(new Map<number, ListItemState>())

  function update(){
    const inventory_store = useInventoryStore()
    inventory_store.update()
  }

  const inventory_store = useInventoryStore()
  const limit_store = useLimitStore()
  const product_store = useProductStore()
  const productsMap = new Map<number, Set<InventoryItem>>()

  const list = computed(() => {
    for (const inventoryItem of inventory_store.inventory) {
      if (productsMap.has(inventoryItem.product.id)) {
        productsMap.get(inventoryItem.product.id)?.add(inventoryItem)
      } else {
        productsMap.set(inventoryItem.product.id, new Set([inventoryItem]))
      }
    }

    const list: Array<ListItem> = []
    for (const n of productsMap) {
      const places = Array<Place>()
      let amount = 0
      let state
      for (const inventoryItem of n[1]) {
        places.push(inventoryItem.place)
        amount += inventoryItem.amount
      }
      if (states.value.has(n[0])) {
        state = states.value.get(n[0])
      } else {
        states.value.set(n[0], ListItemState.PERSISTENT)
        state = states.value.get(n[0])
      }
      const limit = limit_store.byId(n[0])?.min_amount

      list.push(new ListItem({ product: product_store.byId(n[0]), places: places, amount: amount, state: state, limit: limit, targetAmount: null, targetPlaceId: null }))
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
    if (states.value.has(id)) {
      states.value.set(id, ListItemState.PERSISTENT)
    } else {
      throw Error(`id ${id} not found`)
    }
    showToast('Unbasketed' + id)
  }

  function clearBasket() {}

  function byId(product_id: number){
    return list.value.find(n=>n.product.id == product_id)
  }

  return { list, basketed, persistent, toBasketById, unBasketById, clearBasket, byId, update }
})
