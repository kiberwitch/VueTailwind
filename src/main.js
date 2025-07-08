import { createApp } from 'vue'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import App from './App.vue'
import router from './router'

import './style.css'

// Создаём приложение один раз
const app = createApp(App)

// Подключаем плагины
app.use(autoAnimatePlugin)
app.use(router) // Подключаем роутер

// Монтируем приложение
app.mount('#app')