<script setup lang="ts">
import WriteOffFor from '../components/WriteOffFor.vue'
import { useCartStore } from '@/stores/cart_store'
import { ref, computed } from 'vue'
import SwipeItem from '@/components/swipe/SwipeItem.vue'
import SwipeContainer from '@/components/swipe/SwipeContainer.vue'
import EmptyListHint from '@/components/common/EmptyListHint.vue'
import CartItem from '@/components/CartListItem.vue'
import ButtonComponent from '@/components/inputs/ButtonComponent.vue'

const cartStore = useCartStore()

function apply() {
  // cartStore.writeOff(doctor_id.value, room_id.value)
  cartStore.ids.clear()
  cartStore.forDoctor = null
  cartStore.forRoom = null
}

function cancel() {
  cartStore.ids.clear()
  cartStore.forDoctor = null
  cartStore.forRoom = null
}
</script>

<template>
  <div class="cart-view">
    <h1>Корзина</h1>
    <EmptyListHint v-if="!cartStore.cartItems.size" />
    <SwipeContainer v-else>
      <SwipeItem
        v-for="item in cartStore.cartItems"
        :key="item.inventoryJointItem.product.id"
        @right="() => cartStore.uncartProductById(item.inventoryJointItem.product.id)"
      >
        <template #right>
          <slot name="left-icon"> </slot>
        </template>
        <template #left>
          <slot name="right-icon"> </slot>
        </template>
        <CartItem :cartItem="item" />
      </SwipeItem>
    </SwipeContainer>
    <WriteOffFor
      v-model:doctor="cartStore.forDoctor"
      v-model:room="cartStore.forRoom"
      :allow_apply="cartStore.cartItems.size && cartStore.isCartFullfilled"
      @apply="apply"
      @cancel="cancel"
    />
    <div class="buttons">
      <ButtonComponent has-border contrast @click="cancel">Отменить</ButtonComponent>
      <ButtonComponent
        :disabled="!cartStore.isCartFullfilled"
        has-border
        contrast
        has-fill
        @click="apply"
        >Списать</ButtonComponent
      >
    </div>
  </div>
</template>

<style scoped>
.cart-view {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.buttons {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 8px;
}
</style>
