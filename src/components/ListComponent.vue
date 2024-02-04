<script setup lang="ts">
import SwipeItem from './SwipeItem.vue'
import SwipeContainer from './SwipeContainer.vue'
import { ref } from 'vue'
import { ListItem } from '@/types'
import PlaceFilter from './PlaceFilter.vue'
import SearchComponent from './SearchComponent.vue'
import SwipeHintsComponent from './SwipeHintsComponent.vue'
import EmptyListHint from './EmptyListHint.vue'
import InventoryItem from './InventoryItem.vue'

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
    <EmptyListHint v-if="!items.length" />
    <SwipeContainer>
      <SwipeItem
        v-for="item in items"
        :key="item.product.id"
        @right="$emit('right', item.product.id)"
        @left="$emit('left', item.product.id)"
      >
        <template #right>
          <slot name="left-icon">
            <!-- <CartIcon /> -->
          </slot>
        </template>
        <template #left>
          <slot name="right-icon">
            <!-- <CartPlusIcon /> -->
          </slot>
        </template>
        <InventoryItem :listItem="item" v-if="filter(item)" @doubleClick="$router.push({ name: 'product', params: { id: item.product.id } })"/>
        <!-- <component :is="itemComponent" :listItem="item" v-if="filter(item)" /> -->
      </SwipeItem>
    </SwipeContainer>
  </div>
</template>

<style scoped>
div.content {
  margin-bottom: 0;
}

h1 {
  text-align: center;
}

svg {
  box-sizing: border-box;
  margin: 0.5rem;
  width: calc(100% - 1rem);
  height: calc(100% - 1rem);
}

.item-holder{
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
