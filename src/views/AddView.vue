<script setup>
import { ref, computed } from 'vue'
import router from '../router'
import { store } from '../store.js'
import { addItem2Target } from '../store.js'

const props = defineProps(['target'])

let heading = ref("")
let amount = ref(null)
let min_amount = ref(null)
let barcode = ref(null)
let selected_place_id = ref("")

function apply() {
    addItem2Target(props.target, heading.value, amount.value, min_amount.value, barcode.value, selected_place_id.value)
  // router.push({name:"home"})
  router.go(-1)
}

const apply_enabled = computed(function () {
  return !!heading.value && !!amount.value && !!min_amount.value && !!barcode.value && !!selected_place_id.value
})

</script>

<template>
  <div class="container is-fluid">

    <div class="field">
      <div class="uploadBox has-text-centered">
        <label for="uploadFile" id="uploadIcon" class="is-inline-block">
          <figure class="image is-128x128 ">
            <img src="@/assets/add_image.png" style="border-radius: 0.5rem;">
          </figure>
        </label>

      </div>
      <input type="file" value="upload" id="uploadFile" class="uploadFile" />
    </div>

    <div class="field">
      <label class="label">Наименование:</label>
      <div class="control">
        <input class="input" type="text" v-model="heading" :class="{ 'is-danger': !heading }">
      </div>
      <p class="help is-danger" v-if="!heading">Поле необходимо</p>
    </div>

    <label class="label">Колличество наименований</label>

    <div class="field is-grouped">
      <div class="control">
        <label class="label has-text-weight-light">Колличество:</label>
        <input class="input" type="number" v-model="amount" :class="{ 'is-danger': !amount }">
        <p class="help is-danger" v-if="!amount">Поле необходимо</p>
      </div>


      <div class="control">
        <label class="label has-text-weight-light">Неснижаемый остаток:</label>
        <input class="input" type="number" v-model="min_amount" :class="{ 'is-danger': !min_amount }">
        <p class="help is-danger" v-if="!min_amount">Поле необходимо</p>
      </div>

    </div>

    <div class="field">
      <label class="label">Штрихкод:</label>
      <div class="control">
        <input class="input" type="number" v-model="barcode" :class="{ 'is-danger': !barcode }">
      </div>
      <p class="help is-danger" v-if="!barcode">Поле необходимо</p>
    </div>

    <div class="field">
      <label class="label">Место хронения:</label>
      <div class="control">
        <div class="select" :class="{ 'is-danger': !selected_place_id }">
          <select v-model="selected_place_id">
            <option disabled value="">Выбрать место</option>
            <option v-for="place in store.places" :key="place.id" :value="place.id">{{ place.title }}</option>
          </select>
        </div>
      </div>
      <p class="help is-danger" v-if="!selected_place_id">Поле необходимо</p>
    </div>

    <div class="field is-grouped">

      <div class="control">
        <button class="button" @click="apply" :disabled="!apply_enabled">Применить</button>
      </div>

      <div class="control">
        <button class="button" @click="router.go(-1)">Отменить</button>
      </div>

    </div>
  </div>
</template>

<style scoped>
.uploadFile {
  display: none;
}

#uploadIcon {
  cursor: pointer;
}
</style>