import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Ref } from 'vue'
import showToast from '../toast'
import axios from 'axios'
import messaegs from '../messaegs'
import Joi from 'joi'
import { doctorSchema } from '../schemas'
import { API_DOCTOR_PATH } from '../pathes'
import { useAuthStore } from './auth_store'

export interface DoctorCreate {
  username: string
}

export interface Doctor {
  id: number
  username: string
  email?: string
  first_name?: string
  middle_name?: string
  last_name: string
}

export const useDoctorStore = defineStore('doctor', () => {
  const doctors: Ref<Doctor[]> = ref([])
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
        const value = joiResult.value.map((item) => item)
        doctors.value = value
        showToast(messaegs.DOCTOR_UPDATE_OK_MESSAGE)
      })
      .catch((error) => {
        showToast(messaegs.DOCTOR_UPDATE_ERROR_MESSAGE)
        throw error
      })
  }


  function addDoctor(doctor: DoctorCreate) {
    axios
      .put(API_DOCTOR_PATH, {
        username: doctor.username,
      })
      .then((responce) => {
        const joiResult = doctorSchema.validate(responce.data)
        if (joiResult.error) {
          throw new Error(joiResult.error.message)
        }
        doctors.value.push(joiResult.value)
        showToast(messaegs.DOCTOR_ADD_OK_MESSAGE)
      })
      .catch((error) => {
        console.log(error)
        showToast(messaegs.DOCTOR_ADD_ERROR_MESSAGE)
      })
  }

  function byId(id: number) {
    return doctors.value.find((item) => item.id == id)
  }

  function byName(name: string) {
    return doctors.value.find((item) => item.username == name)
  }

  return { doctors, update, byId, byName, addDoctor }
})
