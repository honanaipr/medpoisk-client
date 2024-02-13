<script setup lang="ts">
import { ref } from 'vue'
import ButtonComponent from '@/components/inputs/ButtonComponent.vue'
import NumberInput from './inputs/NumberInput.vue'
import { Place } from '@/types'
import SectionComponent from './common/SectionComponent.vue'
import type { CartItem } from '@/stores/cart_store'
import InputComponent from '@/components/inputs/InputComponent.vue'

const props = defineProps({
  cartItem: { type: Object as () => CartItem, required: true },
})

const rows = ref<Array<{ place: Place | null; amount: number }>>([])
function addRow() {
  rows.value.push({ place: null, amount: 0 })
}
</script>

<template>
  <SectionComponent class="inventory-item" v-if="cartItem">
    <div class="right-pane">
      <div>{{ cartItem.product.title }}</div>
      <div>
        <div>{{ cartItem.amount }} / {{ cartItem.limit }}</div>
        <div>
          <p v-for="allocation in cartItem.alocations" :key="allocation.place.id">
            {{ allocation.place.title }}
          </p>
        </div>
      </div>
      <div class="write-off-talbe">
        <div class="row" v-for="row in cartItem.alocations">
          <div class="column place-selector">
            <InputComponent title="Места хранения" type="select" :options="[]" />
          </div>
          <div class="column amount-selector">
            <NumberInput title="Количество" />
          </div>
        </div>
      </div>
      <ButtonComponent has-border centered @click="addRow">+</ButtonComponent>
    </div>
  </SectionComponent>
</template>

<style scoped lang="sass">
.place-selector
  flex-grow: 4
  flex-basis: 400px
.amount-selector
  flex-basis: 3
  flex-grow: 300px
.inventory-item
  padding: 16px
  border-radius: 8px
  background-color: var(--background-seconfary)
  display: flex
  gap: 8px

.right-pane
  flex-grow: 1
  display: flex
  flex-direction: column
  gap: 16px
  font-size: 14px
  font-weight: 600
  > div:nth-child(1)
    color: var(--text-black)
    font-size: 14px
    font-weight: 600
  > div:nth-child(2)
    display: flex
    justify-content: space-between
    > div:nth-child(2)
      display: flex
      flex-direction: column
  > div:nth-child(3)
      display: flex
      justify-content: space-between

button
    justify-content: center

.write-off-talbe
  display: flex
  flex-direction: column
  gap: 16px
  .row
    display: flex
    gap: 16px
    .column
      padding: 0
      display: flex
      flex-direction: column
      justify-content: start
      min-width: 0
      > h1
        flex-grow: 1
        margin: 0
        font-size: 12px
        font-weight: 600
</style>
