// main.js
import Vue from 'vue';
import App from '../themes/app.vue'
import VueRouter from 'vue-router'
import routes from './router'
import {Modules} from './modules'
import 'normalize.css'
import '../themes/assets/styles/default.css'
Object.keys(Modules).forEach((key) => {
  Vue.component(`vexo-${key}`, Modules[key])
})
Vue.use(VueRouter)
const router = new VueRouter({
  routes
})
router.afterEach((to, from) => {
  // ...
  console.log('afterEach', to.meta)
  // document.querySelector('#post-header').innerHTML = JSON.stringify(to.meta)
})
console.log(router)
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
