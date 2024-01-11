<script setup lang="ts">
import { ref, computed } from 'vue'
import router from '../router'
import { useInventoryStore } from '../stores/inventory_store'
import { useProductStore } from '../stores/product_store'
import { useListStore } from '../stores/list_store'
import { ListItem } from '@/types'


const props = defineProps({
  listItem: {type: ListItem, required: true}
})
const writeOffAmount = ref(0)

const inventory_store = useInventoryStore() 
const product_store = useProductStore() 
const list_store = useListStore() 

const amount = computed(()=>{
  return props.listItem.amount
})

const places = computed(()=>{
  return props.listItem.places
})

const detectDoubleTapClosure = (()=>{
  let lastTap = 0;
  let timeout;
  return function detectDoubleTap(event) {
    const curTime = new Date().getTime();
    const tapLen = curTime - lastTap;
    if (tapLen < 300 && tapLen > 0) {
      router.push({ name: 'product', params: { id: props.listItem.product.id } })
      event.preventDefault();
    } else {
      timeout = setTimeout(() => {
        clearTimeout(timeout);
      }, 500);
    }
    lastTap = curTime;
  };
})()

</script>

<template>
  <div class="box item" @dblclick="$router.push({ name: 'product', params: { id: listItem.product.id } })" @touchend="detectDoubleTapClosure($event)">
    {{ listItem.product.title }}
    <nav class="level is-mobile">
      <div class="level-left">
        <p class="level-item" aria-label="reply" style="display: block; width: 5rem;"
          :style="{ 'color': amount < listItem.limit ? 'red' : 'black' }">
          {{ amount }}/{{ listItem.limit }}
        </p>
      </div>
      <div class="level-right">
        <div class="content">
          <p class="place-tag" v-for="place in places" :key="place.id" style="display: block; width: 4rem;">
            {{ place.title }}
          </p>
          <button class="button is-small" v-if="!places.length" style="display: block; color:red;"
            @click="alert('not implemented')">Удалить</button>
        </div>
      </div>
    </nav>
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
