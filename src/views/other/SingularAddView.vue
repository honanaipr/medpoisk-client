<script setup lang="ts">
import { type InventoryJointItem } from '../stores/inventory_store'
import { computed, onMounted, ref } from 'vue'
import ProductDataEditor from '@/components/ProductDataEditor.vue'
import ProductAllocator from '@/components/ProductAllocator.vue'
import ButtonComponent from '@/components/inputs/ButtonComponent.vue'

async function apply() {
}

const form_verified = computed(function () {
  return true
})

const item = ref<InventoryJointItem>()
onMounted(async()=>{
  item.value = {
    product : {
      id: 0,
      title: '',
      barcode: 0,
      description: '',
      pictures: [],
    },
    amount : 0,
    limit : 0,
    allocations : [],
  }
})
const editable = ref(true)
const dataful = ref()
</script>

<template>
  <div class="product-view flex-col" v-if="item">
    <input type="checkbox" id="scales" name="scales" checked v-model="editable" />
    <ProductDataEditor v-model:item="item" :editable="editable" v-model:fullfilled="dataful"/>
    <ProductAllocator v-model:item="item" :editable="editable"/>
    <div v-if="editable" class="flex-col small-gap">
      <ButtonComponent has-border contrast @click="$router.back()">Отменить</ButtonComponent>
      <ButtonComponent :disabled="!form_verified" has-border contrast has-fill @click="apply">Сохранить наименование
      </ButtonComponent>
    </div>
  </div>
</template>
