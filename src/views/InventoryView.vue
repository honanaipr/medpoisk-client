<script setup lang="ts">
import router from '../router'
import { useListStore } from '../stores/list_store'
import SwipeItem from '../components/SwipeItem.vue'
import SwipeContainer from '../components/SwipeContainer.vue'
import { ref } from 'vue'
import { ListItem } from '@/types'
import PlaceFilter from '../components/PlaceFilter.vue'
import SearchComponent from '../components/SearchComponent.vue'
import SwipeHintsComponent from '../components/SwipeHintsComponent.vue'
import EmptyListHint from '../components/EmptyListHint.vue'
import InventoryItem from '../components/InventoryItem.vue'

const list_store = useListStore()

function singularWriteOff(product_id: number) {
  list_store.toBasketById(product_id)
  router.push('basket')
}

defineProps({
  items: { type: Array<ListItem>, required: true },
  itemComponent: null,
})

defineEmits(['left', 'right'])

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
  <div class="container control-container is-fluid">
    <PlaceFilter v-model="selectedCategories" />
    <div class="content">
      <h3>Наименования</h3>
    </div>
    <SearchComponent v-model="serachQuery" />
    <SwipeHintsComponent />
    <EmptyListHint v-if="!list_store.persistent.length" />
    <SwipeContainer>
      <SwipeItem
        v-for="item in list_store.persistent"
        :key="item.product.id"
        @right="singularWriteOff"
        @left="list_store.toBasketById"
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
