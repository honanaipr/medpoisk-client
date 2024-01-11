<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { ListItem } from '@/types'
import { useListStore } from '@/stores/list_store';
import CustomNumberInput from '@/components/inputs/CustomNumberInput.vue';
import CustomPlaceSelector from './inputs/CustomPlaceSelector.vue';
const list_store = useListStore()

const props = defineProps({
  listItem: {type: ListItem, required: true}
})

const writeOffAmount = ref(0)
const writeOffPlaceID = ref(null)

</script>

<template>
  <div class="box item">
    {{ listItem.product.title }}
    <nav class="level is-mobile">
      <div class="level-left">
        <p class="level-item" aria-label="reply" style="display: block; width: 5rem;">
          {{ writeOffAmount }}/{{ listItem.limit }}
        </p>
      </div>
      <div class="level-right">
        <CustomPlaceSelector :places="listItem.places" v-model="writeOffPlaceID" />
      </div>
    </nav>
    <CustomNumberInput v-model="writeOffAmount" :max_value="listItem.limit" />
  </div>
</template>

<style scoped>
.item {
  margin-bottom: 0.5rem;
  border: 1px solid black;
  padding: 0.5rem;
  border-radius: 5px;
}

.item-control {
  width: 5rem;
}

p.place-tag {
  margin-bottom: 0;
}
</style>
