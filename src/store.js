import { ref } from 'vue'
import { v4 as uuid4 } from 'uuid'
import axios from 'axios'
import { CronJob } from 'cron'

const API_PATH = 'http://127.0.0.1:8000/api/v0'

axios.defaults.timeout = 2500

export const store = ref({
  list: [], //Array.from({ length: 10 }, createItem),

  basket: [],
  invoice: [],
  doctors: [],
  rooms: [],
  places: []
})
function updateData() {
  axios
    .get(API_PATH + '/items/')
    .then((responce) => {
      store.value.list = responce.data
    })
    .catch((error) => {
      console.log(error)
    })

  axios
    .get(API_PATH + '/doctors/')
    .then((responce) => {
      store.value.doctors = responce.data
    })
    .catch((error) => {
      console.log(error)
    })

  axios
    .get(API_PATH + '/rooms/')
    .then((responce) => {
      store.value.rooms = responce.data
    })
    .catch((error) => {
      console.log(error)
    })

  axios
    .get(API_PATH + '/places/')
    .then((responce) => {
      store.value.places = responce.data
    })
    .catch((error) => {
      console.log(error)
    })
}
updateData()
const job = new CronJob('*/30 * * * * *', updateData)
job.start()

export function toBasket(id) {
  store.value.basket.push(store.value.list.find((item) => item.id == id))
  store.value.list.splice(
    store.value.list.findIndex((item) => item.id == id),
    1
  )
}

export function backToList(id) {
  store.value.list.push(store.value.basket.find((item) => item.id == id))
  store.value.basket.splice(
    store.value.basket.findIndex((item) => item.id == id),
    1
  )
}

export function addItem2List(heading, amount, min_amount, places) {
  store.value.list.push({
    id: uuid4(),
    heading: heading,
    amount: amount,
    min_amount: min_amount,
    places: places
  })
}

export function addItem2Target(target, heading, amount, min_amount, barcode, place_id) {
  store.value.invoice.push({
    id: uuid4(),
    heading: heading,
    amount: amount,
    min_amount: min_amount,
    barcode: barcode,
    places: store.value.places.filter((value) => value.id == place_id)[0]
  })
}

export function writeOff(doctor_id, rooms_id) {
  while (store.value.basket.length) {
    console.log(doctor_id.value, rooms_id.value, store.value.basket[0])
    // axios.post()
    store.value.basket.splice(0, 1)
  }
}
