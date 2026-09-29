// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import './styles/main.scss'

import { createPinia } from 'pinia'
import router from './router'

//Cоздаём приложение
const app = createApp(App)

// Подключаем Pinia и Router
const pinia = createPinia()
app.use(pinia)
app.use(router)

// Монтируем 
app.mount('#app')
