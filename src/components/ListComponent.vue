<script setup>
import FilterIcon from './icons/FilterIcon.vue'
import SearchIcon from './icons/SearchIcon.vue'
import SwipeItem from './SwipeItem.vue'
import SwipeContainer from './SwipeContainer.vue'
import { ref, onMounted } from 'vue'
import { store } from '../store'
import CartIcon from './icons/CartIcon.vue'
import CartPlusIcon from './icons/CartPlusIcon.vue'
import SwipeRight from './icons/SwipeRight.vue'
import SwipeLeft from './icons/SwipeLeft.vue'
import { usePlaceStore } from '../stores/place_store'

onMounted(() => {
  store.sync()
})

const place_store = usePlaceStore()

// eslint-disable-next-line no-unused-vars
const props = defineProps(['source', 'itemComponent'])
defineEmits(['left', 'right'])

let serachQuery = ref("")
let selectedCategories = ref([])

function filter(item) {
  if (serachQuery.value) {
    return item.title.toLowerCase().includes(serachQuery.value.toLowerCase())
  }
  if (selectedCategories.value.length) {
    if (!item.places.filter(value1 => selectedCategories.value.filter(value2 => value1.id == value2.id).length).length) {
      return false
    }
  }
  return true
}

function toggleCategory(place) {
  if (selectedCategories.value.filter((item) => (item.id == place.id)).length) {
    selectedCategories.value = selectedCategories.value.filter((item) => (item.id != place.id))
  } else {
    selectedCategories.value.push(place)
  }
}
</script>

<template>
  <div class="container control-container is-fluid">
    <div class="content">
      <h5>Места хранения</h5>
    </div>
    <div class="buttons">
      <button class="button is-small" v-for="place in store.places" :key="place.id" @click="toggleCategory(place)"
        :class="{ 'is-primary': selectedCategories.includes(place) }">{{ place.title }}</button>
    </div>
    <div class="content">
      <h3>Наименования</h3>
    </div>
    <div class="field is-grouped">
      <p class="control is-expanded has-icons-left">
        <input class="input " type="text" placeholder="Найти..." v-model="serachQuery">
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

    <div class="content has-content-centered empty-hint" v-if="!source.length">
      <h1>
        <slot name="empty_caption">Здесь ничего нет</slot>
      </h1>
    </div>
    <SwipeContainer v-else>
      <SwipeItem v-for="(item, index) in source" :key="item.id" @right="$emit('right', item)" @left="$emit('left', item)">
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
        <component :is="itemComponent" :index="index" :source="source" v-if="filter(item)" />
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