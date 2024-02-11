<script setup lang="ts">
import type { InvoiceItem } from '@/stores/invoice_store';
import SectionComponent from './common/SectionComponent.vue';
const props = defineProps({
  invoiceItem: {type: Object as ()=>InvoiceItem, required: true},
  index: {type: Number, default: 0}
})

import { useInvoiceStore } from '@/stores/invoice_store'
const invoiceStore = useInvoiceStore()
</script>

<template>
  <SectionComponent>
    <div class="first-row">
      <span class="element-number">{{ index?`${index}.`:'' }}</span>
      <span>{{ invoiceItem.product.title }}</span>
    </div>
    <div class="second-row">
      <span>{{ invoiceItem.priceForOne }}₽/шт. - {{ invoiceItem.priceForOne }}₽/упк.</span>
    </div>
    <div class="third-row">
      <div class="left">
        <span>{{ invoiceStore.numberOfAllocationsFullfiled(invoiceItem) }}\{{ invoiceItem.allocations.length }}</span>
      </div>
      <div class="left">
        <span v-if="invoiceStore.numberOfAllocationsFullfiled(invoiceItem) < invoiceItem.allocations.length">Хранение не выбрано</span>
        <span v-else>Хранение выбрано</span>
      </div>
    </div>
  </SectionComponent>
  

  <!-- <div class="box item">
    {{ item.product.title }}
    <nav class="level is-mobile">
      <div class="level-left">
        <p class="level-item" aria-label="reply" style="display: block; width: 5rem">
          {{ item.amount }}
        </p>
      </div>
      <div class="level-right">
        <div class="content">
          <p style="display: block; width: 4rem">
            {{ item.places[0].title }}
          </p>
        </div>
      </div>
    </nav>
  </div> -->
</template>

<style scoped lang="sass">
span.element-number
  margin-right: 8px
// .item {
//   margin-bottom: 0.5rem;
//   border: 1px solid black;
//   padding: 0.5rem;
//   border-radius: 5px;
// }

// .item-control {
//   width: 5rem;
// }

// p.place-tag {
//   margin-bottom: 0;
// }
div.third-row
  display: flex
  flex-direction: row
  justify-content: space-between

</style>
