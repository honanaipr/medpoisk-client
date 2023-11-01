<script setup>
import ListItem from './ListItem.vue'
import FilterIcon from './icons/FilterIcon.vue'
import SearchIcon from './icons/SearchIcon.vue'
import { ref, onMounted } from 'vue'
import { store } from '../store'
import router from '../router'

onMounted(()=>{
  store.sync()
})

// eslint-disable-next-line no-unused-vars
const props = defineProps(['source'])

let serachQuery = ref("")
let selectedCategories = ref([])

function isItemToDisplay(item) {
  if (serachQuery.value) {
    return item.title.toLowerCase().includes(serachQuery.value.toLowerCase())
  }
  if (selectedCategories.value.length){
    if(!item.places.filter(value1 => selectedCategories.value.filter(value2 => value1.id == value2.id).length).length){
      return false
    }
  }
  // if (router.currentRoute.value.name == "home" && item.basketed){
  //   return false
  // }
  // if (router.currentRoute.value.name == "basket" && !item.basketed){
  //   return false
  // }
  return true
}

function toggleCategory(place){
  if(selectedCategories.value.filter((item)=>(item.id == place.id)).length){
    selectedCategories.value = selectedCategories.value.filter((item)=>(item.id != place.id))
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
      <button class="button is-small" v-for="place in store.places" :key="place.id" @click="toggleCategory(place)" :class="{'is-primary':selectedCategories.includes(place)}">{{ place.title }}</button>
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

    <div class="content has-content-centered" v-if="!source.length"><h1>Здесь ничего нет</h1></div>
    <div v-for="item in source" :key="item.id">
      <ListItem :item="item" v-if="isItemToDisplay(item)" />
    </div>
  </div>  
</template>

<style scoped>
/* .control-container {
  margin: 0.5rem;
} */

div.content {
  margin-bottom: 0;
}

/* div.content h3 {
  margin-bottom: 0;
  margin-left: 0.5rem;
} */
</style>