<script setup lang="ts">
import ButtonComponent from '@/components/inputs/ButtonComponent.vue';
</script>

<template>
  <div class="header">
    <h1>Название организации</h1>
    <h2>Название подразделения</h2>
  </div>
  <div class="container">
    <ButtonComponent title="Настройки профиля" @click="()=>{$router.push({name: 'home'})}" has-border />
    <ButtonComponent title="Журнал накладных" @click="()=>{$router.push({name: 'home'})}" />
    <ButtonComponent title="Журнал списания" @click="()=>{$router.push({name: 'home'})}" />
    <ButtonComponent title="Места хранения" @click="()=>{$router.push({name: 'placeManager'})}" />
    <ButtonComponent title="Врачи" @click="()=>{$router.push({name: 'doctorManager'})}" />
    <ButtonComponent title="Кабинеты" @click="()=>{$router.push({name: 'roomManager'})}" />
  </div>
</template>
<style scoped lang="sass">
.container
  display: flex
  flex-direction: column
  gap: 16px
  padding: 0 10px 0 10px
.header
  padding: 0 10px 0 10px
  color: #121212
  font-weight: bold
.header h1
  font-size: 20px
  margin-bottom: 16px
.header h2
  font-size: 16px
  margin-bottom: 16px
</style>
