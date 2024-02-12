<script setup lang="ts">
import router from '../router'
import { useInventoryStore } from '../stores/inventory_store'
import { API_PATH } from '../pathes'
import { computed, onMounted } from 'vue'
import defaultImage from '@/assets/image.png'

const inventoryStore = useInventoryStore()

const item = computed(() => {
  const inventory = inventoryStore.byId(Number(router.currentRoute.value.params.id))
  if (!inventory) {
    throw Error('Inventory not found')
  }
  return inventory
})

onMounted(async () => {
  await inventoryStore.update()
})
const imageUrl = computed(() => {
  let val
  if (item.value.product.pictures.length) {
    try {
      val = new URL(item.value.product.pictures[0].url, new URL(API_PATH, document.baseURI)).href
    } catch (err) {
      val = ''
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
        <img :src="imageUrl" style="border-radius: 0.5rem" />
      </figure>
      <h3>{{ item.product.title }}</h3>
      <p>Количество: {{ item.amount }}</p>
      <p>Неснижаемый остаток: {{ item.limit }}</p>
      <p>Штрихкод: {{ item.product.barcode || 'Не указан' }}</p>
      <p>Места хранения:</p>
      <ul>
        <li v-for="place in item.places" :key="place.id">{{ place.title }}</li>
      </ul>
    </div>
  </div>
</template>

<style scoped></style>
