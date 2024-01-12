import { defineStore } from 'pinia'
import { ref } from 'vue'
import showToast from '../toast'
import axios from 'axios'
import messaegs from '../messaegs'
import Joi from 'joi'

import { InventoryItem } from '../types'
import { inventoryItemSchema } from '../schemas'

import { API_INVENTORY_PATH } from '../pathes'

import { useAuthStore } from './auth_store'

export const useInventoryStore = defineStore('inventory', () => {
  const inventory = ref([])

  const auth_store = useAuthStore()
  async function update() {
    return axios
      .get(API_INVENTORY_PATH, {
        headers: { Authorization: `Bearer ${await auth_store.getFreshToken()}` }
      })
      .then((responce) => {
        const joiResult = Joi.array().items(inventoryItemSchema).validate(responce.data)
        if (joiResult.error) {
          throw new Error(joiResult.error?.message)
        }
        const value = joiResult.value.map((item) => new InventoryItem(item))
        console.log(value)
        inventory.value = value
        showToast(messaegs.INVENTORY_UPDATE_OK_MESSAGE)
      })
      .catch((error) => {
        showToast(messaegs.INVENTORY_UPDATE_ERROR_MESSAGE)
        throw error
      })
  }

  function byId(product_id: number) {
    return inventory.value.find((item) => item.product.id == product_id)
  }

  return { inventory, update, byId }
})
