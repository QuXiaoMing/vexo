// main.js
import Vue from 'vue';
import App from '../themes/app.vue'
import VueRouter from 'vue-router'
import routes from './router'
import {Modules} from './modules'
Object.keys(Modules).forEach((key) => {
  Vue.component(`vexo-${key}`, Modules[key])
})
Vue.use(VueRouter)
const router = new VueRouter({
  routes
})
console.log(router)
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
