import './assets/main.css'

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import tz from 'dayjs/plugin/timezone'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { createPersistedState } from 'pinia-plugin-persistedstate'

dayjs.extend(utc)
dayjs.extend(tz)
const app = createApp(App)
const pinia = createPinia()
pinia.use(createPersistedState())
app.use(pinia)
app.use(router)

app.mount('#app')
