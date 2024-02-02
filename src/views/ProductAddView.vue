<script setup lang="ts">
import { ref, computed } from 'vue'
import router from '../router'
import { InvoiceItem, Picture, Product } from '@/types.js'
import PlusIcon from '../components/icons/PlusIcon.vue'
import defaultImage from '@/assets/add_image.png'
import { useProductStore } from '@/stores/product_store'
import { usePlaceStore } from '@/stores/place_store'

const product_store = useProductStore()
const places_store = usePlaceStore()

defineProps(['target_name'])

let heading = ref('')
// let amount = ref(null)
let limit = ref(null)
let barcode = ref(null)
let description = ref('')
// let selected_place_id = ref('')
let product_id = ref('')
const iamgeSrc = ref(defaultImage)
const imageFile = ref(null)
const imgInp = ref(null)

async function apply() {
  product_store.addProduct(new Product({
    title: heading.value,
    description: description.value,
    barcode: barcode.value,
    pictures: [
      new Picture({ url: iamgeSrc.value })
    ] 
  }))
  router.replace({name: "home"})
}

const form_verified = computed(function () {
    return !!heading.value && !!limit.value
})

function onfileChange() {
  const [file] = imgInp.value.files
  imageFile.value = file
  if (file) {
    iamgeSrc.value = URL.createObjectURL(file)
  }
}

</script>

<template>
  <div class="field">
    <div class="uploadBox has-text-centered">
      <label for="uploadFile" id="uploadIcon" class="is-inline-block">
        <figure class="image is-128x128">
          <img :src="iamgeSrc" style="border-radius: 0.5rem" />
        </figure>
      </label>
    </div>
    <input type="file" ref="imgInp" @change="onfileChange" id="uploadFile" class="uploadFile" />
  </div>

  <div class="container is-fluid is-mobile">

    <div class="field">
      <label class="label">Наименование:</label>
      <div class="control">
        <input class="input" type="text" placeholder="Наименование продукта..." v-model="heading" :class="{ 'is-danger': !heading }" />
      </div>
      <p class="help is-danger" v-if="!product_id && !heading">Поле необходимо</p>
    </div>

    <div class="field">
      <label class="label">Неснижаемый остаток:</label>
      <div class="control">
        <input class="input" type="number" placeholder="Неснижаемый остаток..." v-model="limit" :class="{ 'is-danger': !limit }"/>
        <p class="help is-danger" v-if="!limit">Поле необходимо</p>
      </div>
    </div>

    <div class="field">
      <label class="label">Штрихкод:</label>
      <div class="control">
        <input class="input" type="number" placeholder="Штрихкод..." v-model="barcode" />
      </div>
    </div>

    <div class="field">
      <label class="label">Описание:</label>
      <div class="control">
        <textarea class="textarea" placeholder="Описание продукта..." v-model="description"></textarea>
      </div>
    </div>

    <div class="field is-grouped">
      <div class="control">
        <button class="button" @click="apply" :disabled="!form_verified">Применить</button>
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

svg {
  width: 20px;
}
</style>
