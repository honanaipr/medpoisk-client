<script setup lang="ts">
import { computed } from 'vue'
import InvoiceDataForm from '@/components/InvoiceDataForm.vue'
import ButtonComponent from '@/components/inputs/ButtonComponent.vue'
import { useInvoiceStore } from '@/stores/invoice_store'
import InvoiceListItem from '@/components/InvoiceListItem.vue'
import SwipeContainer from '@/components/swipe/SwipeContainer.vue'
import SwipeItem from '@/components/swipe/SwipeItem.vue'
import SwipeHintsComponent from '@/components/swipe/SwipeHintsComponent.vue'
import SwipeRight from '@/components/icons/SwipeRight.vue'
import SwipeLeft from '@/components/icons/SwipeLeft.vue'

// function btnAddOnClicked() {
//   router.push({ name: 'addToInvoice' })
// }

// async function apply() {
//   console.log('apply')
//   store.invoice.forEach(async (element) => {
//     await store.patchItem(element)
//   })
//   store.invoice = []
//   router.push({ name: 'inventory' })
// }

const invoiceStore = useInvoiceStore()
const heading = computed(() => {
  return (
    'Накладная №' + (invoiceStore.invoiceNumber || '?') + ' от ' + (invoiceStore.invoiceDate || '?')
  )
})
</script>

<template>
  <div class="invoice-view">
    <h1>{{ heading }}</h1>
    <InvoiceDataForm />
    <ButtonComponent centered has-border
      >Обработанные позиции {{ invoiceStore.numberOfFullfiledItems }}/{{
        invoiceStore.invoiceItems.length
      }}</ButtonComponent
    >
    <div class="apply-form" v-if="invoiceStore.allInvoiceItemsFullfiled">
      <span class="empty-hint">Все позиции обработаны</span>
      <ButtonComponent centered has-border contrast>Отменить</ButtonComponent>
      <ButtonComponent centered has-border contrast has-fill>Сохранить накладную</ButtonComponent>
    </div>
    <SwipeHintsComponent v-if="invoiceStore.invoiceItems.length">
      <template #swipe-hints>
        <span>
          Выбрать хранение
          <SwipeLeft />
        </span>
        <span>
          Исправить
          <SwipeRight />
        </span>
      </template>
    </SwipeHintsComponent>
    <span class="empty-hint" v-else>Добавьте поступившие наименования</span>
    <SwipeContainer class="item-container" v-if="invoiceStore.invoiceItems.length">
      <SwipeItem
        v-for="(item, index) of invoiceStore.invoiceItems"
        :key="item.product.id"
        @right="
          () => {
            console.error('выбрать зранение')
          }
        "
        @left="
          () => {
            console.error('исправить')
          }
        "
      >
        <InvoiceListItem :invoiceItem="item" :index="index + 1" />
      </SwipeItem>
    </SwipeContainer>
    <ButtonComponent centered has-border @click="$router.push({ name: 'addToInvoice' })"
      >+</ButtonComponent
    >
  </div>
</template>

<style scoped lang="sass">
.item-container
  display: flex
  flex-direction: column
  gap: 16px

div.invoice-view
  // padding: 0 10px
  display: flex
  flex-direction: column
  gap: 16px

span.empty-hint
  display: block
  text-align: center

div.apply-form
  display: flex
  flex-direction: column
  gap: 8px
.swipe-hint span
  font-size: 16px
  font-weight: 600
  color: var(--devider-color)
  display: flex
  flex-direction: column
  align-items: center
  justify-content: space-between
</style>
