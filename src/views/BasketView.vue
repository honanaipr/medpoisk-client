<script setup lang="ts">
import WriteOffFor from '../components/WriteOffFor.vue'
import { useListStore } from '@/stores/list_store'
import router from '../router/index.js'
import { ref, computed } from 'vue'
import SwipeItem from '../components/SwipeItem.vue'
import SwipeContainer from '../components/SwipeContainer.vue'
import EmptyListHint from '../components/EmptyListHint.vue'
import BasketItem from '@/components/BasketItem.vue'
import ButtonComponent from '@/components/ButtonComponent.vue'

const list_store = useListStore()

const doctor_id = ref('')
const room_id = ref('')

function apply() {
  list_store.writeOff(doctor_id.value, room_id.value)
  doctor_id.value = ''
  room_id.value = ''
  router.back()
}

function cancel() {
  list_store.clearBasket()
  doctor_id.value = ''
  room_id.value = ''
}

const all_places_selected = computed(() => {
  return list_store.basketed.every((n) => {
    return !!n.writeOffPlaceID
  })
})
</script>

<template>
  <h1>Корзина</h1>
  <EmptyListHint v-if="!list_store.basketed.length" />
  <SwipeContainer v-else>
    <SwipeItem v-for="item in list_store.basketed" :key="item.product.id"
      @right="() => list_store.unBasketById(item.product.id)">
      <template #right>
        <slot name="left-icon">
        </slot>
      </template>
      <template #left>
        <slot name="right-icon">
        </slot>
      </template>
      <BasketItem :listItem="item" />
    </SwipeItem>
  </SwipeContainer>
  <WriteOffFor v-model:doctor_id="doctor_id" v-model:room_id="room_id"
    :allow_apply="list_store.basketed.length && all_places_selected" @apply="apply" @cancel="cancel" />
  <div class="buttons">
    <ButtonComponent has-border contrast @click="cancel">Отменить</ButtonComponent>
    <ButtonComponent has-border contrast has-fill @click="apply">Списать</ButtonComponent>
  </div>
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

.buttons {
  margin: 16px 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 8px
}
</style>
