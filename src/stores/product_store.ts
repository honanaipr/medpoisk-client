import { defineStore } from 'pinia'
import { ref } from 'vue'
import showToast from '../toast'
import axios from 'axios'
import messaegs from '../messaegs'
import Joi from 'joi'

import { Product } from '../types'
import { productSchema } from '../schemas'

import { API_PRODUCT_PATH } from '../pathes'

import { useAuthStore } from './auth_store'

export const useProductStore = defineStore('product', () => {
  const products = ref<Product[]>([])
  const auth_store = useAuthStore()

  async function update() {
    return axios
      .get(API_PRODUCT_PATH)
      .then((responce) => {
        const joiResult = Joi.array().items(productSchema).validate(responce.data)
        if (joiResult.error) {
          throw new Error(joiResult.error.message)
        }
        const value = joiResult.value.map((item) => new Product(item))
        console.log(value)
        products.value = value
      })
      .catch((error) => {
        console.log(error)
        showToast(messaegs.PRODUCT_UPDATE_ERROR_MESSAGE)
      })
  }

  async function addProduct(product: Product) {
    const form_data = new FormData()
    form_data.append('title', product.title)
    if (product.barcode) form_data.append('barcode', String(product.barcode))
    axios
      .put(API_PRODUCT_PATH, form_data, {
        headers: { Authorization: `Bearer ${await auth_store.getFreshToken()}` },
      })
      .then((responce) => {
        const joiResult = productSchema.validate(responce.data)
        if (joiResult.error) {
          throw new Error(joiResult.error.message)
        }
        const value = new Product(joiResult.value)
        console.log(value)
        products.value.push(value)
        showToast(messaegs.PRODUCT_ADD_OK_MESSAGE)
      })
      .catch((error) => {
        console.log(error)
        showToast(messaegs.PRODUCT_ADD_ERROR_MESSAGE)
      })
  }

  async function del(product_id: number) {
    axios
      .delete(API_PRODUCT_PATH, {
        params: { id: product_id },
        headers: { Authorization: `Bearer ${await auth_store.getFreshToken()}` },
      })
      .then(() => {
        products.value.splice(
          products.value.findIndex((item) => item.id == product_id),
          1
        )
        showToast(messaegs.PRODUCT_DELETE_OK_MESSAGE)
      })
      .catch((error) => {
        console.log(error)
        showToast(messaegs.PRODUCT_DELETE_ERROR_MESSAGE)
      })
  }

  function byId(id: number) {
    return products.value.find((item) => item.id == id)
  }

  function byTitle(title: string) {
    return products.value.find((item) => item.title == title)
  }

  return { products, update, addProduct, byId, byTitle, del }
})
