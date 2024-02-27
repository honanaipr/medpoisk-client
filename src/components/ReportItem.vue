<script setup lang="ts">
import type { Place } from '@/stores/place_store'
import { defineProps } from 'vue'
import type { Product } from '@/stores/product_store'

defineProps<{
  item: Product | Place
}>()
</script>

<template>
  <div class="card" v-if="'barcode' in item">
    <span>{{ item.title }}</span>
    <span>{{ item.description ?? 'Нет описания' }}</span>
    <span>{{ item.barcode ?? 'Нет штрихкода' }}</span>
    <a v-for="picture of item.pictures" :href="picture.url">pic</a>
  </div>
  <div class="card" v-else>
    <span>{{ item.title }}</span>
    <span>{{ item.division_id }}</span>
  </div>
</template>

<style scoped lang="sass">
.card
  border: 1px solid grey
  border-radius: 5px
  transition: max-height 0.2s ease-out
  margin: 10px 0
span
  display: inline-block
  white-space: nowrap
  width: 100%
  overflow: hidden
  text-overflow: ellipsis
a
  display: block
</style>
