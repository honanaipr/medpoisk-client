<script setup lang="ts">
import { computed } from 'vue'
import router from '../router'
import { ListItem } from '@/types'

const props = defineProps({
  listItem: { type: ListItem, required: true },
})

const amount = computed(() => {
  return props.listItem.amount
})

const places = computed(() => {
  return props.listItem.places
})

const detectDoubleTapClosure = (() => {
  let lastTap = 0
  let timeout
  return function detectDoubleTap(event) {
    const curTime = new Date().getTime()
    const tapLen = curTime - lastTap
    if (tapLen < 300 && tapLen > 0) {
      router.push({ name: 'product', params: { id: props.listItem.product.id } })
      event.preventDefault()
    } else {
      timeout = setTimeout(() => {
        clearTimeout(timeout)
      }, 500)
    }
    lastTap = curTime
  }
})()
</script>

<template>
  <div
    class="box item"
    @dblclick="$router.push({ name: 'product', params: { id: listItem.product.id } })"
    @touchend="detectDoubleTapClosure($event)"
  >
    <p>{{ listItem.product.title }}</p>
    <div class="controls">
      <div class="amount-info">
        <p>Доступно: {{ amount }}</p>
        <p :style="{ color: amount < listItem.limit ? 'red' : null }">
          Минимум: {{ listItem.limit }}
        </p>
      </div>
      <div class="places-info">
        <p class="place-tag" v-for="place in places" :key="place.id">
          {{ place.title }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.item {
  margin-bottom: 0.5rem;
  border: 1px solid black;
  padding: 0.5rem;
  border-radius: 5px;
}

p.place-tag {
  margin-bottom: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}

.amount-info p,
.places-info p {
  margin-bottom: 0px;
  white-space: nowrap;
}

.places-info p {
  border: 1px solid grey;
  border-radius: 5px;
  padding: 0.2rem;
  margin-bottom: 0.5rem;
}
</style>
