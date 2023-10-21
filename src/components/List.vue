<script setup>
import ListItem from './ListItem.vue'
import FilterIcon from './icons/FilterIcon.vue'
import SearchIcon from './icons/SearchIcon.vue'

import {store} from '../store.js'
const props = defineProps(['foo'])
</script>

<template>
  <div class="content">
    <h3>Наименования</h3>
  </div>
  <div class="container control-container">
    <div class="field is-grouped">
      <p class="control is-expanded has-icons-left">
        <input class="input " type="text" placeholder="Найти...">
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
  </div>

  <div v-for="item in store.list">
    <ListItem>
      <template #heading>{{item.heading}}</template>
      <template #amount>{{item.amount}}</template>
      <template #min_amount>{{item.min_amount}}</template>
    </ListItem>
  </div>
</template>

<style scoped>
.control-container {
  margin: 0.5rem;
}
div.content {
  margin-bottom: 0;
}
div.content h3 {
  margin-bottom: 0;
  margin-left: 0.5rem;
} 
</style>