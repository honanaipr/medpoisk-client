import { createRouter, createWebHistory } from 'vue-router'
import InventoryView from '../views/InventoryView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: InventoryView,
      meta: { transition: 'slide-left' },
    },
    {
      path: '/report',
      name: 'report',
      component: () => import('../views/ReportView.vue'),
      meta: { transition: 'slide-left' },
    },
    {
      path: '/add',
      name: 'add',
      component: () => import('../views/AddView.vue'),
      meta: { transition: 'slide-left' },
    },
    {
      path: '/addToInvoice',
      name: 'addToInvoice',
      component: () => import('../views/AddView.vue'),
      meta: { transition: 'slide-left' },
    },
    {
      path: '/addInvoice',
      name: 'addInvoice',
      component: () => import('../views/InvoiceView.vue'),
      meta: { transition: 'slide-left' },
    },
    {
      path: '/addByCode',
      name: 'addByCode',
      component: () => import('../views/CodeScanerView.vue'),
      meta: { transition: 'slide-left' },
    },
    {
      path: '/basket',
      name: 'basket',
      component: () => import('../views/BasketView.vue'),
      meta: { transition: 'slide-left' },
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue'),
      meta: { transition: 'slide-left' },
    },
    {
      path: '/product/:id',
      name: 'product',
      component: () => import('../views/ProductView.vue'),
      meta: { transition: 'slide-left' },
    },
  ],
})

export default router
