import { defineStore } from 'pinia'
import { ref } from 'vue'
import showToast from '../toast'
import axios from 'axios'
import messaegs from '../messaegs'
import Joi from 'joi'

import { Room } from '../types'
import { roomSchema } from '../schemas'

import { API_ROOM_PATH } from '../pathes'

import { useAuthStore } from './auth_store'

export const useRoomStore = defineStore('room', () => {
  const rooms = ref([])

  async function update() {
    const auth_store = useAuthStore()
    return axios({
      method: 'GET',
      url: API_ROOM_PATH,
      headers: { Authorization: `Bearer ${await auth_store.getFreshToken()}` }
    })
      .then((responce) => {
        let { value, error } = Joi.array().items(roomSchema).validate(responce.data)
        if (error) {
          throw new Error(error)
        }
        value = value.map((item) => new Room(item))
        console.log(value)
        rooms.value = value
      })
      .catch((error) => {
        console.log(error)
        showToast(messaegs.ROOM_UPDATE_ERROR_MESSAGE)
        throw error
      })
  }

  function addRoom(room) {
    axios
      .put(API_ROOM_PATH, {
        title: room.title,
        division_id: room.division_id
      })
      .then((responce) => {
        console.log(responce.data)
        showToast(messaegs.ROOM_ADD_OK_MESSAGE)
        rooms.value.push(new Room({ id: 1234, title: room.title }))
      })
      .catch((error) => {
        console.log(error)
        showToast(messaegs.ROOM_ADD_ERROR_MESSAGE)
        throw error
      })
  }

  function deleteRoom(room) {
    axios
    Promise.resolve(room.title)
      .then((responce) => {
        console.log(responce.data)
        showToast(messaegs.ROOM_ADD_OK_MESSAGE)
        rooms.value.push(new Room({ id: 1234, title: room.title }))
      })
      .catch((error) => {
        console.log(error)
        showToast(messaegs.ROOM_ADD_ERROR_MESSAGE)
        throw error
      })
  }

  function byId(id) {
    return rooms.value.find((item) => item.id == id)
  }

  function byTitle(title) {
    return rooms.value.find((item) => item.title == title)
  }

  return { rooms, update, addRoom, byId, byTitle, deleteRoom }
})
