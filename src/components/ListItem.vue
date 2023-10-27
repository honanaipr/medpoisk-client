<script setup>
import CrossIcon from '../components/icons/CrossIcon.vue';
import TrashIcon from '../components/icons/TrashIcon.vue'
import { toBasket, clearBasket } from '../store.js'
import router from '../router';

function singularWriteOff(id) {
  clearBasket()
  toBasket(id)
  router.push('basket')
}

const props = defineProps(['item'])

</script>

<template>
  <div class="box item">
    {{ item.heading }}
    <nav class="level is-mobile">
      <div class="level-left">
        <p class="level-item" aria-label="reply">
          {{ item.amount }}/{{ item.min_amount }}
        </p>
      </div>
      <div class="level-item">
        <button class="button is-small item-control" @click="singularWriteOff(item.id)">
          <CrossIcon />
        </button>
        <button class="button is-small item-control" @click="toBasket(item.id)">
          <TrashIcon />
        </button>
      </div>
      <div class="level-right">
        <div class="content">
          <p class="place-tag" v-for="place in item.places" :key="place.id">
            {{ place.title }}
          </p>
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
