import { ref } from 'vue'
import { v4 as uuid4 } from 'uuid'
import axios from 'axios'


const API_PATH = "http://127.0.0.1:8000/api/v0"

axios.defaults.timeout = 2500

export const store = ref({
  list: (await axios.get(API_PATH+"/items/")).data,//Array.from({ length: 10 }, createItem),

  basket: [],
  places: (await axios.get(API_PATH+"/places/")).data,
})

export function toBasket(id) {
  store.value.basket.push(store.value.list.find((item) => (item.id == id)))
  store.value.list.splice(store.value.list.findIndex((item) => (item.id == id)), 1)
}

export function addItem(heading, amount, min_amount) {
  store.value.list.push({
    id: uuid4(),
    heading: heading,
    amount: amount,
    min_amount: min_amount,
  })
}