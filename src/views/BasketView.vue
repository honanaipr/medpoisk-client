<script setup>
import List from '../components/ListComponent.vue'
import BasketItem from '../components/BasketItem.vue' 
import WriteOffFor from '../components/WriteOffFor.vue';
import { store } from '../store.js'
import router from '../router/index.js'
import { ref, computed } from 'vue';
// import router from '../router'

const doctor_id = ref("")
const room_id = ref("")

function apply() {
  store.writeOff(doctor_id.value, room_id.value)
  doctor_id.value = null
  room_id.value = null
  router.back()
}

function cancel() {
  // while (store.basket.length){
  //   backToList(store.value.basket[0].id)
  // }
  store.clearBasket()
  doctor_id.value = null
  room_id.value = null
}

const all_places_selected = computed(()=>{
  return store.basket.every(n=>{
    return !!n.writeOffPlaceID
  })
})

</script>

<template>
  <List :source="store.basket" :item-component="BasketItem"/>
  <WriteOffFor v-model:doctor_id="doctor_id" v-model:room_id="room_id" :allow_apply="store.basket.length && all_places_selected" @apply="apply"
    @cancel="cancel" />
</template>
