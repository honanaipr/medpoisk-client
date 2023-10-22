<script setup>
import PlusIcon from '../components/icons/PlusIcon.vue';
import { ref } from 'vue'
import { store } from '../store.js'
let selected_places = ref([1, 2, 3])


</script>

<template>
  <div class="container is-fluid">

    <div class="field">
      <label class="label">Наименование:</label>
      <div class="control">
        <input class="input" type="text">
      </div>
    </div>

    <label class="label">Колличество наименований</label>

    <div class="field is-grouped">
      <div class="control">
        <label class="label">Колличество:</label>
        <input class="input" type="number">
      </div>

      <div class="control">
        <label class="label">Неснижаемый остаток:</label>
        <input class="input" type="number">
      </div>
    </div>

    <div class="field">
      <label class="label">Штрихкод:</label>
      <div class="control">
        <input class="input" type="number">
      </div>
    </div>

    <label class="label">Места хронения:</label>

    <div class="buttons">
      <button v-for="place in store.places" class="button">{{ place }}</button>
      <button class="button">
        <PlusIcon />
      </button>
    </div>

    <div class="field is-grouped">

      <div class="control">
        <button class="button is-link">Применить</button>
      </div>

      <div class="control">
        <button class="button is-link is-light">Отменить</button>
      </div>

    </div>
  </div>
</template>
