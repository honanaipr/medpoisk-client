<script setup>
import CrossIcon from '../components/icons/CrossIcon.vue'
import TrashIcon from '../components/icons/TrashIcon.vue'
import AngleUp from '../components/icons/AngleUp.vue'
import AngleDown from '../components/icons/AngleDown.vue'
import { store } from '../store.js'
import { API_POSITION_PATH } from '../pathes'
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
  return API_POSITION_PATH+`${writeOffPlaceID.value}/${item.id}`
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
          {{ effective_amount }}/{{ item.limit }}
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
