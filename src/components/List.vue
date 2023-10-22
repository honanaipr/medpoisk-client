<script setup>
import ListItem from './ListItem.vue'
import FilterIcon from './icons/FilterIcon.vue'
import SearchIcon from './icons/SearchIcon.vue'
import { ref } from 'vue'

const props = defineProps(['source'])

let serachQuery = ref("")

function isItemToDisplay(item){
  if(serachQuery.value){
    return item.heading.toLowerCase().includes(serachQuery.value.toLowerCase())
  }
  return true
}
</script>

<template>
  <div class="content">
    <h3>Наименования</h3>
  </div>
  <div class="container control-container">
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
  </div>

  <div v-for="item in source">
    <ListItem :item="item" v-if="isItemToDisplay(item)"/>
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