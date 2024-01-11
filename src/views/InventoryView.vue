<script setup lang="ts">
import ListComponent from '../components/ListComponent.vue'
import ListItem from '../components/ListItem.vue';
import router from '../router'
import { useListStore } from '../stores/list_store';

const list_store = useListStore()

function singularWriteOff(product_id: number) {
  list_store.toBasketById(product_id)
  router.push('basket')
}
</script>


<template>
  <ListComponent :items="list_store.persistent" :item-component="ListItem" @left="(product_id) => { list_store.toBasketById(product_id) }"
    @right="(product_id) => { singularWriteOff(product_id) }" />
</template>
