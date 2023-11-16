<script setup>
import { addPlace, addDoctor, addRoom } from '../store.js'
import { ref } from 'vue'

const newPlaceTitle = ref(null)
const newDoctorName = ref(null)
const newRoomNumber = ref(null)



</script>

<template>
  <div class="container is-fluid is-multiline" style="padding-top: 10rem;">
    <div class="field">
      <label class="label">Номер кабинета:</label>
      <div class="control">
        <input class="input" v-model="newRoomNumber" type="text">
      </div>
    </div>
    <div class="field">
      <div class="control">
        <button class="button is-link" @click="addRoom(newRoomNumber); newRoomNumber=null">Добавить кабинет</button>
      </div>
    </div>

    <div class="field">
      <label class="label">Имя врача:</label>
      <div class="control">
        <input class="input" v-model="newDoctorName" type="text">
      </div>
    </div>
    <div class="field">
      <div class="control">
        <button class="button is-link" @click="addDoctor(newDoctorName); newDoctorName=null">Добавить врача</button>
      </div>
    </div>


    <div class="field">
      <label class="label">Место хранения:</label>
      <div class="control">
        <input class="input" v-model="newPlaceTitle" type="text">
      </div>
    </div>
    <div class="field">
      <div class="control">
        <button class="button is-link" @click="addPlace(newPlaceTitle); newPlaceTitle=null">Добавить место хранения</button>
      </div>
    </div>
  </div>
</template>
