<script setup lang="ts">
import ButtonComponent from '@/components/inputs/ButtonComponent.vue'
import InputComponent from '@/components/inputs/InputComponent.vue'
import { usePlaceStore } from '@/stores/place_store'
const place_store = usePlaceStore()

import { ref } from 'vue'

const newPlaceTitle = ref('')
const newPlaceShortTitle = ref('')

function createPlace() {
  place_store.addPlace({
    title: newPlaceTitle.value,
    shortTitle: newPlaceShortTitle.value,
    division_id: 1,
  })
  newPlaceTitle.value = ''
}
</script>

<template>
  <div class="header">
    <h1>Места хранения</h1>
    <h2>Добавить новое</h2>
    <InputComponent v-model="newPlaceTitle" placeholder="Название" title="Название" />
    <InputComponent
      v-model="newPlaceShortTitle"
      placeholder="НЗВН"
      title="Короткое название, до 4 символов"
      maxlength="4"
    />
    <div style="display: flex; flex-direction: row; gap: 8px">
      <ButtonComponent @click="$router.back()" contrast has-border>Отменить</ButtonComponent>
      <ButtonComponent @click="createPlace" contrast has-fill>Добавить</ButtonComponent>
    </div>
  </div>
  <div class="container">
    <template v-for="place of place_store.places" :key="place.id">
      <ButtonComponent>
        <div class="flex-row" style="justify-content: space-between">
          <div>{{ place.title }}</div>
          <div>{{ place.shortTitle }}</div>
        </div>
      </ButtonComponent>
    </template>
  </div>
</template>

<style scoped lang="sass">
.container
  display: flex
  flex-direction: column
  gap: 16px
.header
  color: var(--text-black)
  font-weight: bold
  display: flex
  flex-direction: column
  gap: 16px
  margin-bottom: 16px
.header h1
  font-size: 20px
.header h2
  font-size: 16px
</style>
