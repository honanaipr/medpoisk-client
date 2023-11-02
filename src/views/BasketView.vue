<script setup>
import List from '../components/ListComponent.vue'
import BasketItem from '../components/BasketItem.vue' 
import WriteOffFor from '../components/WriteOffFor.vue';
import { store } from '../store.js'
import { ref } from 'vue';
// import router from '../router'

const doctor_id = ref("")
const room_id = ref("")

function apply() {
  store.writeOff(doctor_id, room_id)
  doctor_id.value = null
  room_id.value = null
}

function cancel() {
  // while (store.basket.length){
  //   backToList(store.value.basket[0].id)
  // }
  store.clearBasket()
  doctor_id.value = null
  room_id.value = null
}

</script>

<template>
  <List :source="store.basket" :item-component="BasketItem"/>
  <WriteOffFor v-model:doctor_id="doctor_id" v-model:room_id="room_id" :allow_apply="store.basket.length" @apply="apply"
    @cancel="cancel" />
</template>
