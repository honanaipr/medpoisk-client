<script setup lang="ts">
import { ref, computed } from 'vue'
import router from '../router'
import { store } from '../store.js'
import { InvoiceItem } from '@/types.js'
import PlusIcon from '../components/icons/PlusIcon.vue'
import defaultImage from '@/assets/add_image.png'
import _ from 'lodash'

defineProps(['target_name'])

let heading = ref('')
let amount = ref(null)
let limit = ref(null)
let barcode = ref(null)
let selected_place_id = ref('')
let product_id = ref('')

async function apply() {
  if (router.currentRoute.value.name == 'add') {
    await store.addItem(
      new store.Item(
        heading.value,
        amount.value,
        limit.value,
        barcode.value,
        selected_place_id.value
      ),
      imageFile.value
    )
    router.back()
  }
  if (router.currentRoute.value.name == 'addToInvoice') {
    const product = _.find(store.items, (item) => item.id == product_id.value)
    const places = [_.find(store.places, (item) => item.id == selected_place_id.value)]
    store.invoice.push(new InvoiceItem(product, places, amount.value))
    router.replace('addInvoice')
  }
}

const apply_enabled = computed(function () {
  if (router.currentRoute.value.name == 'add') {
    return !!heading.value && !!limit.value
  } else {
    return !!product_id.value && !!selected_place_id.value
  }
})

const iamgeSrc = ref(defaultImage)
const imageFile = ref(null)
const imgInp = ref(null)
function onfileChange() {
  const [file] = imgInp.value.files
  imageFile.value = file
  if (file) {
    iamgeSrc.value = URL.createObjectURL(file)
  }
}

function onAddProduct() {
  router.push({ name: 'add' })
}
</script>

<template>
  <div class="field" v-if="router.currentRoute.value.name == 'add'">
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
      <div class="control" v-if="$route.name == 'add'">
        <input class="input" type="text" v-model="heading" :class="{ 'is-danger': !heading }" />
      </div>
      <div class="control" v-if="$route.name == 'addToInvoice'">
        <div class="select" :class="{ 'is-danger': !product_id }">
          <select v-model="product_id">
            <option disabled value="">Выбрать продукт</option>
            <option v-for="product in store.items" :key="product.id" :value="product.id">
              {{ product.title }}
            </option>
          </select>
        </div>
      </div>
      <p class="help is-danger" v-if="!product_id && !heading">Поле необходимо</p>
    </div>
    <div class="field">
      <button class="button" @click="onAddProduct" v-if="$route.name != 'add'"><PlusIcon /></button>
    </div>
    <label class="label">Количество наименований</label>
    <div class="field is-horizontal is-mobile">
      <div class="field-body">
        <div class="field" v-if="router.currentRoute.value.name == 'addToInvoice'">
          <div class="control">
            <label class="label has-text-weight-light">Количество:</label>
            <input class="input" type="number" v-model="amount" :class="{ 'is-danger': !amount }" />
            <p class="help is-danger" v-if="!amount">Поле необходимо</p>
          </div>
        </div>
        <div class="field">
          <div class="control" v-if="$route.name == 'add'">
            <label class="label has-text-weight-light">Неснижаемый остаток:</label>
            <input class="input" type="number" v-model="limit" :class="{ 'is-danger': !limit }" />
            <p class="help is-danger" v-if="!limit">Поле необходимо</p>
          </div>
        </div>
      </div>
    </div>
    <div class="field" v-if="$route.name == 'add'">
      <label class="label">Штрихкод:</label>
      <div class="control">
        <input class="input" type="number" v-model="barcode" />
      </div>
    </div>
    <div class="field" v-if="$route.name == 'addToInvoice'">
      <label class="label">Место хронения:</label>
      <div class="control">
        <div class="select" :class="{ 'is-danger': !selected_place_id }">
          <select v-model="selected_place_id">
            <option disabled value="">Выбрать место</option>
            <option v-for="place in store.places" :key="place.id" :value="place.id">
              {{ place.title }}
            </option>
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
svg {
  width: 20px;
}
</style>
