import { defineStore } from 'pinia'
import { ref, Ref } from 'vue'
import showToast from '../toast'
import axios from 'axios'
import messaegs from '../messaegs'
import Joi from 'joi'

import { Room } from '../types'
import { roomSchema } from '../schemas'

import { API_ROOM_PATH } from '../pathes'

import { useAuthStore } from './auth_store'

export const useRoomStore = defineStore('room', () => {
  const rooms: Ref<Array<Room>> = ref([])

  async function update() {
    const auth_store = useAuthStore()
    return axios({
      method: 'GET',
      url: API_ROOM_PATH,
      headers: { Authorization: `Bearer ${await auth_store.getFreshToken()}` }
    })
      .then((responce) => {
        const joiResult = Joi.array().items(roomSchema).validate(responce.data)
        if (joiResult.error) {
          throw new Error(joiResult.error.message)
        }
        const value = joiResult.value.map((item) => new Room(item))
        console.log(value)
        rooms.value = value
      })
      .catch((error) => {
        console.log(error)
        showToast(messaegs.ROOM_UPDATE_ERROR_MESSAGE)
        throw error
      })
  }

  function addRoom(room: Room) {
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

  function deleteRoom(room: Room) {
  //   axios
  //   Promise.resolve(room.title)
  //     .then((responce) => {
  //       console.log(responce.data)
  //       showToast(messaegs.ROOM_ADD_OK_MESSAGE)
  //       rooms.value.push(new Room({ id: 1234, title: room.title }))
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //       showToast(messaegs.ROOM_ADD_ERROR_MESSAGE)
  //       throw error
  //     })
  }

  function byId(id: number) {
    return rooms.value.find((item) => item.id == id)
  }

  function byTitle(title: string) {
    return rooms.value.find((item) => item.title == title)
  }

  return { rooms, update, addRoom, byId, byTitle, deleteRoom }
})
