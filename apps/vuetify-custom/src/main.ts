import { createApp } from 'vue'

import App from './App.vue'
import { vuetify } from './vuetify'
import { router } from './router'
import CKEditor from '@ckeditor/ckeditor5-vue'

createApp(App)
    .use(vuetify)
    .use(router)
    .use(CKEditor)
    .mount('#app')
