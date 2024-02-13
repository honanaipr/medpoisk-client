<script setup lang="ts">
import ButtonComponent from '@/components/inputs/ButtonComponent.vue'
import InputComponent from '@/components/inputs/InputComponent.vue'
import { useDoctorStore } from '@/stores/doctor_store'
const doctor_store = useDoctorStore()

import { ref } from 'vue'

const newDoctorName = ref('')

function createDoctor() {
  doctor_store.addDoctor({ username: newDoctorName.value })
  newDoctorName.value = ''
}
</script>

<template>
  <div class="header">
    <h1>Врачи</h1>
    <h2>Добавить нового</h2>
    <InputComponent v-model="newDoctorName" placeholder="Иванов И.И" title="ФИО" />
    <div style="display: flex; flex-direction: row; gap: 8px">
      <ButtonComponent @click="$router.back()" contrast has-border>Отменить</ButtonComponent>
      <ButtonComponent @click="createDoctor" contrast has-fill>Добавить</ButtonComponent>
    </div>
  </div>
  <div class="container">
    <template v-for="doctor of doctor_store.doctors" :key="doctor.id">
      <ButtonComponent>{{ doctor.username }}</ButtonComponent>
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
