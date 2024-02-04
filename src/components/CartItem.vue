<script setup lang="ts">
import { ref, computed } from 'vue'
import { ListItem } from '@/types'
import CustomNumberInput from '@/components/inputs/CustomNumberInput.vue'
import ButtonComponent from '@/components/inputs/ButtonComponent.vue';
import InputComponent from '@/components/inputs/InputComponent.vue';
import{ Place } from '@/types'
import SectionComponent from './common/SectionComponent.vue';

const props = defineProps({
  listItem: { type: ListItem, required: true },
})

const selections = ref<Array<{place: Place|null, amount: number}>>([])
function addSelection(){
  selections.value.push({place: null, amount: 0})
}
</script>

<template>
  <SectionComponent class="inventory-item">
    <div class="right-pane">
      <div>{{ listItem.product.title }}</div>
      <div>
        <div>{{ listItem.amount }} / {{ listItem.limit }}</div>
        <div>
          <p v-for="place in listItem.places" :key="place.id">
            {{ place.title }}
          </p>
        </div>
      </div>
      <div class="write-off-talbe">
        <div class="row" v-for="selection in selections">
          <div class="column">
            <h1>Места хранения поля</h1>
            <InputComponent :options="listItem.places"/>
          </div>
          <div class="column">
            <h1>Количество</h1>
            <InputComponent />
          </div>
        </div>
      </div>
      <ButtonComponent has-border centered @click="addSelection">+</ButtonComponent>
    </div>
  </SectionComponent>
</template>

<style scoped lang="sass">
.inventory-item
  padding: 16px
  border-radius: 8px
  background-color: #F3F3F4
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
    color: #121212
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
  .row
    display: flex
    gap: 16px
    .column
      padding: 0
      display: flex
      flex-direction: column
      justify-content: start
      > h1
        flex-grow: 1
        margin: 0
        font-size: 12px
        font-weight: 600
</style>
