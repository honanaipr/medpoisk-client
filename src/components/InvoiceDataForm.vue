<script setup lang="ts">
import { useInvoiceStore } from '@/stores/invoice_store'
import InputComponent from './inputs/InputComponent.vue';

const invoiceStore = useInvoiceStore()
</script>

<template>
  <div class="invoice-form-data">
    <InputComponent type="number" title="Накладная" placeholder="№" v-model="invoiceStore.invoiceNumber"/>
    <InputComponent type="date" title="Дата" placeholder="11.12.2024 г." v-model="invoiceStore.invoiceDate"/>
    <InputComponent type="text" title="Поставщик" placeholder="Наименование поставщика" v-model="invoiceStore.invoiceSupplier"/>
    <InputComponent type="date" title="Дата поступления" placeholder="11.12.2024 г." v-model="invoiceStore.invoiceDeliveryDate"/>
  </div>
</template>

<style scoped lang="sass">
div.invoice-form-data
  // padding: 0 10px
  display: flex
  flex-direction: column
  gap: 16px


</style>
