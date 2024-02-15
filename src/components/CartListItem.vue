<script setup lang="ts">
import { computed } from 'vue'
import ButtonComponent from '@/components/inputs/ButtonComponent.vue'
import NumberInput from './inputs/NumberInput.vue'
import type { Place } from '@/stores/place_store'
import SectionComponent from './common/SectionComponent.vue'
import { useCartStore, type CartItem } from '@/stores/cart_store'
import InputComponent from '@/components/inputs/InputComponent.vue'

const props = defineProps({
  cartItem: { type: Object as () => CartItem, required: true },
})
const cartStore = useCartStore()
function addRow() {
  const cartItem = cartStore.getCartedProductById(props.cartItem.inventoryJointItem.product.id)
  if (!cartItem) return
  if (!cartItem.alocations.every(item=>item.place != null)) return
  cartItem.alocations.push({place: null, amount: 0})
}

const selectedPlaces = computed<Place[]>(()=>{
  const notNullAllocatiions: Place[] = []
  for (const allocation of props.cartItem.alocations) {
    if (allocation.place)
      notNullAllocatiions.push(allocation.place)
  }
  return notNullAllocatiions
})

const allPlaces = computed<Place[]>(()=>{
  return props.cartItem.inventoryJointItem.allocations.map(allocation=>allocation.place)
})

interface Option {
  title: string
  id: Place
}

function getOptions(currentSelectedPlace: Place|null): Option[] {
  let options: Option[] = allPlaces.value.map(item=>({title: item.title, id: item}))
  options = options.filter(item=>!selectedPlaces.value.includes(item.id))
  if (currentSelectedPlace === null) return options
  options.push({title: currentSelectedPlace.title, id: currentSelectedPlace})
  return options
}
</script>

<template>
  <SectionComponent class="inventory-item" v-if="cartItem">
    <div class="right-pane">
      <div>{{ cartItem.inventoryJointItem.product.title }}</div>
      <div>
        <div>{{ cartItem.amount }} / {{ cartItem.limit }}</div>
        <div>
          <p v-for="allocation in cartItem.inventoryJointItem.allocations" :key="allocation.place?.id">
            {{ allocation.place?.title }}
          </p>
        </div>
      </div>
      <div class="write-off-talbe">
        <div class="row" v-for="row in cartItem.alocations">
          <div class="column place-selector">
            <InputComponent title="Места хранения" type="select" :options="getOptions(row.place)" v-model="row.place" />
          </div>
          <div class="column amount-selector">
            <NumberInput title="Количество" v-model="row.amount" />
          </div>
        </div>
      </div>
      <ButtonComponent disabled has-border centered>Не распределено {{ cartItem.cartedAmount }}</ButtonComponent>
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
