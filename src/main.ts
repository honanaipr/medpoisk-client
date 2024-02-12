import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { IonicVue } from '@ionic/vue'

const app = createApp(App)
const pinia = createPinia()
app.use(IonicVue)

app.use(router)
app.use(pinia)

app.mount('#app')
