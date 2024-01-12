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
        headers: { Authorization: `Bearer ${await auth_store.getFreshToken()}` },
      })
      .then((responce) => {
        const joiResult = Joi.array().items(doctorSchema).validate(responce.data)
        if (joiResult.error) {
          throw new Error(joiResult.error.message)
        }
        const value = joiResult.value.map((item) => new Doctor(item))
        console.log(value)
        doctors.value = value
        showToast(messaegs.DOCTOR_UPDATE_OK_MESSAGE)
      })
      .catch((error) => {
        showToast(messaegs.DOCTOR_UPDATE_ERROR_MESSAGE)
        throw error
      })
  }

  function addDoctor(doctor: Doctor) {
    throw Error('Not implemented' + doctor)
  }

  function byId(id: number) {
    return doctors.value.find((item) => item.id == id)
  }

  function byName(name: string) {
    return doctors.value.find((item) => item.username == name)
  }

  return { doctors, update, byId, byName, addDoctor }
})
