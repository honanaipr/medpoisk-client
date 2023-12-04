<script setup>
import CrossIcon from '../components/icons/CrossIcon.vue'
import ExtractIcon from '../components/icons/ExtractIcon.vue'
import AngleUp from '../components/icons/AngleUp.vue'
import AngleDown from '../components/icons/AngleDown.vue'
import { store } from '../store.js'
import { ref, computed } from 'vue'


const props = defineProps(['source', 'index'])
const item = props.source[props.index]
const writeOffAmount = ref(0)

const amount = computed(()=>{
  return store.items.filter((n)=>n.id==item.id)[0].amount
})

const places = computed(()=>{
  return store.items.filter((n)=>n.id==item.id)[0].places
})

</script>

<template>
  <div class="box item">
    {{ item.title }}
    <nav class="level is-mobile">
      <div class="level-left">
        <p class="level-item" aria-label="reply" style="display: block; width: 5rem;"
          :style="{ 'color': amount < item.min_amount ? 'red' : 'black' }">
          {{ amount }}/{{ item.min_amount }}
        </p>
      </div>
      <div class="level-item" v-if="$route.name == 'basket'">
        <button class="button is-small item-control" @click="store.unBasketById(item.id); $event.stopPropagation();">
          <ExtractIcon />
        </button>
      </div>
      <div class="level-item" v-if="$route.name == 'addInvoice'">
        <button class="button is-small item-control" @click="store.forgetItem(item.id); $event.stopPropagation();">
          <CrossIcon />
        </button>
      </div>
      <div class="level-right">
        <div class="content">
          <p class="place-tag" v-for="place in places" :key="place.id" style="display: block; width: 4rem;">
            {{ place.title }}
          </p>
          <button class="button is-small" v-if="!places.length" style="display: block; color:red;"
            @click="store.deleteProduct(item.id); $event.stopPropagation();">Удалить</button>
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
