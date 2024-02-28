import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Ref } from 'vue'
import * as jose from 'jose'
import axios from 'axios'
import { API_AUTH_LOGIN_PATH, API_AUTH_REFRESH_PATH } from '@/pathes'
import { tokenDataSchema } from '@/schemas'
import { usePlaceStore } from '@/stores/place_store'
import { useRoomStore } from '@/stores/room_store'
import { useDoctorStore } from '@/stores/doctor_store'
import { useProductStore } from '@/stores/product_store'
import { useInventoryStore } from '@/stores/inventory_store'
import { useLimitStore } from '@/stores/limit_store'

async function updateAll() {
  const place_store = usePlaceStore()
  const room_store = useRoomStore()
  const doctor_store = useDoctorStore()
  const product_store = useProductStore()
  const inventory_store = useInventoryStore()
  const limit_store = useLimitStore()
  Promise.all([
    place_store.update(),
    room_store.update(),
    doctor_store.update(),
    product_store.update(),
    inventory_store.update(),
    limit_store.update(),
  ]).catch((error) => console.error(error))
}
export enum AuthState {
  Pending,
  Loggedin,
  Failed,
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref(null)
  const exp = ref(Date.now())
  const username = ref('')
  const roles: Ref<{ division_id: number; role_name: string }[]> = ref([])
  const authState: Ref<AuthState> = ref(AuthState.Pending)

  async function refresh() {
    authState.value = AuthState.Pending
    return axios({
      method: 'POST',
      url: API_AUTH_REFRESH_PATH,
      withCredentials: true,
    })
      .then((response) => {
        token.value = response.data.access_token
        const token_data = jose.decodeJwt(response.data.access_token)
        const joiResult = tokenDataSchema.validate(token_data)
        if (!joiResult.error) {
          exp.value = joiResult.value.exp
          username.value = joiResult.value.username
          roles.value = joiResult.value.roles
        } else {
          console.log('Token data incorrect ' + joiResult.error.message)
        }
        authState.value = AuthState.Loggedin
        updateAll()
      })
      .catch((error) => {
        console.error(error)
        authState.value = AuthState.Failed
        console.log(error)
      })
  }

  async function login(login: string, password: string) {
    authState.value = AuthState.Pending
    const params = new URLSearchParams()
    params.append('username', login)
    params.append('password', password)

    return axios({
      method: 'POST',
      url: API_AUTH_LOGIN_PATH,
      data: params,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      withCredentials: true,
    })
      .then((response) => {
        token.value = response.data.access_token
        const token_data = jose.decodeJwt(response.data.access_token)
        const joiResult = tokenDataSchema.validate(token_data)
        if (!joiResult.error) {
          exp.value = joiResult.value.exp
          username.value = joiResult.value.username
          roles.value = joiResult.value.roles
        } else {
          console.log('Token data incorrect ' + joiResult.error.message)
        }
        authState.value = AuthState.Loggedin
        updateAll()
      })
      .catch((error) => {
        console.error(error)
        authState.value = AuthState.Failed
        console.log(error)
      })
  }

  async function logout() {
    console.warn('Not implimented')
  }

  async function getFreshToken() {
    const now = new Date(Date.now()).getSeconds()
    if (!token.value || exp.value < now) {
      await refresh()
    }
    return token.value
  }

  refresh()
  return { token, getFreshToken, refresh, login, logout, username, roles, authState }
})
