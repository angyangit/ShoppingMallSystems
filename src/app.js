import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/styles/index.scss'
import '@/element'
import '@/permission'
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
