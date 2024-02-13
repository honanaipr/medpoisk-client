import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useProductStore } from '@/stores/product_store'
import { useInventoryStore } from '@/stores/inventory_store'
import type { Place, Product } from '@/types'
import { useLimitStore } from './limit_store'

interface Alocation {
  place: Place
  amount: 0
}

export interface CartItem {
  product: Product
  amount: number
  limit: number
  alocations: Alocation[]
}

export const useCartStore = defineStore('cart', () => {
  const ids = ref<Set<number>>(new Set<number>())
  const cart_items = computed<CartItem[]>(() => {
    const product_store = useProductStore()
    const carted_products = product_store.products.filter((product) => ids.value.has(product.id))
    return carted_products.map((product) => {
      const inventory_store = useInventoryStore()
      const limitStore = useLimitStore()
      const inventory = inventory_store.inventory.filter(
        (inventory_item) => inventory_item.product.id == product.id
      )
      const cartItem: CartItem = {
        product,
        alocations: [],
        amount: 0,
        limit: limitStore.limits.find((n) => (n.product_id = product.id))?.min_amount ?? 0,
      }
      for (const item of inventory) {
        cartItem.alocations.push({
          place: item.place,
          amount: 0,
        })
        cartItem.amount += item.amount
      }
      return cartItem
    })
  })
  const forDoctor = ref('')
  const forRoom = ref('')
  const isCartFullfilled = computed(() => {
    return !!forDoctor.value && !!forRoom.value
  })
  return { ids, cart_items, forDoctor, forRoom, isCartFullfilled }
})
