<script setup lang="ts">
import ListComponent from '../components/ListComponent.vue'
import BasketItem from '../components/BasketItem.vue'
import WriteOffFor from '../components/WriteOffFor.vue';
import ExtractIcon from '../components/icons/ExtractIcon.vue';
import SwipeLeft from '../components/icons/SwipeLeft.vue';
import { useListStore } from '@/stores/list_store';
import router from '../router/index.js'
import { ref, computed } from 'vue';

const list_store = useListStore()

const doctor_id = ref("")
const room_id = ref("")

function apply() {
  list_store.writeOff(doctor_id.value, room_id.value)
  doctor_id.value = null
  room_id.value = null
  router.back()
}

function cancel() {
  list_store.clearBasket()
  doctor_id.value = null
  room_id.value = null
}

const all_places_selected = computed(() => {
  return list_store.basketed.every(n => {
    return !!n.writeOffPlaceID
  })
})

</script>

<template>
  <ListComponent :items="list_store.basketed" :item-component="BasketItem" @right="(item_id) => { list_store.unBasketById(item_id) }">
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
  </ListComponent>
  <WriteOffFor v-model:doctor_id="doctor_id" v-model:room_id="room_id"
    :allow_apply="list_store.basketed.length && all_places_selected" @apply="apply" @cancel="cancel" />
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