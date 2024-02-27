<script setup lang="ts">
import { ref, computed, reactive, onMounted, watch } from 'vue'
import ButtonComponent from '@/components/inputs/ButtonComponent.vue'
import { useInventoryStore } from '@/stores/inventory_store'
import ProductDataEditor from '@/components/ProductDataEditor.vue'
import ProductAllocator from '@/components/ProductAllocator.vue'
import { useRoute } from 'vue-router'

async function apply() {

}

const form_verified = computed(function () {
  return !!item.title && !!item.limit
})

const route = useRoute()
const item = reactive<{
  title: string;
  limit: number;
  barcode: number;
  description: string;
  amount: number;
  price: number;
  allocations: { place: { title: string, id: number, shortTitle: string, division_id: number }, amount: number }[]
  imageFile: File | null;
}>({
  title: '',
  limit: 0,
  barcode: 0,
  description: '',
  amount: 0,
  price: 0,
  allocations: [],
  imageFile: null,
})
const editable = ref(true)
function init() {
  if (route.name == "product") {
    const id = Number(route.params.id)
    const inventoryStore = useInventoryStore()
    const jointInventoryItem = inventoryStore.jointInventory.find(item => item.product.id == id)
    if (jointInventoryItem) {
      item.title = jointInventoryItem.product.title
      item.limit = jointInventoryItem.limit
      item.barcode = jointInventoryItem.product.barcode
      item.description = jointInventoryItem.product.description
      item.amount = jointInventoryItem.amount
      item.price = 100
      item.allocations = jointInventoryItem.allocations
      item.imageFile = null
      editable.value = false
    }
  }
  if (route.name == "addProduct") {
    item.title = ''
    item.limit = 0
    item.barcode = 0
    item.description = ''
    item.amount = 0
    item.price = 0
    item.allocations = []
    item.imageFile = null
    editable.value = true
  }
}
watch(()=>route.name, init)
init()
const fullfilled= ref(true)
</script>

<template>
  <div class="product-view flex-col" v-if="item">
    <input type="checkbox" id="scales" name="scales" checked v-model="editable" />
    <ProductDataEditor v-model:item="item" :editable="editable" v-model:fullfilled="fullfilled"/>
    <ProductAllocator v-model:item="item" :editable="editable"/>
    <div v-if="editable" class="flex-col small-gap">
      <ButtonComponent has-border contrast @click="$router.back()">Отменить</ButtonComponent>
      <ButtonComponent :disabled="!form_verified" has-border contrast has-fill @click="apply">Сохранить наименование
      </ButtonComponent>
    </div>
  </div>
</template>
