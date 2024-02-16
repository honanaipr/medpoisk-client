import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Place } from '@/stores/place_store'
import { useLimitStore } from './limit_store'
import { useInventoryStore, type InventoryJointItem } from './inventory_store'

export interface Allocation {
  place: Place | null
  amount: 0
}

export interface CartItem {
  inventoryJointItem: InventoryJointItem
  amount: number
  cartedAmount: number
  limit: number
  allocations: Allocation[]
}

export const useCartStore = defineStore('cart', () => {
  const ids = ref<Set<number>>(new Set<number>())
  const cartItems = ref<Set<CartItem>>(new Set())
  function cartProductById(productId: number): boolean {
    const limitStore = useLimitStore()
    const inventoryStore = useInventoryStore()
    const inventoryJointItem = inventoryStore.jointInventory.find(item=>item.product.id == productId)
    const amount = inventoryStore.jointInventory.find((item) => item.product.id == productId)?.amount
    if (!inventoryJointItem || !amount) return false
    const cartItem: CartItem = {
      inventoryJointItem,
      allocations: [],
      amount,
      cartedAmount: 0,
      limit: limitStore.limits.find((n) => (n.product_id = productId))?.min_amount ?? 0,
    }
    cartItems.value.add(cartItem)
    ids.value.add(productId)
    return true
  }
  function uncartProductById(productId: number): boolean {
    for (const cartItem of cartItems.value) {
      if (cartItem.inventoryJointItem.product.id == productId) {
        cartItems.value.delete(cartItem)
        ids.value.delete(productId)
        return true
      }
    }
    return false
  }
  function getCartedProductById(productId: number): CartItem|undefined {
    for (const cartItem of cartItems.value) {
      if (cartItem.inventoryJointItem.product.id == productId) {
        return cartItem
      }
    }
  }
  function clearCart() {
    cartItems.value.clear()
    ids.value.clear()
  }
  const forDoctor = ref('')
  const forRoom = ref('')
  const isCartFullfilled = computed(() => {
    return !!forDoctor.value && !!forRoom.value
  })
  return { ids, cartItems, forDoctor, forRoom, isCartFullfilled, cartProductById, uncartProductById, getCartedProductById, clearCart }
})
