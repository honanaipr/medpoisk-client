<script setup lang="ts">
import SwipeItem from '@/components/swipe/SwipeItem.vue'
import SwipeContainer from '@/components/swipe/SwipeContainer.vue'
import { ref, computed } from 'vue'
import PlaceFilter from '@/components/common/PlaceFilter.vue'
import SearchComponent from '@/components/common/SearchComponent.vue'
import SwipeHintsComponent from '@/components/swipe/SwipeHintsComponent.vue'
import EmptyListHint from '@/components/common/EmptyListHint.vue'
import { useCartStore } from '@/stores/cart_store'
import { useInventoryStore } from '@/stores/inventory_store'
import type { InventoryJointItem } from '@/stores/inventory_store'
import { useLimitStore } from '@/stores/limit_store'
import { useProductStore } from '@/stores/product_store'
import InventoryListItem from '@/components/InventoryListItem.vue'
import type { Place } from '@/stores/place_store'
import { useRouter } from 'vue-router'

const router = useRouter()

const productStore = useProductStore()
const inventoryStore = useInventoryStore()
const cartStore = useCartStore()
const limitStore = useLimitStore()

let serachQuery = ref('')
let selectedCategories = ref<Place[]>([])

function filter(item: InventoryJointItem) {
  if (serachQuery.value) {
    return item.product.title.toLowerCase().includes(serachQuery.value.toLowerCase())
  }
  if (selectedCategories.value.length) {
    if (
      !item.allocations.filter(
        (allocation) =>
          selectedCategories.value.filter(
            (selectedPlsace) => allocation.place.id == selectedPlsace.id
          ).length
      ).length
    ) {
      return false
    }
  }
  return true
}

const list = computed(()=>inventoryStore.jointInventory)

function onRight(item: InventoryJointItem) {
  if(item.amount) {
    cartStore.clearCart()
    cartStore.cartProductById(item.product.id)
    const cartProduct = cartStore.getCartedProductById(item.product.id)
    if (cartProduct) {
      cartProduct.cartedAmount = cartProduct.amount
    }
    router.push('cart')
  }
}

function onLeft(item: InventoryJointItem) {
  if(item.amount) {
    cartStore.cartProductById(item.product.id)
  }
}

</script>

<template>
  <div class="inventory-view">
    <PlaceFilter v-model="selectedCategories" />
    <h1>Наименования</h1>
    <SearchComponent v-model="serachQuery" />
    <SwipeHintsComponent />
    <EmptyListHint v-if="!list.length" />
    <SwipeContainer class="item-container">
      <SwipeItem
        v-for="item in list"
        :key="item.product.id"
        @right="onRight(item)"
        @left="onLeft(item)"
      >
        <template #right>
          <slot name="left-icon"> </slot>
        </template>
        <template #left>
          <slot name="right-icon"> </slot>
        </template>
        <InventoryListItem
          :item="item"
          v-if="filter(item)"
          :carted="cartStore.ids.has(item.product.id)"
          @update:modelValue="(value: number)=>{
            const cartedItem = cartStore.getCartedProductById(item.product.id)
            if (cartedItem) {
              cartedItem.cartedAmount = value
            }
          }"
          :modelValue="(()=>{
            const cartedItem = cartStore.getCartedProductById(item.product.id)
            if (cartedItem) {
              return cartedItem.cartedAmount
            }
          })()"
          @doubleClick="$router.push({ name: 'product', params: { id: item.product.id } })"
        />
      </SwipeItem>
    </SwipeContainer>
  </div>
</template>
<style scoped lang="sass">
.inventory-view
  display: flex
  flex-direction: column
  gap: 16px
.item-container
  display: flex
  flex-direction: column
  gap: 16px
</style>
