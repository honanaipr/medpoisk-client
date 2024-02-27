<script setup lang="ts">
import { ref, computed } from 'vue'
import router from '../router'
import { useProductStore } from '@/stores/product_store'
import InputComponent from '@/components/inputs/InputComponent.vue'
import ButtonComponent from '@/components/inputs/ButtonComponent.vue'
import ImageSelector from '@/components/inputs/ImageSelector.vue'
import TextAreaComponent from '@/components/inputs/TextAreaComponent.vue'

const product_store = useProductStore()

defineProps(['target_name'])

let productTitle = ref('')
let limit = ref('')
let barcode = ref('')
let description = ref('')
const imageFile = ref<File | null>(null)

async function apply() {
  product_store.addProduct({
    title: productTitle.value,
    description: description.value,
    limit: Number(limit.value),
    barcode: Number(barcode.value),
    pictures: imageFile.value ? [imageFile.value] : [],
  })
  router.replace({ name: 'inventory' })
}

const form_verified = computed(function () {
  return !!productTitle.value && !!limit.value
})
</script>

<template>
  <div class="product-add-view">
    <ImageSelector v-model="imageFile" />
    <InputComponent
      title="Наименование"
      placeholder="Аспирин"
      v-model="productTitle"
    ></InputComponent>
    <InputComponent title="Неснижаемый остаток" placeholder="4" v-model="limit"></InputComponent>
    <InputComponent title="Штрихкод" placeholder="987654321098" v-model="barcode"></InputComponent>
    <TextAreaComponent v-model="description" title="Описание" placeholder="Описание продукта..." />
    <div class="buttons">
      <ButtonComponent has-border contrast @click="$router.back()">Отменить</ButtonComponent>
      <ButtonComponent :disabled="!form_verified" has-border contrast has-fill @click="apply"
        >Списать</ButtonComponent
      >
    </div>
  </div>
</template>

<style scoped>
div.product-add-view {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 10px;
}
div.buttons {
  gap: 8px;
}
</style>
