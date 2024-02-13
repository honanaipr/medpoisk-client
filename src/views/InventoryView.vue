<script setup lang="ts">
import router from '../router'
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

const list = computed<InventoryJointItem[]>(() => {
  const inventoryJointItems: InventoryJointItem[] = []
  for (const product of productStore.products) {
    const limit =
      limitStore.limits.find((limitItem) => limitItem.product_id == product.id)?.min_amount || 0
    const inventoryJointItem: InventoryJointItem = { product, limit, allocations: [], amount: 0 }
    for (const inventoryItem of inventoryStore.inventory.filter(
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
        v-for="item in list.filter((n) => !cartStore.ids.has(n.product.id))"
        :key="item.product.id"
        @right="
          () => {
            cartStore.ids.clear()
            cartStore.ids.add(item.product.id)
            router.push('cart')
          }
        "
        @left="
          () => {
            cartStore.ids.add(item.product.id)
          }
        "
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
