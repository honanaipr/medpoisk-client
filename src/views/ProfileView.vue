<script setup lang="ts">
import { usePlaceStore } from '@/stores/place_store'
import { useDoctorStore } from '@/stores/doctor_store'
import { useRoomStore } from '@/stores/room_store'
import { Doctor, Room, Place } from '@/types'
import { ref } from 'vue'

const newPlaceTitle = ref(null)
const newDoctorName = ref(null)
const newRoomNumber = ref(null)

const place_store = usePlaceStore()
const doctor_store = useDoctorStore()
const room_store = useRoomStore()
</script>

<template>
  <div class="container is-fluid is-multiline" style="padding-top: 5rem">
    <div class="field">
      <label class="label">Номер кабинета:</label>
      <div class="control">
        <input class="input" v-model="newRoomNumber" type="text" />
      </div>
    </div>
    <div class="field">
      <div class="control">
        <button
          class="button is-link"
          @click="
            room_store.addRoom(new Room({ title: newRoomNumber }))
            newRoomNumber = null
          "
        >
          Добавить кабинет
        </button>
      </div>
    </div>

    <div class="field">
      <label class="label">Имя врача:</label>
      <div class="control">
        <input class="input" v-model="newDoctorName" type="text" />
      </div>
    </div>
    <div class="field">
      <div class="control">
        <button
          class="button is-link"
          @click="
            doctor_store.addDoctor(new Doctor({ name: newDoctorName }))
            newDoctorName = null
          "
        >
          Добавить врача
        </button>
      </div>
    </div>

    <div class="field">
      <label class="label">Место хранения:</label>
      <div class="control">
        <input class="input" v-model="newPlaceTitle" type="text" />
      </div>
    </div>
    <div class="field">
      <div class="control">
        <button
          class="button is-link"
          @click="
            place_store.addPlace(new Place({ title: newRoomNumber }))
            newPlaceTitle = null
          "
        >
          Добавить место хранения
        </button>
      </div>
    </div>
  </div>
</template>
