import { defineStore } from 'pinia'
import { ref } from 'vue'
import showToast from '../toast'
import axios from 'axios'
import messaegs from '../messaegs'
import Joi from 'joi'

import { Place } from '../types'
import { placeSchema } from '../schemas'

import { API_PLACE_PATH } from '../pathes'

import { useAuthStore } from './auth_store'

export const usePlaceStore = defineStore('place', () => {
  const places = ref([])

  async function update() {
    const auth_store = useAuthStore()
    return axios({
      method: 'GET',
      url: API_PLACE_PATH,
      headers: { Authorization: `Bearer ${await auth_store.getFreshToken()}` }
    })
      .then((responce) => {
        let { value, error } = Joi.array().items(placeSchema).validate(responce.data)
        if (error) {
          throw new Error(error)
        }
        value = value.map((item) => new Place(item))
        console.log(value)
        places.value = value
      })
      .catch((error) => {
        console.log(error)
        showToast(messaegs.PLACE_UPDATE_ERROR_MESSAGE)
      })
  }

  function addPlace(place) {
    axios
      .put(API_PLACE_PATH, {
        title: place.title,
        division_id: place.division_id
      })
      .then((responce) => {
        console.log(responce.data)
        let { value, error } = placeSchema.validate(responce.data)
        if (error) {
          throw new Error(error)
        }
        places.value.push(value)
        showToast(messaegs.PLACE_ADD_OK_MESSAGE)
      })
      .catch((error) => {
        console.log(error)
        showToast(messaegs.PLACE_ADD_ERROR_MESSAGE)
      })
  }

  function byId(id) {
    return places.value.find((item) => item.id == id)
  }

  function byTitle(title) {
    return places.value.find((item) => item.title == title)
  }

  return { places, update, addPlace, byId, byTitle }
})
