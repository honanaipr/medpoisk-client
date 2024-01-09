<script setup>
import router from '../router'
import { store } from '../store.js'
import { API_PATH } from '../pathes'
import _ from 'lodash'
import { computed, onMounted } from 'vue';
import defaultImage from '@/assets/image.png'

const item = computed(()=>{
  // store.sync()
  return _.find(store.items, (n)=>n.id == router.currentRoute.value.params.id)
})

onMounted(()=>{
    store.sync()
})
const imageUrl = computed(()=>{
  let val
  try{
    val =  new URL(item?.value?.picture_url || defaultImage, new URL(API_PATH, document.baseURI)).href
  }
  catch (err) {
    val = ""
  }
  console.log(val)
  return val
})
</script>

<template>
  <div class="container is-fluid is-mobile has-text-centered">
    <div class="content has-text-centered">
        <figure class="image is-128x128 is-inline-block">
          <!-- <object class="img" data="/src/assets/image.png" type="image/png"> -->
            <img :src="imageUrl" style="border-radius: 0.5rem;">
          <!-- </object> -->
        </figure>
        <!-- <h1>{{ item.picture_url }}</h1> -->
        <h3>{{ item.title }}</h3>
        <p>Количество: {{ item.amount }}</p>
        <p>Неснижаемый остаток: {{ item.min_amount }}</p>
        <p>Штрихкод: {{ item.barcode || "Не указан" }}</p>
        <p>Места хранения:</p>
        <ul>
            <li v-for="place in item.places" :key="place.id">{{ place.title }}</li>
        </ul>
    </div>
  </div>
</template>

<style scoped>
</style>