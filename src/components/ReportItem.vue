<script setup lang="ts">
import { Place, Product } from '@/types';
import { defineProps } from 'vue';

defineProps<{
  item: Product | Place,
}>() 

</script>

<template>
    <div class="card" v-if="(item instanceof Product)">
      {{ item.title }}<br/>
      {{ item.description ?? "Нет описания" }}<br/>
      {{ item.barcode ?? "Нет штрихкода"}}<br/>
      {{ item.pictures }}
    </div>
    <div class="card" v-else-if="(item instanceof Place)">
      {{ item.title }}<br/>
      {{ item.division_id }}<br/>
    </div>

</template>

<style scoped lang="sass">
.card
  border: 1px solid grey
  border-radius: 5px
  transition: max-height 0.2s ease-out
  margin: 10px 0
</style>