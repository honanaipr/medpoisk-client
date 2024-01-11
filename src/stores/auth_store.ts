import { defineStore } from 'pinia'
import { ref } from 'vue'
import * as jose from 'jose'
import axios from 'axios'
import { API_AUTH_LOGIN_PATH } from '../pathes'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(null)
  const exp = ref(Date.now())

  async function update() {
    const params = new URLSearchParams()
    params.append('username', 'ivanov92')
    params.append('password', 'ivanov92')

    return axios({
      method: 'POST',
      url: API_AUTH_LOGIN_PATH,
      data: params,
      headers: { 'content-type': 'application/x-www-form-urlencoded' }
    })
      .then((response) => {
        token.value = response.data.access_token
        const claims = jose.decodeJwt(response.data.access_token)
        exp.value = claims.exp
        console.log(claims)
      })
      .catch((error) => {
        console.log(error)
        throw error
      })
  }
  async function getFreshToken() {
    const now = new Date(Date.now()).getSeconds()
    if (!token.value  | exp.value < now) {
      await update()
    }
    return token.value
  }

  return { token, getFreshToken, update }
})
