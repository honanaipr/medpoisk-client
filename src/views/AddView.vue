<script setup>
import PlusIcon from '../components/icons/PlusIcon.vue';
import { ref } from 'vue'
import router from '../router'
import { store } from '../store.js'
import {addItem} from '../store.js'
let heading = ref("")
let amount = ref(null)
let min_amount = ref(null)
let barcode = ref(null)
let selected_places = ref([1, 2, 3])

function apply(){
  addItem(heading, amount, min_amount)
  // router.push({name:"home"})
  router.go(-1)
}

</script>

<template>
  <div class="container is-fluid">

    <div class="field">
      <label class="label">Наименование:</label>
      <div class="control">
        <input class="input" type="text" v-model="heading">
      </div>
    </div>

    <label class="label">Колличество наименований</label>

    <div class="field is-grouped">
      <div class="control">
        <label class="label has-text-weight-light">Колличество:</label>
        <input class="input" type="number" v-model="amount">
      </div>

      <div class="control">
        <label class="label has-text-weight-light">Неснижаемый остаток:</label>
        <input class="input" type="number" v-model="min_amount">
      </div>
    </div>

    <div class="field">
      <label class="label">Штрихкод:</label>
      <div class="control">
        <input class="input" type="number" v-model="barcode">
      </div>
    </div>

    <label class="label">Места хронения:</label>

    <div class="buttons">
      <button v-for="place in store.places" class="button" :key="place.id">{{ place.title }}</button>
      <button class="button">
        <PlusIcon />
      </button>
    </div>

    <div class="field is-grouped">

      <div class="control">
        <button class="button" @click="apply">Применить</button>
      </div>

      <div class="control">
        <button class="button" @click="router.go(-1)">Отменить</button>
      </div>

    </div>
  </div>
</template>
