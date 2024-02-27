import {createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'inventory',
      component: () => import('@/views/main/InventoryView.vue'),
    },
    {
      path: '/report',
      name: 'report',
      component: () => import('@/views/main/ReportView.vue'),
    },
    {
      path: '/addProduct',
      name: 'addProduct',
      component: () => import('@/views/other/SingularAddView.vue'),
    },
    {
      path: '/addToInvoice',
      name: 'addToInvoice',
      component: () => import('@/views/other/InvoiceAddView.vue'),
    },
    {
      path: '/addInvoice',
      name: 'addInvoice',
      component: () => import('@/views/other/InvoiceView.vue'),
    },
    {
      path: '/addByCode',
      name: 'addByCode',
      component: () => import('@/views/other/CodeScanerView.vue'),
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('@/views/main/CartView.vue'),
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/main/ProfileView.vue'),
    },
    {
      path: '/product/:id',
      name: 'product',
      component: () => import('@/views/other/ProductView.vue'),
    },
    {
      path: '/placeManager',
      name: 'placeManager',
      component: () => import('@/views/profile/PlacesView.vue'),
    },
    {
      path: '/doctorManager',
      name: 'doctorManager',
      component: () => import('@/views/profile/DoctorsView.vue'),
    },
    {
      path: '/roomManager',
      name: 'roomManager',
      component: () => import('@/views/profile/RoomsView.vue'),
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
