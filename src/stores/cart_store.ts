import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useProductStore } from '@/stores/product_store'
import type { Product } from '@/stores/product_store'
import type { Place } from '@/stores/place_store'
import { useLimitStore } from './limit_store'
import { useInventoryStore } from './inventory_store'

interface Alocation {
  place: Place | null
  amount: 0
}

export interface CartItem {
  product: Product
  amount: number
  cartedAmount: number
  limit: number
  alocations: Alocation[]
}

export const useCartStore = defineStore('cart', () => {
  const ids = ref<Set<number>>(new Set<number>())
  const cartItems = ref<Set<CartItem>>(new Set())
  function cartProductById(productId: number): boolean {
    const product_store = useProductStore()
    const limitStore = useLimitStore()
    const inventoryStore = useInventoryStore()
    const product = product_store.products.find((product) => product.id == productId)
    const amount = inventoryStore.jointInventory.find((item) => item.product.id == productId)?.amount
    if (!product || !amount) return false
    const cartItem: CartItem = {
      product,
      alocations: [],
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
      if (cartItem.product.id == productId) {
        cartItems.value.delete(cartItem)
        ids.value.delete(productId)
        return true
      }
    }
    return false
  }
  function getCartedProductById(productId: number): CartItem|undefined {
    for (const cartItem of cartItems.value) {
      if (cartItem.product.id == productId) {
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
