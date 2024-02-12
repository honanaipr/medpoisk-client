import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Product } from '@/stores/product_store'
import { useProductStore } from '@/stores/product_store'
import type { Place } from '@/types'

export interface InvoiceItemAllocation {
  place: Place
  amount: number
}

export interface InvoiceItem {
  product: Product
  priceForOne: number
  priceForPackage: number
  fullAmount: number
  allocations: InvoiceItemAllocation[]
}
// export class InvoiceItem {
//   product: Product
//   places: Array<Place>
//   amount: number

//   constructor(product: Product, places: Array<Place>, amount: number) {
//     this.product = product
//     this.places = places
//     this.amount = amount
//   }
// }

export const useInvoiceStore = defineStore('invoice', () => {
  const invoiceTitle = ref('')
  const invoiceDate = ref<string>(new Date().toISOString().split('T')[0])
  const invoiceNumber = ref<number | null>(null)
  const invoiceSupplier = ref<string>('')
  const invoiceDeliveryDate = ref<Date>(new Date())

  // const invoiceItems = computed<InvoiceItem[]>(() => {
  //   const productStore = useProductStore()
  //   const invoiceItems: InvoiceItem[] = []
  //   for (const product of productStore.products) {
  //     invoiceItems.push({
  //       product,
  //       priceForOne: 5,
  //       priceForPackage: 3,
  //       fullAmount: 50,
  //       allocations: []
  //     })
  //   }
  //   return invoiceItems
  // })

  const invoiceItems = ref<InvoiceItem[]>([])

  
  function numberOfAllocationsFullfiled(invoiceItem: InvoiceItem): number {
    let summ = 0
    for (const allocation of invoiceItem.allocations) {
      summ += allocation.amount
    }
    return summ
  }

  function isInvoiceItemFullfiled(invoiceItem: InvoiceItem): boolean {
    
    return numberOfAllocationsFullfiled(invoiceItem) != invoiceItem.fullAmount
  }

  const numberOfFullfiledItems = computed<number>(() => {
    let numberOfFullfiledItems = 0
    for (const invoiceItem of invoiceItems.value) {
      if (isInvoiceItemFullfiled(invoiceItem))
        numberOfFullfiledItems++
    }
    return numberOfFullfiledItems
  })

  const allInvoiceItemsFullfiled = computed<boolean>(()=>{
    return numberOfFullfiledItems.value == invoiceItems.value.length
  })

  return {
    invoiceTitle,
    invoiceDate,
    invoiceItems,
    invoiceNumber,
    invoiceSupplier,
    invoiceDeliveryDate,
    numberOfFullfiledItems,
    isInvoiceItemFullfiled,
    allInvoiceItemsFullfiled,
    numberOfAllocationsFullfiled,
  }
})
