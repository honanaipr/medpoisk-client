import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Ref } from 'vue'
import showToast from '../toast'
import axios from 'axios'
import messaegs from '../messaegs'
import Joi from 'joi'
import { inventoryItemSchema } from '../schemas'
import { API_INVENTORY_PATH } from '../pathes'
import { useAuthStore } from './auth_store'
import { useProductStore, type Product } from './product_store'
import type { Place } from '@/stores/place_store'
import { useLimitStore } from './limit_store'

export interface InventoryItem {
  product: Product
  place: Place
  amount: number
}

export interface InventoryJointItem {
  product: Product
  amount: number
  limit: number
  allocations: { place: Place; amount: number }[]
}

export const useInventoryStore = defineStore('inventory', () => {
  const inventory: Ref<InventoryItem[]> = ref([])

  const auth_store = useAuthStore()
  async function update() {
    return axios
      .get(API_INVENTORY_PATH, {
        headers: { Authorization: `Bearer ${await auth_store.getFreshToken()}` },
      })
      .then((responce) => {
        const joiResult = Joi.array().items(inventoryItemSchema).validate(responce.data)
        if (joiResult.error) {
          throw new Error(joiResult.error?.message)
        }
        const value = joiResult.value.map((item) => item)
        inventory.value = value
        showToast(messaegs.INVENTORY_UPDATE_OK_MESSAGE)
      })
      .catch((error) => {
        showToast(messaegs.INVENTORY_UPDATE_ERROR_MESSAGE)
        throw error
      })
  }

  const jointInventory = computed<InventoryJointItem[]>(() => {
    const productStore = useProductStore()
    const limitStore = useLimitStore()
    const inventoryJointItems: InventoryJointItem[] = []
    for (const product of productStore.products) {
      const limit =
        limitStore.limits.find((limitItem) => limitItem.product_id == product.id)?.min_amount || 0
      const inventoryJointItem: InventoryJointItem = { product, limit, allocations: [], amount: 0 }
      for (const inventoryItem of inventory.value.filter(
        (inventoryItem) => inventoryItem.product.id == product.id
      )) {
        inventoryJointItem.allocations.push({
          place: inventoryItem.place,
          amount: inventoryItem.amount,
        })
        inventoryJointItem.amount += inventoryItem.amount
      }
      inventoryJointItems.push(inventoryJointItem)
    }
    return inventoryJointItems
  })

  function byId(product_id: number) {
    return inventory.value.find((item) => item.product.id == product_id)
  }

  return { inventory, jointInventory, update, byId }
})
