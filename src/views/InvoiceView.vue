<script setup lang="ts">
import ListComponent from '../components/ListComponent.vue'
import { store } from '../store.js'
import PlusIcon from '../components/icons/PlusIcon.vue'
import InvoiceDataForm from '../components/InvoiceDataForm.vue'
import router from '../router'
import InvoiceItem from '../components/InvoiceItem.vue'
import CrossIcon from '../components/icons/CrossIcon.vue'
import SwipeLeft from '../components/icons/SwipeLeft.vue'

function btnAddOnClicked() {
  router.push({ name: 'addToInvoice' })
}

async function apply() {
  console.log('apply')
  store.invoice.forEach(async (element) => {
    await store.patchItem(element)
  })
  store.invoice = []
  router.push({ name: 'home' })
}

function cancel() {
  console.log('cancel')
  router.push({ name: 'home' })
}

function allowApply() {
  return !!store.invoice.length && !!store.invoiceNumber && !!store.invoiceData
}
</script>

<template>
  <InvoiceDataForm />
  <ListComponent
    :items="store.invoice"
    :item-component="InvoiceItem"
    @right="
      (item) => {
        store.forgetItem(item.id)
      }
    "
  >
    <template #empty_caption> В накладной ничего нет </template>
    <template #swipe-hints>
      <span class="swipe-hint">
        Удалить из накладной
        <SwipeLeft />
      </span>
    </template>
    <template #left-icon>
      <CrossIcon />
    </template>
    <template #right-icon>
      <span></span>
    </template>
  </ListComponent>
  <div class="container is-fluid">
    <div class="field is-grouped">
      <button class="button is-large is-fullwidth" @click="btnAddOnClicked">
        <PlusIcon width="30px" />
      </button>
    </div>

    <div class="field is-grouped">
      <div class="control">
        <button class="button" @click="apply()" :disabled="!allowApply()">Применить</button>
      </div>
      <div class="control">
        <button class="button" @click="cancel">Отменить</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
svg {
  box-sizing: border-box;
  margin: 0.5rem;
  width: calc(100% - 1rem);
  height: calc(100% - 1rem);
}
.swipe-hint {
  margin: 0 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.swipe-hint svg {
  width: 30px;
  margin: 0;
}
</style>
