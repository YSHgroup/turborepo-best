import { createApp } from 'vue'

import './style.css'
import App from './App.vue'
import { vuetify } from './vuetify'

createApp(App)
    .use(vuetify)
    .mount('#app')
