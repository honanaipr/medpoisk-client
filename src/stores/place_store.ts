import { defineStore } from 'pinia'
import { ref } from 'vue'
import showToast from '../toast'
import axios from 'axios'
import messaegs from '../messaegs'
import Joi from 'joi'

import { placeSchema } from '../schemas'

import { API_PLACE_PATH } from '../pathes'

import { useAuthStore } from './auth_store'

export interface PlaceCreate {
  title: string
  shortTitle: string
  division_id: number
}

export interface Place {
  id: number
  title: string
  shortTitle: string
  division_id: number
}

export const usePlaceStore = defineStore('place', () => {
  const places = ref<Place[]>([])

  async function update() {
    const auth_store = useAuthStore()
    return axios({
      method: 'GET',
      url: API_PLACE_PATH,
      headers: { Authorization: `Bearer ${await auth_store.getFreshToken()}` },
    })
      .then((responce) => {
        const joiResult = Joi.array().items(placeSchema).validate(responce.data)
        if (joiResult.error) {
          throw new Error(joiResult.error.message)
        }
        const value = joiResult.value.map((item) => item)
        places.value = value
      })
      .catch((error) => {
        console.error(error)
        showToast(messaegs.PLACE_UPDATE_ERROR_MESSAGE)
      })
  }

  function addPlace(place: PlaceCreate) {
    axios
      .put(API_PLACE_PATH, {
        title: place.title,
        short_title: place.shortTitle,
        division_id: place.division_id,
      })
      .then((responce) => {
        const joiResult = placeSchema.validate(responce.data)
        if (joiResult.error) {
          throw new Error(joiResult.error.message)
        }
        places.value.push(joiResult.value)
        showToast(messaegs.PLACE_ADD_OK_MESSAGE)
      })
      .catch((error) => {
        console.error(error)
        showToast(messaegs.PLACE_ADD_ERROR_MESSAGE)
      })
  }

  function byId(id: number) {
    return places.value.find((item) => item.id == id)
  }

  function byTitle(title: string) {
    return places.value.find((item) => item.title == title)
  }

  return { places, update, addPlace, byId, byTitle }
})
