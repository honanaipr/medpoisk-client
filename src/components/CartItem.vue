<script setup lang="ts">
import { ref } from 'vue'
import { ListItem } from '@/types'
import ButtonComponent from '@/components/inputs/ButtonComponent.vue';
import NumberInput from './inputs/NumberInput.vue';
import{ Place } from '@/types'
import SectionComponent from './common/SectionComponent.vue';
import SelectInput from './inputs/SelectInput.vue';

const props = defineProps({
  listItem: { type: ListItem, required: true },
})

const selections = ref<Array<{place: Place|null, amount: number}>>([])
function addSelection(){
  if (selections.value.length < props.listItem.places.length){
    selections.value.push({place: null, amount: 0})
  }
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
        <div class="row" v-for="selection in selections" :key="selection.place?selection.place.id:0">
          <div class="column">
            <SelectInput title="Места хранения поля" type="select" :options="listItem.places"/>
          </div>
          <div class="column">
            <NumberInput title="Количество" />
          </div>
        </div>
      </div>
      <ButtonComponent has-border centered v-if="selections.length < listItem.places.length" @click="addSelection">+</ButtonComponent>
    </div>
  </SectionComponent>
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
    .column:nth-child(1)
      flex-grow: 1.5


</style>
