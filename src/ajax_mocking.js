import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { API_PLACE_PATH, API_DOCTOR_PATH, API_ROOM_PATH } from './pathes'

var mock = new MockAdapter(axios)

const INITIAL_PLACES = [
  { id: 1, title: 'mock_place_1', division_id: 1 },
  { id: 2, title: 'mock_place_2', division_id: 1 },
  { id: 3, title: 'mock_place_3', division_id: 2 },
  { id: 4, title: 'mock_place_4', division_id: 2 }
]

const INITIAL_DOCTORS = [
  { id: 1, name: 'mock_doctor_1' },
  { id: 2, name: 'mock_doctor_2' },
  { id: 3, name: 'mock_doctor_3' },
  { id: 4, name: 'mock_doctor_4' }
]

const INITIAL_ROOMS = [
  { id: 1, title: 'mock_room_1' },
  { id: 2, title: 'mock_room_2' },
  { id: 3, title: 'mock_room_3' },
  { id: 4, title: 'mock_room_4' }
]

export function mock_ajax(){
    mock.onGet(API_PLACE_PATH).reply(200, INITIAL_PLACES)
    mock.onGet(API_DOCTOR_PATH).reply(200, INITIAL_DOCTORS)
    mock.onGet(API_ROOM_PATH).reply(200, INITIAL_ROOMS)
}