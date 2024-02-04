<script setup lang="ts">
import router from '../router'
import { useListStore } from '../stores/list_store'
import SwipeItem from '@/components/swipe/SwipeItem.vue'
import SwipeContainer from '@/components/swipe/SwipeContainer.vue'
import { ref } from 'vue'
import { ListItem } from '@/types'
import PlaceFilter from '@/components/common/PlaceFilter.vue'
import SearchComponent from '@/components/common/SearchComponent.vue'
import SwipeHintsComponent from '@/components/swipe/SwipeHintsComponent.vue'
import EmptyListHint from '@/components/common/EmptyListHint.vue'
import InventoryItem from '../components/InventoryItem.vue'

const list_store = useListStore()

function singularWriteOff(product_id: number) {
  list_store.toCartById(product_id)
  router.push('cart')
}

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
</script>

<template>
  <div class="inventory-view">
    <PlaceFilter v-model="selectedCategories" />
    <h1>Наименования</h1>
    <SearchComponent v-model="serachQuery" />
    <SwipeHintsComponent />
    <EmptyListHint v-if="!list_store.persistent.length" />
    <SwipeContainer class="item-container">
      <SwipeItem
        v-for="item in list_store.persistent"
        :key="item.product.id"
        @right="()=>singularWriteOff(item.product.id)"
        @left="()=>list_store.toCartById(item.product.id)"
      >
        <template #right>
          <slot name="left-icon">
          </slot>
        </template>
        <template #left>
          <slot name="right-icon">
          </slot>
        </template>
        <InventoryItem :listItem="item" v-if="filter(item)" @doubleClick="$router.push({ name: 'product', params: { id: item.product.id } })"/>
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