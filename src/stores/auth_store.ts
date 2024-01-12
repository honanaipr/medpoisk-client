import { defineStore } from 'pinia'
import { ref } from 'vue'
import * as jose from 'jose'
import axios from 'axios'
import { API_AUTH_LOGIN_PATH } from '../pathes'
import { tokenDataSchema } from '@/schemas'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(null)
  const exp = ref(Date.now())

  async function update() {
    const params = new URLSearchParams()
    params.append('username', 'petrovna_rus')
    params.append('password', 'petrovna_rus')

    return axios({
      method: 'POST',
      url: API_AUTH_LOGIN_PATH,
      data: params,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
    })
      .then((response) => {
        token.value = response.data.access_token
        const token_data = jose.decodeJwt(response.data.access_token)
        const joiResult = tokenDataSchema.validate(token_data)
        if (!joiResult.error) {
          exp.value = joiResult.value.exp
        } else {
          throw Error('Token data incorrect ' + joiResult.error.message)
        }
      })
      .catch((error) => {
        console.log(error)
        throw error
      })
  }
  async function getFreshToken() {
    const now = new Date(Date.now()).getSeconds()
    if (!token.value || exp.value < now) {
      await update()
    }
    return token.value
  }

  return { token, getFreshToken, update }
})
