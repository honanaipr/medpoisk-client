<script setup lang="ts">
import { ref, computed } from 'vue'
import router from '../router'
import { InvoiceItem } from '@/types.js'
import PlusIcon from '../components/icons/PlusIcon.vue'
import defaultImage from '@/assets/add_image.png'
import ButtonComponent from '@/components/inputs/ButtonComponent.vue'
import CustomNumberInput from '@/components/inputs/CustomNumberInput.vue'
import SelectComponetn from '@/components/inputs/SelectComponent.vue'
import { useProductStore } from '@/stores/product_store'
import { useInvoiceStore } from '@/stores/invoice_store'

const productStore = useProductStore()
const invoiceStore = useInvoiceStore()

let amount = ref(0)
let productId = ref('')
let priceForOne = ref(0)
let priceForPackage = ref(0)

async function apply() {
  const product = productStore.products.find(product=>product.id == Number(productId.value))
  if (product){
    invoiceStore.invoiceItems.push({
      product,
      priceForOne: priceForOne.value,
      priceForPackage: priceForPackage.value,
      fullAmount: amount.value,
      allocations: []
    })
  }
}


const options = computed<{title: string, id: number}[]>(()=>{
  let options:{title: string, id: number}[] = []
  for (const product of productStore.products) {
    options.push({title: product.title, id: product.id})
  }
  return options
})
import InputComponent from '@/components/inputs/InputComponent.vue'
</script>

<template>
  <div class="add-to-invoice-view">
    <div class="product-selector">
      <SelectComponetn title="Название" v-model="productId" :options="options"/>
      <ButtonComponent has-border @click="$router.push({name: 'addProduct'})">+</ButtonComponent>
    </div>
    <h1>Цена наименований</h1>
    <div class="prices">
      <InputComponent title="Цена за шт." v-model="priceForOne"/>
      <InputComponent title="Цена за упк." v-model="priceForPackage"/>
    </div>
    <InputComponent type="number" title="Количество" v-model="amount"/>
    <ButtonComponent centered has-border contrast @click="$router.back()">Отменить</ButtonComponent>
    <ButtonComponent centered has-border contrast has-fill @click="apply();$router.back()">Сохранить наименование</ButtonComponent>
  </div>
</template>

<style scoped lang="sass">
div.add-to-invoice-view
  display: flex
  flex-direction: column
  gap: 16px

div.product-selector
  display: flex
  flex-direction: row
  justify-content: space-between
  gap: 8px
  align-items: flex-end
  button
    aspect-ratio: 1
    width: 55px
    flex-grow: 0
    display: block
  div
    flex-grow: 1
// .uploadFile {
//   display: none;
// }

// #uploadIcon {
//   cursor: pointer;
// }
// svg {
//   width: 20px;
// }
div.prices
  display: flex
  flex-direction: row
  gap: 16px
</style>
