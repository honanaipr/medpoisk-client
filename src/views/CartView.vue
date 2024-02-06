<script setup lang="ts">
import WriteOffFor from '../components/WriteOffFor.vue'
import { useListStore } from '@/stores/list_store'
import router from '../router/index.js'
import { ref, computed } from 'vue'
import SwipeItem from '@/components/swipe/SwipeItem.vue'
import SwipeContainer from '@/components/swipe/SwipeContainer.vue'
import EmptyListHint from '@/components/common/EmptyListHint.vue'
import CartItem from '@/components/CartItem.vue'
import ButtonComponent from '@/components/inputs/ButtonComponent.vue'

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
  list_store.clearCart()
  doctor_id.value = ''
  room_id.value = ''
}

const all_places_selected = computed(() => {
  return list_store.carted.every((n) => {
    return !!n.writeOffPlaceID
  })
})
</script>

<template>
  <div class="cart-view">
    <h1>Корзина</h1>
    <EmptyListHint v-if="!list_store.carted.length" />
    <SwipeContainer v-else>
      <SwipeItem v-for="item in list_store.carted" :key="item.product.id"
        @right="() => list_store.unCartById(item.product.id)">
        <template #right>
          <slot name="left-icon">
          </slot>
        </template>
        <template #left>
          <slot name="right-icon">
          </slot>
        </template>
        <CartItem :cartItem="item" />
      </SwipeItem>
    </SwipeContainer>
    <WriteOffFor v-model:doctor_id="doctor_id" v-model:room_id="room_id"
      :allow_apply="list_store.carted.length && all_places_selected" @apply="apply" @cancel="cancel" />
    <div class="buttons">
      <ButtonComponent has-border contrast @click="cancel">Отменить</ButtonComponent>
      <ButtonComponent :disabled="!!doctor_id && !!doctor_id" has-border contrast has-fill @click="apply">Списать</ButtonComponent>
    </div>
  </div>
</template>

<style scoped>
.cart-view {
  display: flex;
  flex-direction: column;
  gap: 16px
}
.buttons {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 8px
}
</style>
