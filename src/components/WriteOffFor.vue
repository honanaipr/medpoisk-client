<script setup lang="ts">
import { useDoctorStore } from '@/stores/doctor_store'
import { useRoomStore } from '@/stores/room_store'
import InputComponent from '@/components/inputs/InputComponent.vue'
import { computed } from 'vue'

const room_store = useRoomStore()
const doctor_store = useDoctorStore()

const doctor = defineModel('doctor', {default: null})
const room = defineModel('room', {default: null})

const doctors_options = computed(() => {
  return doctor_store.doctors.map((doctor) => {
    return { title: doctor.username, value: doctor }
  })
})

const rooms_options = computed(() => {
  return room_store.rooms.map((room) => {
    return { title: room.title, value: room }
  })
})
</script>

<template>
  <section>
    <h1>Списание для</h1>
    <InputComponent
      v-model="doctor"
      type="select"
      :options="doctors_options"
      title="Врач"
      placeholder="Иванов И.И"
    />
    <InputComponent
      v-model="room"
      type="select"
      :options="rooms_options"
      title="Кабинет"
      placeholder="№114"
    />
  </section>
</template>

<style scoped lang="sass"></style>
