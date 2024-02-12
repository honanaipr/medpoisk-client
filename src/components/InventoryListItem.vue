<script setup lang="ts">
import { computed } from 'vue'
import { InventoryItem, ListItem } from '@/types'
import MoreIcon from './icons/MoreIcon.vue'
import FavoriteIcon from './icons/FavoriteIcon.vue'
import ButtonComponent from '@/components/inputs/ButtonComponent.vue'

const emit = defineEmits(['doubleClick'])

const props = defineProps({
  listItem: { type: ListItem, required: true },
})

const amount = computed(() => {
  return props.listItem.amount
})

const places = computed(() => {
  return props.listItem.places
})

const detectDoubleTapClosure = (() => {
  let lastTap = 0
  let timeout
  return function detectDoubleTap(event) {
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
  <div
    class="inventory-item"
    @dblclick="$router.push({ name: 'product', params: { id: listItem.product.id } })"
    @touchend="detectDoubleTapClosure($event)"
  >
    <div class="right-pane">
      <div>{{ listItem.product.title }}</div>
      <div>
        <div>{{ amount }} / {{ listItem.limit }}</div>
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
      <ButtonComponent>
        <MoreIcon />
      </ButtonComponent>
      <ButtonComponent>
        <FavoriteIcon />
      </ButtonComponent>
    </div>
  </div>
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