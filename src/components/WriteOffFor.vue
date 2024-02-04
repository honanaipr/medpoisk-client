<script setup lang="ts">
import { useDoctorStore } from '@/stores/doctor_store'
import { useRoomStore } from '@/stores/room_store'
import InputComponent from './InputComponent.vue';
import SectionComponent from './common/SectionComponent.vue'
import { computed } from 'vue';

const room_store = useRoomStore()
const doctor_store = useDoctorStore()

const doctor_id = defineModel('doctor_id')
const room_id = defineModel('room_id')

const doctors_options = computed(()=>{
  return doctor_store.doctors.map((doctor)=>{
    return {title: doctor.last_name, id: doctor.id}
  })
})
</script>

<template>
  <SectionComponent>
    <h1>Списание для</h1>
    <InputComponent v-model="doctor_id" type="select" :options="doctors_options" title="Врач" placeholder="Иванов И.И"/>
    <InputComponent v-model="room_id" type="select" :options="room_store.rooms" title="Кабинет" placeholder="№114"/>
  </SectionComponent>
</template>

<style scoped lang="sass">

</style>
