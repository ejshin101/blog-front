import "./assets/css/custom.css"
import "./assets/css/normalize.css"
import "./assets/css/styles.css"
import VueDOMPurifyHTML from 'vue-dompurify-html'

import {createApp} from 'vue'
import App from '@/App.vue'
import {router} from '@router/router'
import store from "@assets/js/store";

const app = createApp(App)

app.use(router)
app.use(store)
app.use(VueDOMPurifyHTML)

app.mount('#app')
