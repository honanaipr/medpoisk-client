<script setup lang="ts">
import ReportItem from "@/components/ReportItem.vue"
import { ref, computed } from 'vue';
import { useProductStore } from '@/stores/product_store';

import { usePlaceStore } from '@/stores/place_store'
import { useDoctorStore } from '@/stores/doctor_store'
import { useRoomStore } from '@/stores/room_store'
import { Doctor, Room, Place } from '@/types'

const newPlaceTitle = ref<string>('')
const newDoctorName = ref<string>('')
const newRoomNumber = ref<string>('')

const place_store = usePlaceStore()
const doctor_store = useDoctorStore()
const room_store = useRoomStore()

const product_store = useProductStore()
const product_collapsed = ref(true)

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
        <button class="button is-link" @click="
          room_store.addRoom(new Room({ title: newRoomNumber, division_id: 1 })),
        newRoomNumber = ''
          ">
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
        <button class="button is-link" @click="
          doctor_store.addDoctor(new Doctor({ username: newDoctorName, last_name: '' })),
        newDoctorName = ''
          ">
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
        <button class="button is-link" @click="
          place_store.addPlace(new Place({ title: newRoomNumber, division_id: 1 })),
        newPlaceTitle = ''
          ">
          Добавить место хранения
        </button>
      </div>
    </div>
  </div>
  <div class="section">
    <h1> Продукты:</h1> <button class="collapse-button" @click="product_collapsed = !product_collapsed" :class="{active:product_collapsed}"></button>
    <template v-for="product of product_store.products" :key="product.id">
      <ReportItem :item="product" :class="{hidden: product_collapsed}"/>
    </template>
  </div>
</template>

<style scoped lang="sass">
.section
  border: 1px solid red
  border-radius: 5px
  padding: 10px
  overflow: hidden
.collapse-button:after
  content: "\2796"
  font-size: 13px
  color: white
  float: right
  margin-left: 5px

.hidden
  display: none
  max-width: 0

.active:after
  content: '\02795'
</style>