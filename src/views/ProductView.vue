<script setup>
import router from '../router'
import { store } from '../store.js'
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
  const val = item.value.picture_url || defaultImage
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