import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Ref } from 'vue'
import showToast from '../toast'
import axios from 'axios'
import messaegs from '../messaegs'
import Joi from 'joi'
import { limitSchema } from '../schemas'
import { API_LIMIT_PATH } from '../pathes'
import { useAuthStore } from './auth_store'

export interface Limit {
  division_id: number
  product_id: number
  min_amount: number
}

export const useLimitStore = defineStore('limit', () => {
  const limits: Ref<Limit[]> = ref([])

  async function update() {
    const auth_store = useAuthStore()
    return axios({
      method: 'GET',
      url: API_LIMIT_PATH,
      headers: { Authorization: `Bearer ${await auth_store.getFreshToken()}` },
    })
      .then((responce) => {
        const joiResult = Joi.array().items(limitSchema).validate(responce.data)
        if (joiResult.error) {
          throw new Error(joiResult.error.message)
        }
        const value = joiResult.value.map((item) => item)
        limits.value = value
      })
      .catch((error) => {
        console.error(error)
        showToast(messaegs.LIMIT_UPDATE_ERROR_MESSAGE)
      })
  }

  function addLimit(limit: Limit) {
    axios
      .put(API_LIMIT_PATH, {
        product_id: limit.product_id,
        min_amount: limit.min_amount,
        division_id: limit.division_id,
      })
      .then((responce) => {
        const joiResult = limitSchema.validate(responce.data)
        if (joiResult.error) {
          throw new Error(joiResult.error.message)
        }
        limits.value.push(joiResult.value)
        showToast(messaegs.LIMIT_ADD_OK_MESSAGE)
      })
      .catch((error) => {
        console.error(error)
        showToast(messaegs.LIMIT_ADD_ERROR_MESSAGE)
      })
  }

  function byId(id: number) {
    return limits.value.find((n) => (n.product_id = id))
  }

  return { limits, update, addLimit, byId }
})
