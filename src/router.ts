import { createMemoryHistory, createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import InventoryView from '@/views/InventoryView.vue'

const router = createRouter({
  history: createWebHistory(),
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
      component: () => import('@/views/ReportView.vue'),
      meta: { transition: 'slide-left' },
    },
    {
      path: '/addProduct',
      name: 'addProduct',
      component: () => import('@/views/InvoiceItemView.vue'),
      meta: { transition: 'slide-left' },
    },
    {
      path: '/addToInvoice',
      name: 'addToInvoice',
      component: () => import('@/views/InvoiceAddView.vue'),
      meta: { transition: 'slide-left' },
    },
    {
      path: '/addInvoice',
      name: 'addInvoice',
      component: () => import('@/views/InvoiceView.vue'),
      meta: { transition: 'slide-left' },
    },
    {
      path: '/addByCode',
      name: 'addByCode',
      component: () => import('@/views/CodeScanerView.vue'),
      meta: { transition: 'slide-left' },
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('@/views/CartView.vue'),
      meta: { transition: 'slide-left' },
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/ProfileView.vue'),
      meta: { transition: 'slide-left' },
    },
    {
      path: '/product/:id',
      name: 'product',
      component: () => import('@/views/ProductView.vue'),
      meta: { transition: 'slide-left' },
    },
    {
      path: '/placeManager',
      name: 'placeManager',
      component: () => import('@/views/PlacesView.vue'),
      meta: { transition: 'slide-left' },
    },
    {
      path: '/doctorManager',
      name: 'doctorManager',
      component: () => import('@/views/DoctorsView.vue'),
      meta: { transition: 'slide-left' },
    },
    {
      path: '/roomManager',
      name: 'roomManager',
      component: () => import('@/views/RoomsView.vue'),
      meta: { transition: 'slide-left' },
    },
  ],
})
router.afterEach((to, from, failure) => {
  const layoutId = document.getElementById('scroll-area');
    if (layoutId) {
        layoutId.scrollTop = 0;
    }
})

export default router
