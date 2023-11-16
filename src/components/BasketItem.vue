<script setup>
import CrossIcon from '../components/icons/CrossIcon.vue'
import TrashIcon from '../components/icons/TrashIcon.vue'
import ExtractIcon from '../components/icons/ExtractIcon.vue'
import AngleUp from '../components/icons/AngleUp.vue'
import AngleDown from '../components/icons/AngleDown.vue'
import { store, API_POSITIONS_PATH } from '../store.js'
import router from '../router';
import { ref, watch, computed } from 'vue'
import { useFetch } from '@vueuse/core'
import _ from 'lodash'

function singularWriteOff() {
  store.clearBasket()
  item.basketed = true
  router.push('basket')
}

// eslint-disable-next-line no-unused-vars
const props = defineProps(['source', 'index'])
const item = props.source[props.index]
const writeOffAmount = ref(item.writeOffAmount)
const writeOffPlaceID = ref(item.writeOffPlaceID)

const position_url = computed(()=>{
  return API_POSITIONS_PATH+`${writeOffPlaceID.value}/${item.id}`
})

const { data: position, execute } = useFetch(position_url, { immediate: false }).get().json()

watch(position_url, (newValue)=>{
  if (newValue) execute()
})

const effective_amount = computed(()=>{
  return position.value?position.value[0].amount:item.amount
})
watch(writeOffAmount, (newValue) => {
  _.find(store.basket, (n) => n.id == item.id).writeOffAmount = newValue
})

watch(writeOffPlaceID, (newValue) => {
  store.items = store.items.map(n=>{
    if (n.id == item.id) {
      n.writeOffPlaceID = newValue
    }
    return n
  })
})

watch(position, (newValue)=>{
  if (writeOffAmount.value > newValue[0].amount){
    writeOffAmount.value = newValue[0].amount
  }
})

</script>

<template>
  <div class="box item">
    {{ item.title }}
    <nav class="level is-mobile">
      <div class="level-left">
        <p class="level-item" aria-label="reply" style="display: block; width: 5rem;">
          {{ effective_amount }}/{{ item.min_amount }}
        </p>
      </div>
      <div class="level-item has-text-centered" v-if="$route.name == 'home'">
        <button class="button is-small item-control" @click="singularWriteOff(item.id)">
          <CrossIcon />
        </button>
        <button class="button is-small item-control" @click="store.toBasketById(item.id)">
          <TrashIcon />
        </button>
      </div>

      <div class="level-item has-text-centered" v-if="$route.name == 'addInvoice'">
        <button class="button is-small item-control" @click="store.forgetItem(item.id)">
          <CrossIcon />
        </button>
      </div>
      <div class="level-right">
        <div class="field">
          <label class="label">Место хронения:</label>
          <div class="control">
            <div class="select" :class="{ 'is-danger': !writeOffPlaceID }">
              <select v-model="writeOffPlaceID">
                <option disabled value="">Выбрать место</option>
                <option v-for="place in item.places" :key="place.id" :value="place.id">{{ place.title }}</option>
              </select>
            </div>
          </div>
          <p class="help is-danger" v-if="!writeOffPlaceID">Поле необходимо</p>
        </div>
      </div>
    </nav>
    <nav class="level is-mobile" style="padding-bottom: 0.5rem;"> <!--TODO fix inline style -->
      <div class="level-left">
        <div class="field has-addons" v-if="$route.name == 'basket'">
          <p class="control">
            <a class="button" @click="writeOffAmount < effective_amount ? writeOffAmount++ : ()=>{}">
              <AngleUp />
            </a>
          </p>
          <p class="control">
            <input class="input" type="text" placeholder="0" style="width: 3rem;" v-model="writeOffAmount">
          </p>
          <p class="control">
            <a class="button" @click="writeOffAmount > 0 ? writeOffAmount-- : () => { }">
              <AngleDown />
            </a>
          </p>
        </div>
      </div>
      <div class="level-left">
        <div class="field has-addons" v-if="$route.name == 'basket'">
          <p class="control">
            <button class="button item-control" @click="store.unBasketById(item.id)">
              <ExtractIcon />
            </button>
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
