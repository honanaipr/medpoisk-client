<script setup>
import router from '../router'
import { useProductStore } from '../stores/product_store'
import { API_PATH } from '../pathes'
import { computed, onMounted } from 'vue';
import defaultImage from '@/assets/image.png'

const product_store = useProductStore()

const item = computed(()=>{
  return product_store.byId(router.currentRoute.value.params.id)
})

onMounted(async()=>{
  await product_store.update()
})
const imageUrl = computed(()=>{
  let val
  if (item?.value?.pictures.length){
    try{
    val =  new URL(item.value.pictures[0].url, new URL(API_PATH, document.baseURI)).href
    }
    catch (err) {
      val = ""
    }
  } else {
    val = defaultImage
  }
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
        <p>Неснижаемый остаток: {{ item.limit }}</p>
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