<script setup lang="ts">
import { useInventoryStore, type InventoryJointItem } from '@/stores/inventory_store'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import ProductDataEditor from '@/components/ProductDataEditor.vue'
import ProductAllocator from '@/components/ProductAllocator.vue'
import SpinnerComponent from '@/components/common/SpinnerComponent.vue'
import ButtonComponent from '@/components/inputs/ButtonComponent.vue'

const route = useRoute()
const item = ref<InventoryJointItem>()
onMounted(async()=>{
  const inventoryStore = useInventoryStore()
  await inventoryStore.update()
  item.value = inventoryStore.jointInventory.find(item => item.product.id == Number(route.params.id))
})
const editable = ref(false)
const imageFile = ref()
const price = ref(0)
</script>

<template>
  <div class="product-view flex-col" v-if="item">
    <ProductDataEditor
      v-model:imageFile="imageFile"
      v-model:productTitle="item.product.title"
      v-model:productLimit="item.limit"
      v-model:productBarcode="item.product.barcode"
      v-model:productPrice="price"
      v-model:productAmount="item.amount"
      :editable="editable"
    />
    <ProductAllocator v-model:allocations="item.allocations" :editable="false"/>
    <div class="flex-col">
      <ButtonComponent contrast hasBorder v-if="!editable" @click="editable = true">Редактировать</ButtonComponent>
      <ButtonComponent contrast hasBorder v-if="editable">Сохранить</ButtonComponent>
      <ButtonComponent v-if="editable"  @click="editable = false">Отменить</ButtonComponent>
    </div>
  </div>
  <SpinnerComponent v-else/>
</template>
