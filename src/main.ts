import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/style.css'
import '@/assets/index.css'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import axios from 'axios'
import VueAxios from 'vue-axios'
import './axios.js'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

createApp(App)
    .use(store)
    .use(router)
    .use(VueAxios, axios)
    .use(VueSweetalert2)
    .use(ElementPlus)
    .mount('#app')
