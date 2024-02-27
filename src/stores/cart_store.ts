import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Place } from '@/stores/place_store'
import { useLimitStore } from '@/stores/limit_store'
import { useInventoryStore, type InventoryJointItem } from '@/stores/inventory_store'
import type { Doctor } from '@/stores/doctor_store'
import type { Room } from '@/stores/room_store'

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
  const forDoctor = ref<Doctor | null>(null)
  const forRoom = ref<Room | null>(null)
  const isCartFullfilled = computed(() => {
    let allAllocated = true
    for (const item of cartItems.value) {
      let allocatiedPerItem = 0
      for (const allocation of item.allocations) {
        allocatiedPerItem += allocation.amount
      }
      if (!!(item.cartedAmount - allocatiedPerItem)){
        allAllocated = false
        break
      }
    }
    return !!forRoom.value && allAllocated && !!cartItems.value.size
  })
  return { ids, cartItems, forDoctor, forRoom, isCartFullfilled, cartProductById, uncartProductById, getCartedProductById, clearCart }
})
