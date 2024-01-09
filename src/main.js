import './assets/main.css'
import './assets/bulma_config.sass'

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

import { mock_ajax } from "./ajax_mocking"
mock_ajax()

app.mount('#app')
