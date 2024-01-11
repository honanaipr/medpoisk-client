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

  function byId(id) {
    return inventory.value.find((item) => item.id == id)
  }

  function byName(name) {
    return inventory.value.find((item) => item.name == name)
  }

  return { inventory, update, byId, byName }
})
