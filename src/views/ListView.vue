<script setup>
import List from '../components/ListComponent.vue'
import { store } from '../store.js'
import ListItem from '../components/ListItem.vue';
import { onActivated } from 'vue';
import router from '../router'
import _ from 'lodash'

onActivated(()=>{
  store.sync()
})

function singularWriteOff(item) {
  store.clearBasket()
  // item.basketed = true
  _.find(store.list, n => n.id == item.id).basketed = true
  router.push('basket')
}
</script>


<template>
  <List :source="store.list" :item-component="ListItem" @left="(item)=>{store.toBasketById(item.id)}" @right="(item)=>{singularWriteOff(item)}"/>
</template>
