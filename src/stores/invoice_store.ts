import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import showToast from '../toast'
import axios from 'axios'
import messaegs from '../messaegs'
import Joi from 'joi'

import { ListItemState } from '../types'
import { invoiceItemSchema } from '../schemas'

import { API_INVOICE_PATH } from '../pathes'

import { useListStore } from './list_store'

export const useInvoiceStore = defineStore('invoice', () => {
  const invoice_title = ref('')
  const invoice_date = ref(new Date())
  const invoice_items = computed(() => {
    const list_store = useListStore()
    return list_store.list.value.filter(n=>n.state == ListItemState.PENDING_ADDITION)
  })

  const basket = computed(() => {
    return invoice.value.filter((item) => !!item.basketed)
  })

  function forgetItem(id) {
    list_store.list.value.filter(n=>n.state == ListItemState.PENDING_ADDITION)
  }

  function add(name) {
    axios
    Promise.resolve(name)
      .then((responce) => {
        console.log(responce.data)
        showToast(messaegs.INVOICE_ADD_OK_MESSAGE)
        invoice.value.push(name)
      })
      .catch((error) => {
        console.log(error)
        showToast(messaegs.INVOICE_ADD_ERROR_MESSAGE)
        throw error
      })
  }

  return { invoice_title, invoice_items, invoice_date }
})
