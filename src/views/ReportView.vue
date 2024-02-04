<script setup lang="ts">
import ReportItem from "@/components/ReportItem.vue"
import { ref } from 'vue';
import { useProductStore } from '@/stores/product_store';

import { usePlaceStore } from '@/stores/place_store'

const place_store = usePlaceStore()

const product_store = useProductStore()
const product_collapsed = ref(true)
const place_collapsed = ref(true)

</script>

<template>
  <div class="section">
    <h1> Продукты:</h1> <button class="collapse-button" @click="product_collapsed = !product_collapsed" :class="{active:product_collapsed}"></button>
    <template v-for="product of product_store.products" :key="product.id">
      <ReportItem :item="product" :class="{hidden: product_collapsed}"/>
    </template>
  </div>
  <div class="section">
    <h1> Места хранения:</h1> <button class="collapse-button" @click="place_collapsed = !place_collapsed" :class="{active:place_collapsed}"></button>
    <template v-for="place of place_store.places" :key="place.id">
      <ReportItem :item="place" :class="{hidden: place_collapsed}"/>
    </template>
  </div>
</template>

<style scoped lang="sass">
.section
  border: 1px solid red
  border-radius: 5px
  padding: 10px
  overflow: hidden
  margin: 1rem
.collapse-button:after
  content: "\2796"
  font-size: 13px
  color: white
  float: right
  margin-left: 5px

.hidden
  display: none
  max-width: 0

.active:after
  content: '\02795'
</style>