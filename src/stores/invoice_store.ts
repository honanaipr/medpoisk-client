import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

import { ListItemState } from '../types'

import { useListStore } from './list_store'

export const useInvoiceStore = defineStore('invoice', () => {
  const invoice_title = ref('')
  const invoice_date = ref(new Date())
  const invoice_items = computed(() => {
    const list_store = useListStore()
    return list_store.list.value.filter((n) => n.state == ListItemState.PENDING_ADDITION)
  })

  return { invoice_title, invoice_items, invoice_date }
})
