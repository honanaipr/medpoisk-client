<script setup lang="ts">
import { computed } from 'vue'
import type { InventoryJointItem } from '@/stores/inventory_store'
import MoreIcon from './icons/MoreIcon.vue'
import FavoriteIcon from './icons/FavoriteIcon.vue'
import ButtonComponent from '@/components/inputs/ButtonComponent.vue'
import TrashIcon from '@/components/icons/TrashIcon.vue'
import InputComponent from './inputs/InputComponent.vue'
import SectionComponentVue from './common/SectionComponent.vue'

const emit = defineEmits(['doubleClick'])

const props = defineProps({
  item: { type: Object as () => InventoryJointItem, required: true },
  carted: { type: Boolean, default: true },
})

const amount = computed(() => {
  return props.item.amount
})

const places = computed(() => {
  return props.item.allocations.map((allocation) => allocation.place)
})

const detectDoubleTapClosure = (() => {
  let lastTap = 0
  let timeout: number
  return function detectDoubleTap(event: Event) {
    const curTime = new Date().getTime()
    const tapLen = curTime - lastTap
    if (tapLen < 300 && tapLen > 0) {
      emit('doubleClick')
      event.preventDefault()
    } else {
      timeout = setTimeout(() => {
        clearTimeout(timeout)
      }, 500)
    }
    lastTap = curTime
  }
})()
</script>

<template>
  <SectionComponentVue class="flex-col" :class="{ highlited: carted }">
    <div
      class="flex-row"
      @dblclick="$router.push({ name: 'product', params: { id: item.product.id } })"
      @touchend="detectDoubleTapClosure($event)"
    >
      <div class="right-pane">
        <div>{{ item.product.title }}</div>
        <div>
          <div>{{ amount }} / {{ item.limit }}</div>
          <div>
            <p v-for="place in places" :key="place.id">
              {{ place.title }}
            </p>
          </div>
        </div>
        <div>
          <span>Общая стоимость</span>
          <span>11 500,00₽</span>
        </div>
      </div>
      <div class="left-pane">
        <ButtonComponent style="padding: 0; padding-top: 10px">
          <MoreIcon />
        </ButtonComponent>
        <ButtonComponent style="padding: 0">
          <FavoriteIcon />
        </ButtonComponent>
      </div>
    </div>
    <div v-if="carted" class="flex-row">
      <ButtonComponent
        style="
          height: 55px;
          width: 55px;
          display: flex;
          justify-content: center;
          align-items: center;
        "
        has-border
        contrast
        ><TrashIcon
      /></ButtonComponent>
      <ButtonComponent style="height: 55px; width: 55px" has-border contrast>-</ButtonComponent>
      <InputComponent type="number" contrast />
      <ButtonComponent style="height: 55px; width: 55px" has-border contrast>+</ButtonComponent>
    </div>
  </SectionComponentVue>
</template>

<style scoped lang="sass">
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
.left-pane
  flex-grow: 0
  flex-basis: 24px
  display: flex
  flex-direction: column
  justify-content: space-between
  align-items: center
  > button
    flex-grow: 0
</style>
