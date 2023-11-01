import { reactive, computed, toRaw, watch, ref } from 'vue'
import axios from 'axios'
import { useFetch, reactify } from '@vueuse/core'
import _ from 'lodash'
import Joi from 'joi'
import {
  productSchema,
  ListItem,
  roomSchema,
  Room,
  doctorSchema,
  RoomItem,
  DoctorItem,
  placeSchema,
  PlaceItem
} from './types'
const API_PATH = 'http://127.0.0.1:8000/api/v0/'
const API_PRODUCTS_PATH = `${API_PATH}products/`
const API_PLACES_PATH = `${API_PATH}places/`
const API_DOCTORS_PATH = `${API_PATH}doctors/`
const API_ROOMS_PATH = `${API_PATH}rooms/`

const {
  error: products_error,
  data: products_data,
  execute: sync_products
} = useFetch(API_PRODUCTS_PATH).get().json()

const {
  error: places_error,
  data: places_data,
  execute: sync_places
} = useFetch(API_PLACES_PATH).get().json()

const {
  error: doctors_error,
  data: doctors_data,
  execute: sync_doctors
} = useFetch(API_DOCTORS_PATH).get().json()

const {
  error: rooms_error,
  data: rooms_data,
  execute: sync_rooms
} = useFetch(API_ROOMS_PATH).get().json()

const syncError = ref({ products_error, places_error, doctors_error, rooms_error })
watch(syncError, () => {
  console.log('syncError: ', syncError)
})

watch(products_data, (newList, oldList) => {
  const { value, error } = Joi.array().items(productSchema).validate(newList)
  if (error) {
    console.log(error)
    return oldList
  }
  _.forEach(value, (item)=>{
    const exist_obj = _.find(store.items, exist_item =>exist_item.id == item.id )
    if (exist_obj) {
      item.basketed = exist_obj.basketed
    }
  })
  store.items = value.map((item) => {
    return new ListItem(item)
  })
})

watch(rooms_data, (newList, oldList) => {
  const { value, error } = Joi.array().items(roomSchema).validate(newList)
  if (error) {
    console.log(error)
    return oldList
  }
  store.rooms = value.map((item) => {
    return new RoomItem(item)
  })
})

watch(doctors_data, (newList, oldList) => {
  const { value, error } = Joi.array().items(doctorSchema).validate(newList)
  if (error) {
    console.log(error)
    return oldList
  }
  store.doctors = value.map((item) => {
    return new DoctorItem(item)
  })
})

watch(places_data, (newList, oldList) => {
  const { value, error } = Joi.array().items(placeSchema).validate(newList)
  if (error) {
    console.log(error)
    return oldList
  }
  store.places = value.map((item) => {
    return new PlaceItem(item)
  })
})

export const store = reactive({
  places: [],
  rooms: [],
  doctors: [],
  items: [],
  list: computed(() => {
    return store.items.filter((item) => !item.basketed)
  }),
  basket: computed(() => {
    return store.items.filter((item) => item.basketed)
  }),
  invoice: [],
  move: function (source, target, predicate) {
    for (let i = 0; i < source.length; i++) {
      if (predicate(source[i])) {
        target.push(source[i])
        source.splice(i, 1)
        break
      }
    }
  },
  drop: function (source, predicate) {
    for (let i = 0; i < source.length; i++) {
      if (predicate(source[i])) {
        source.splice(i, 1)
        break
      }
    }
  },
  sync: function () {
    sync_products()
    sync_places()
    sync_doctors()
    sync_rooms()
  },
  sync_aux: function () {
    sync_places()
    sync_doctors()
    sync_rooms()
  },
  clearBasket: function () {
    this.basket.forEach((item) => {
      item.basketed = false
    })
  },
  toBasketById: function (id) {
    _.find(this.list, (item) => item.id == id).basketed = true
  },
  unBasketById: function (id) {
    _.find(this.items, (item) => item.id == id).basketed = false
  },
  forgetItem: function (id) {
    _.remove(this.invoice, (item) => item.id == id)
  },
  addItemTo: function (target, item) {
    target.push(item)
  },
  Item: class {
    constructor(title, amount, min_amount, barcode, place_id) {
      this.title = title
      this.amount = amount
      this.min_amount = min_amount
      this.barcode = barcode
      this.places = _.filter(store.places, (item) => item.id == place_id)
    }
  },
  writeOff: function (doctor_id, rooms_id) {
    for (let item in store.basket) {
      axios
        .patch(API_PATH + 'positions/', [
          {
            product_id: item.id,
            amount: item.amount,
            place: item.place
          }
        ])
        .then((responce) => {
          console.log(responce.data)
        })
        .catch((error) => {
          console.log(error)
        })
    }
    this.sync()
    store.list.forEach((item) => {
      if (item.basketed) {
        console.log(doctor_id.value, rooms_id.value, item)
      }
    })
    _.remove(store.list, (item) => item.basketed)
  },
  // isBasketEmpty: computed(() => {
  //   return !+_.filter(store.list, (item) => item.basketed).length
  // }),
  addItem: function (item, to_plcae_id) {
    console.log({
      product: {
        title: item.title,
        min_amount: item.barcode,
        barcode: item.barcode
      },
      amount: item.amount,
      place: to_plcae_id.value
    })
    axios
      .put(API_PATH + 'positions/', [
        {
          product: {
            title: item.title,
            min_amount: item.min_amount,
            barcode: item.barcode
          },
          amount: item.amount,
          place_id: to_plcae_id.value
        }
      ])
      .then((responce) => {
        console.log(responce.data)
      })
      .catch((error) => {
        console.log(error)
      })
    this.sync()
  }
})

// store.sync()
// store.sync_aux()
