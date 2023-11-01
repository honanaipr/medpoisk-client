import { reactive, computed, toRaw } from 'vue'
// import { v4 as uuid4 } from 'uuid'
import axios from 'axios'
// import { CronJob } from 'cron'

const API_PATH = 'http://127.0.0.1:8000/api/v0/'

axios.defaults.timeout = 2500

import _ from 'lodash'
import Joi from 'joi'

export const store = reactive({
  places: [],
  rooms: [],
  doctors: [],
  list: [1, 2, 3],
  basket: [],
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
    axios
      .get(API_PATH + 'products/')
      .then((responce) => {
        const productSchema = Joi.object({
          id: Joi.string(),
          title: Joi.string(),
          amount: Joi.number(),
          min_amount: Joi.number(),
          barcode: Joi.number(),
          places: Joi.array().items({ title: Joi.string(), id: Joi.string() })
        })
        // this.list = _.difference(responce.data, this.basket)
        const { error, value } = Joi.array().items(productSchema).validate(responce.data)
        if (error) {
          console.log('Validation error')
          console.log(error)
        } else {
          this.list.forEach((item, index) => {
            let basketed = item.basketed
            let new_item = _.find(value, (i) => i.barcode == item.barcode)
            if (new_item) {
              item = new_item
              item.basketed = basketed
              this.list[index] = item
            } else {
              delete this.list[index]
            }
          })
          this.list = value
        }
      })
      .catch((error) => {
        console.log(error)
      })
  },
  sync_aux: function () {
    axios
      .get(API_PATH + 'rooms/')
      .then((responce) => {
        const roomSchema = Joi.object({
          number: Joi.number(),
          id: Joi.string()
        })
        const { error, value } = Joi.array().items(roomSchema).validate(responce.data)
        if (error) {
          console.log('Validation error')
          console.log(error)
        } else {
          this.rooms = value
        }
      })
      .catch((error) => {
        console.log(error)
      })
    axios
      .get(API_PATH + 'doctors/')
      .then((responce) => {
        const doctorSchema = Joi.object({
          name: Joi.string(),
          id: Joi.string()
        })
        const { error, value } = Joi.array().items(doctorSchema).validate(responce.data)
        if (error) {
          console.log('Validation error')
          console.log(error)
        } else {
          this.doctors = value
        }
      })
      .catch((error) => {
        console.log(error)
      })
    axios
      .get(API_PATH + 'places/')
      .then((responce) => {
        const placeSchema = Joi.object({
          title: Joi.string(),
          id: Joi.string()
        })
        const { error, value } = Joi.array().items(placeSchema).validate(responce.data)
        if (error) {
          console.log('Validation error')
          console.log(error)
        } else {
          this.places = value
        }
      })
      .catch((error) => {
        console.log(error)
      })
  },
  clearBasket: function () {
    this.list.forEach((item) => {
      item.basketed = false
    })
  },
  toBasketById: function (id) {
    _.find(this.list, (item) => item.id == id).basketed = true
  },
  unBasketById: function (id) {
    _.find(this.list, (item) => item.id == id).basketed = false
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
    store.list.forEach((item) => {
      if (item.basketed) {
        console.log(doctor_id.value, rooms_id.value, item)
      }
    })
    _.remove(store.list, (item) => item.basketed)
  },
  isBasketEmpty: computed(() => {
    return !+_.filter(store.list, (item) => item.basketed).length
  }),
  addItem: function (item, to_plcae_id) {
    console.log({
      "product": {
        "title": toRaw(item.title),
        "min_amount": toRaw(item.barcode),
        "barcode": toRaw(item.barcode),
      },
      "amount": toRaw(item.amount),
      "place": to_plcae_id.value
    })
    axios
      .put(API_PATH + 'positions/', [
        {
          "product": {
            "title": toRaw(item.title),
            "min_amount": toRaw(item.barcode),
            "barcode": toRaw(item.barcode),
          },
          "amount": toRaw(item.amount),
          "place": to_plcae_id.value
        }
      ])
      .then((responce) => {
        // const doctorSchema = Joi.object({
        //   name: Joi.string(),
        //   id: Joi.string()
        // })
        // const { error, value } = Joi.array().items(doctorSchema).validate(responce.data)
        // if (error) {
        //   console.log('Validation error')
        //   console.log(error)
        // } else {
        //   this.doctors = value
        // }
        console.log(responce.data)
      })
      .catch((error) => {
        console.log(error)
      })
      this.sync()
  }
})

store.sync()
store.sync_aux()
