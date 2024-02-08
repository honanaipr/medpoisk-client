<script setup lang="ts">
import router from '../router'
import SwipeItem from '@/components/swipe/SwipeItem.vue'
import SwipeContainer from '@/components/swipe/SwipeContainer.vue'
import { ref, computed } from 'vue'
import { InventoryItem, ListItem } from '@/types'
import PlaceFilter from '@/components/common/PlaceFilter.vue'
import SearchComponent from '@/components/common/SearchComponent.vue'
import SwipeHintsComponent from '@/components/swipe/SwipeHintsComponent.vue'
import EmptyListHint from '@/components/common/EmptyListHint.vue'
import { useCartStore } from '@/stores/cart_store'
import { useInventoryStore } from '@/stores/inventory_store'
import { useLimitStore } from '@/stores/limit_store'
import { ListItemState, Place } from '@/types'
import { useProductStore } from '@/stores/product_store'
import InventoryListItem from '@/components/InventoryItem.vue'

const productStore = useProductStore()
const inventoryStore = useInventoryStore()
const cartStore = useCartStore()
const limitStore = useLimitStore()


let serachQuery = ref('')
let selectedCategories = ref([])

function filter(item: ListItem) {
  if (serachQuery.value) {
    return item.product.title.toLowerCase().includes(serachQuery.value.toLowerCase())
  }
  if (selectedCategories.value.length) {
    if (
      !item.places.filter(
        (value1) => selectedCategories.value.filter((value2) => value1.id == value2.id).length
      ).length
    ) {
      return false
    }
  }
  return true
}
const productsMap = new Map<number, Set<InventoryItem>>()
const states = ref(new Map<number, ListItemState>())
const list = computed(() => {
    for (const inventoryItem of inventoryStore.inventory) {
      if (productsMap.has(inventoryItem.product.id)) {
        productsMap.get(inventoryItem.product.id)?.add(inventoryItem)
      } else {
        productsMap.set(inventoryItem.product.id, new Set([inventoryItem]))
      }
    }

    const list: Array<ListItem> = []
    for (const n of productsMap) {
      const places = Array<Place>()
      let amount = 0
      let state
      for (const inventoryItem of n[1]) {
        places.push(inventoryItem.place)
        amount += inventoryItem.amount
      }
      if (states.value.has(n[0])) {
        state = states.value.get(n[0])
      } else {
        states.value.set(n[0], ListItemState.PERSISTENT)
        state = states.value.get(n[0])
      }
      const limit = limitStore.byId(n[0])?.min_amount

      list.push(
        new ListItem({
          product: productStore.byId(n[0]),
          places: places,
          amount: amount,
          state: state,
          limit: limit,
          targetAmount: null,
          targetPlaceId: null,
        })
      )
    }
    return list
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
        v-for="item in list.filter(n=>!cartStore.ids.has(n.product.id))"
        :key="item.product.id"
        @right="()=>{cartStore.ids.add(item.product.id);router.push('cart')}"
        @left="()=>{cartStore.ids.add(item.product.id)}"
      >
        <template #right>
          <slot name="left-icon">
          </slot>
        </template>
        <template #left>
          <slot name="right-icon">
          </slot>
        </template>
        <!-- {{ item }} -->
        <InventoryListItem :listItem="item" v-if="filter(item)" @doubleClick="$router.push({ name: 'product', params: { id: item.product.id } })"/>
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