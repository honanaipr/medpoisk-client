<script setup lang="ts">
import ButtonComponent from '@/components/inputs/ButtonComponent.vue'
import { useAuthStore } from '@/stores/auth_store'
const authStore = useAuthStore()
</script>

<template>
  <div class="profile-view">
  <div class="header">
    <h1>Название организации</h1>
    <h2>{{ authStore.roles[0].division.title }}</h2>
  </div>
  <div class="container">
    <ButtonComponent
      @click="
        () => {
          $router.push({ name: 'inventory' })
        }
      "
      has-border
      >Настройки профиля</ButtonComponent
    >
    <ButtonComponent
      @click="
        () => {
          $router.push({ name: 'inventory' })
        }
      "
      >Журнал накладных</ButtonComponent
    >
    <ButtonComponent
      @click="
        () => {
          $router.push({ name: 'inventory' })
        }
      "
      >Журнал списания</ButtonComponent
    >
    <ButtonComponent
      @click="
        () => {
          $router.push({ name: 'placeManager' })
        }
      "
      >Места хранения</ButtonComponent
    >
    <ButtonComponent
      @click="
        () => {
          $router.push({ name: 'doctorManager' })
        }
      "
      >Врачи</ButtonComponent
    >
    <ButtonComponent
      @click="
        () => {
          $router.push({ name: 'roomManager' })
        }
      "
      >Кабинеты</ButtonComponent
    >
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
.header h1
  font-size: 20px
  margin-bottom: 16px
.header h2
  font-size: 16px
  margin-bottom: 16px
</style>
