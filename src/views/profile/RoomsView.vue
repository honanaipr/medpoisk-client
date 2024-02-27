<script setup lang="ts">
import ButtonComponent from '@/components/inputs/ButtonComponent.vue'
import InputComponent from '@/components/inputs/InputComponent.vue'
import { useRoomStore } from '@/stores/room_store'
const room_store = useRoomStore()

import { ref } from 'vue'

const newRoomTitle = ref('')

function createRoom() {
  room_store.addRoom({ title: newRoomTitle.value, division_id: 1 })
  newRoomTitle.value = ''
}
</script>

<template>
  <div class="rooms-view">
  <div class="header">
    <h1>Кабинеты</h1>
    <h2>Добавить новый</h2>
    <InputComponent v-model="newRoomTitle" placeholder="312" title="№ кабинета" />
    <div style="display: flex; flex-direction: row; gap: 8px">
      <ButtonComponent @click="$router.back()" contrast has-border>Отменить</ButtonComponent>
      <ButtonComponent @click="createRoom" contrast has-fill>Добавить</ButtonComponent>
    </div>
  </div>
  <div class="container">
    <template v-for="room of room_store.rooms" :key="room.id">
      <ButtonComponent>{{ room.title }}</ButtonComponent>
    </template>
  </div>
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
