<script setup>
import CrossIcon from '../components/icons/CrossIcon.vue'
import TrashIcon from '../components/icons/TrashIcon.vue'
import ExtractIcon from '../components/icons/ExtractIcon.vue'
import AngleUp from '../components/icons/AngleUp.vue'
import AngleDown from '../components/icons/AngleDown.vue'
import { store } from '../store.js'
import router from '../router';
import { ref } from 'vue'

function singularWriteOff(id) {
  // clearBasket()
  // toBasket(id)
  store.clearBasket()
  store.toBasketById(id)
  router.push('basket')
}

// eslint-disable-next-line no-unused-vars
const props = defineProps(['item'])
const writeOffAmount = ref(0)
</script>

<template>
  <div class="box item">
    {{ item.title }}
    <nav class="level is-mobile">
      <div class="level-left">
        <p class="level-item" aria-label="reply" style="display: block; width: 5rem;">
          {{ item.amount }}/{{ item.min_amount }}
        </p>
      </div>
      <div class="level-item" v-if="$route.name == 'home'">
        <button class="button is-small item-control" @click="singularWriteOff(item.id)">
          <CrossIcon />
        </button>
        <button class="button is-small item-control" @click="store.toBasketById(item.id)">
          <TrashIcon />
        </button>
      </div>
      <div class="level-item" v-if="$route.name == 'basket'">
        <button class="button is-small item-control" @click="store.unBasketById(item.id)">
          <ExtractIcon />
        </button>
      </div>
      <div class="level-item" v-if="$route.name == 'addInvoice'">
        <button class="button is-small item-control" @click="store.forgetItem(item.id)">
          <CrossIcon />
        </button>
      </div>
      <div class="level-right">
        <div class="content">
          <p class="place-tag" v-for="place in item.places" :key="place.id" style="display: block; width: 7rem;">
            {{ place.title }}
          </p>
        </div>

      </div>
    </nav>
    <nav class="level is-mobile" style="margin-top: -2rem; padding-bottom: 0.5rem;"> <!--TODO fix inline style -->
      <div class="field has-addons" v-if="$route.name == 'basket'">
        <p class="control">
          <a class="button is-small" @click="writeOffAmount++">
            <AngleUp />
          </a>
        </p>
        <p class="control">
          <input class="input is-small" type="text" placeholder="0" style="width: 3rem;" v-model="writeOffAmount">
        </p>
        <p class="control">
          <a class="button is-small" @click="writeOffAmount--">
            <AngleDown />
          </a>
        </p>
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
