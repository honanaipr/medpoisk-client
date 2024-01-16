<script setup lang="ts">
import { Product } from '@/types';
import { defineProps } from 'vue';

defineProps({
  item: { type: Product, required: true },
}) 

</script>

<template>
    <div class="card">
      {{ item.title }}<br/>
      {{ item.description ?? "Нет описания" }}<br/>
      {{ item.barcode ?? "Нет штрихкода"}}<br/>
      {{ item.pictures }}
    </div>
</template>

<style scoped lang="sass">
.card
  border: 1px solid grey
  border-radius: 5px
  transition: max-height 0.2s ease-out
  margin: 10px 0
</style>