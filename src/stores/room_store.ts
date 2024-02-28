import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Ref } from 'vue'
import showToast from '@/toast'
import axios from 'axios'
import messaegs from '@/messaegs'
import Joi from 'joi'
import { roomSchema } from '@/schemas'
import { API_ROOM_PATH } from '@/pathes'
import { useAuthStore } from '@/stores/auth_store'

export interface RoomCreate {
  title: string
  division_id: number
}

export interface Room {
  id: number
  title: string
  division_id: number
}

export const useRoomStore = defineStore('room', () => {
  const rooms: Ref<Room[]> = ref([])

  async function update() {
    const auth_store = useAuthStore()
    return axios({
      method: 'GET',
      url: API_ROOM_PATH,
      headers: { Authorization: `Bearer ${await auth_store.getFreshToken()}` },
    })
      .then((responce) => {
        const joiResult = Joi.array().items(roomSchema).validate(responce.data)
        if (joiResult.error) {
          console.log(joiResult.error.message)
        }
        const value = joiResult.value.map((item) => item)
        rooms.value = value
      })
      .catch((error) => {
        console.error(error)
        showToast(messaegs.ROOM_UPDATE_ERROR_MESSAGE)
        console.log(error)
      })
  }

  function addRoom(room: RoomCreate) {
    axios
      .put(API_ROOM_PATH, {
        title: room.title,
        division_id: room.division_id,
      })
      .then((responce) => {
        showToast(messaegs.ROOM_ADD_OK_MESSAGE)
        rooms.value.push({ id: 1234, title: room.title, division_id: 0 })
      })
      .catch((error) => {
        console.error(error)
        showToast(messaegs.ROOM_ADD_ERROR_MESSAGE)
        console.log(error)
      })
  }

  function deleteRoom(room: Room) {
    console.log('Not implemented' + room.title)
  }

  function byId(id: number) {
    return rooms.value.find((item) => item.id == id)
  }

  function byTitle(title: string) {
    return rooms.value.find((item) => item.title == title)
  }

  return { rooms, update, addRoom, byId, byTitle, deleteRoom }
})
