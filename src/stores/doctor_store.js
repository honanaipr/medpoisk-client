import { defineStore } from 'pinia'
import { ref } from 'vue'
import showToast from '../toast'
import axios from 'axios'
import messaegs from '../messaegs'
import Joi from 'joi'

import { Doctor } from '../types'
import { doctorSchema } from '../schemas'

import { API_DOCTOR_PATH } from '../pathes'

import { useAuthStore } from './auth_store'

export const useDoctorStore = defineStore('doctor', () => {
  const doctors = ref([])
  const auth_store = useAuthStore()
  async function update() {
    return axios
      .get(API_DOCTOR_PATH, {
        params: { role_name: 'doctor' },
        headers: { Authorization: `Bearer ${await auth_store.getFreshToken()}` }
      })
      .then((responce) => {
        let { value, error } = Joi.array().items(doctorSchema).validate(responce.data)
        if (error) {
          throw new Error(error)
        }
        value = value.map((item) => new Doctor(item))
        console.log(value)
        doctors.value = value
        showToast(messaegs.DOCTOR_UPDATE_OK_MESSAGE)
      })
      .catch((error) => {
        showToast(messaegs.DOCTOR_UPDATE_ERROR_MESSAGE)
        throw error
      })
  }

  function addDoctor(name) {
    axios
    Promise.resolve(name)
      .then((responce) => {
        console.log(responce.data)
        showToast(messaegs.DOCTOR_ADD_OK_MESSAGE)
        doctors.value.push(name)
      })
      .catch((error) => {
        console.log(error)
        showToast(messaegs.DOCTOR_ADD_ERROR_MESSAGE)
        throw error
      })
  }

  function byId(id) {
    return doctors.value.find((item) => item.id == id)
  }

  function byName(name) {
    return doctors.value.find((item) => item.name == name)
  }

  return { doctors, update, addDoctor, byId, byName }
})
