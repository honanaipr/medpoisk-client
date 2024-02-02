<script setup lang="ts">
import FilterIcon from './icons/FilterIcon.vue'
import SearchIcon from './icons/SearchIcon.vue'
import SwipeItem from './SwipeItem.vue'
import SwipeContainer from './SwipeContainer.vue'
import { ref } from 'vue'
import CartIcon from './icons/CartIcon.vue'
import CartPlusIcon from './icons/CartPlusIcon.vue'
import SwipeRight from './icons/SwipeRight.vue'
import SwipeLeft from './icons/SwipeLeft.vue'
import { ListItem } from '@/types'
import PlaceFilter from './PlaceFilter.vue'

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
    <div class="field is-grouped">
      <p class="control is-expanded has-icons-left">
        <input class="input" type="text" placeholder="Найти..." v-model="serachQuery" />
        <span class="icon is-small is-left">
          <SearchIcon />
        </span>
      </p>
      <p class="control">
        <button class="button filter-button">
          <FilterIcon />
        </button>
      </p>
    </div>

    <div class="swipe-hint">
      <slot name="swipe-hints">
        <span>
          Списание
          <SwipeLeft />
        </span>
        <span>
          В корзину
          <SwipeRight />
        </span>
      </slot>
    </div>

    <div class="content has-content-centered empty-hint" v-if="!items.length">
      <h1>
        <slot name="empty_caption">Здесь ничего нет</slot>
      </h1>
    </div>
    <SwipeContainer>
      <SwipeItem
        v-for="item in items"
        :key="item.product.id"
        @right="$emit('right', item.product.id)"
        @left="$emit('left', item.product.id)"
      >
        <template #right>
          <slot name="left-icon">
            <CartIcon />
          </slot>
        </template>
        <template #left>
          <slot name="right-icon">
            <CartPlusIcon />
          </slot>
        </template>
        <component :is="itemComponent" :listItem="item" v-if="filter(item)" />
      </SwipeItem>
    </SwipeContainer>
  </div>
</template>

<style scoped>
.filter-button {
  padding: 0;
}

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

.swipe-hint {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin: -0.75rem 0;
}

.swipe-hint span {
  margin: 0 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.swipe-hint svg {
  width: 30px;
  margin: 0;
}

.empty-hint {
  margin-top: 1rem;
}
</style>
