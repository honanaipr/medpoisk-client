<script setup>
import List from '../components/ListComponent.vue'
import BasketItem from '../components/BasketItem.vue'
import WriteOffFor from '../components/WriteOffFor.vue';
import ExtractIcon from '../components/icons/ExtractIcon.vue';
import SwipeLeft from '../components/icons/SwipeLeft.vue';
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

const all_places_selected = computed(() => {
  return store.basket.every(n => {
    return !!n.writeOffPlaceID
  })
})

</script>

<template>
  <List :source="store.basket" :item-component="BasketItem" @right="(item) => { store.unBasketById(item.id) }">
    <template #empty_caption>
      В корзине ничего нет
    </template>
    <template #swipe-hints>
      <span class="swipe-hint">
        Извлечь из корзины
        <SwipeLeft/>
      </span>
    </template>
    <template #left-icon>
      <ExtractIcon />
    </template>
    <template #right-icon>
      <span></span>
    </template>
  </List>
  <WriteOffFor v-model:doctor_id="doctor_id" v-model:room_id="room_id"
    :allow_apply="store.basket.length && all_places_selected" @apply="apply" @cancel="cancel" />
</template>

<style scoped>
svg {
  box-sizing: border-box;
  margin: 0.5rem;
  width: calc(100% - 1rem);
  height: calc(100% - 1rem);
}
.swipe-hint {
    margin: 0 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.swipe-hint svg {
  width: 30px;
  margin: 0;
}
</style>