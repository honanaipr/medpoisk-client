<script setup lang="ts">
import { ref, computed } from 'vue'
import router from '../router'
import { InvoiceItem, Picture, Product } from '@/types.js'
import PlusIcon from '../components/icons/PlusIcon.vue'
import defaultImage from '@/assets/add_image.png'
import { useProductStore } from '@/stores/product_store'
import { usePlaceStore } from '@/stores/place_store'
import InputComponent from '@/components/inputs/InputComponent.vue'
import ButtonComponent from '@/components/inputs/ButtonComponent.vue'
import SectionComponentVue from '@/components/common/SectionComponent.vue'

const product_store = useProductStore()
const places_store = usePlaceStore()

defineProps(['target_name'])

let productTitle = ref('')
let limit = ref('')
let barcode = ref('')
let description = ref('')
const iamgeSrc = ref(defaultImage)
const imageFile = ref(null)
const imgInp = ref(null)

async function apply() {
  product_store.addProduct(new Product({
    title: productTitle.value,
    description: description.value,
    barcode: barcode.value,
    pictures: [
      new Picture({ url: iamgeSrc.value })
    ] 
  }))
  router.replace({name: "home"})
}

const form_verified = computed(function () {
    return !!productTitle.value && !!limit.value
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
  <div class="product-add-view">
    <SectionComponentVue>
      <InputComponent title="Наименование" placeholder="Аспирин" v-model="productTitle"></InputComponent>
      <InputComponent title="Неснижаемый остаток" placeholder="4" v-model="limit"></InputComponent>
      <InputComponent title="Штрихкод" placeholder="987654321098" v-model="barcode"></InputComponent>
      <div class="field">
        <label class="label">Описание:</label>
        <div class="control">
          <textarea class="textarea" placeholder="Описание продукта..." v-model="description"></textarea>
        </div>
      </div>
    </SectionComponentVue>
    <div class="buttons">
      <ButtonComponent has-border contrast @click="$router.back()">Отменить</ButtonComponent>
      <ButtonComponent :disabled="!form_verified" has-border contrast has-fill @click="apply">Списать</ButtonComponent>
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
