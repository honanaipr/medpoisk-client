import './assets/main.css'
import './assets/bulma_config.sass'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { IonicVue } from '@ionic/vue';

const app = createApp(App)
app.use(IonicVue)

app.use(router)

app.mount('#app')
