import { ref } from 'vue'
import { v4 as uuid4 } from 'uuid'
import { faker } from '@faker-js/faker'

const default_places = [
  {id:uuid4(), title:"Шкайф №1"},
  {id:uuid4(), title:"Шкайф №2"},
  {id:uuid4(), title:"Шкайф №3"},
  {id:uuid4(), title:"Холодильник"},
  {id:uuid4(), title:"Морозильник"},
]


function createItem(){
  let id = uuid4()
  let heading = faker.commerce.productDescription()
  let amount = faker.number.int({max:40, min:1})
  let min_amount = faker.number.int({max:amount, min:1})
  let places = faker.helpers.arrayElements(default_places, { min: 1, max: 3 })
  return {id: id, heading: heading, amount:amount, min_amount:min_amount, places:places}
}
export const store = ref({
  list: Array.from({ length: 10 }, createItem),

  basket: [],
  places: default_places,
})

export function toBasket(id) {
  store.value.basket.push(store.value.list.find((item) => (item.id == id)))
  store.value.list.splice(store.value.list.findIndex((item) => !(item.id == id))-1, 1)
}

export function addItem(heading, amount, min_amount) {
  store.value.list.push({
    id: uuid4(),
    heading: heading,
    amount: amount,
    min_amount: min_amount,
  })
}