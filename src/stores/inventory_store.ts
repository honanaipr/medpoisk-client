import { defineStore } from 'pinia'
import { ref, Ref } from 'vue'
import showToast from '../toast'
import axios from 'axios'
import messaegs from '../messaegs'
import Joi from 'joi'

import { InventoryItem, ListItem, ListItemState } from '../types'
import { inventoryItemSchema } from '../schemas'

import { API_INVENTORY_PATH } from '../pathes'

import { useAuthStore } from './auth_store'

export const useInventoryStore = defineStore('inventory', () => {
  const inventory: Ref<Array<InventoryItem>> = ref([])

  // const list = computed(() => {
  //   let inventoryMap = new Map()
  //   for (const inventoryItem of inventory.value) {
  //     if (inventoryMap.has(inventoryItem.product)){
  //       inventoryMap.get(inventoryItem.product).places.set(inventoryItem.place, inventoryItem.amount)
  //     } else {
  //       inventoryMap.set(inventoryItem.product, {places: new Map()})
  //       inventoryMap.get(inventoryItem.product).places.set(inventoryItem.place, inventoryItem.amount)
  //     }
  //   }
  //   let list = []
  //   for (const inventoryItem of inventoryMap) {
  //     let data = {product: inventoryItem[0], amount: 0, places: []}
  //     for (const place of inventoryItem[1].places) {
  //       data.places.push(place[0])
  //       data.amount += place[1]
  //     }
  //     list.push(new ListItem(data))
  //   }
  //   return list
  // })

  // const basket = computed(() => {
  //   // return inventory.value.filter((item) => !!item.stat)
  //   return list.value.filter((item) => item.state == 3)
  // })

  const auth_store = useAuthStore()
  async function update() {
    return axios
      .get(API_INVENTORY_PATH, {
        headers: { Authorization: `Bearer ${await auth_store.getFreshToken()}` }
      })
      .then((responce) => {
        let { value, error } = Joi.array().items(inventoryItemSchema).validate(responce.data)
        if (error) {
          throw new Error(error)
        }
        value = value.map((item) => new InventoryItem(item))
        console.log(value)
        inventory.value = value
        showToast(messaegs.INVENTORY_UPDATE_OK_MESSAGE)
      })
      .catch((error) => {
        showToast(messaegs.INVENTORY_UPDATE_ERROR_MESSAGE)
        throw error
      })
  }

  //   function add(name) {
  //     axios
  //     Promise.resolve(name)
  //       .then((responce) => {
  //         console.log(responce.data)
  //         showToast(messaegs.INVENTORY_ADD_OK_MESSAGE)
  //         inventory.value.push(name)
  //       })
  //       .catch((error) => {
  //         console.log(error)
  //         showToast(messaegs.INVENTORY_ADD_ERROR_MESSAGE)
  //         throw error
  //       })
  //   }

  function byId(id) {
    return inventory.value.find((item) => item.id == id)
  }

  function byName(name) {
    return inventory.value.find((item) => item.name == name)
  }

  return { inventory, update, byId, byName }
})
