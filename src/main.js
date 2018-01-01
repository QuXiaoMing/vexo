// main.js
import Vue from 'vue';
import App from '../themes/app.vue'
import VueRouter from 'vue-router'
import routes from './router'
import {Modules} from './modules'
import 'normalize.css'
import 'highlight.js/styles/atom-one-light.css'
import '../themes/assets/styles/default.scss'
Object.keys(Modules).forEach((key) => {
  console.log(`vexo-${key}`, Modules[key])
  Vue.component(`vexo-${key}`, Modules[key])
})
Vue.use(VueRouter)
const router = new VueRouter({
  routes
})
router.afterEach((to, from) => {
})
console.log(router)
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
