import { routes } from './router.config.js'
import home from '../../themes/home.vue'
import { loadFile } from '../tools'
routes.push(
  {
    path: '/',
    component: loadFile('themes', `home.vue`)
  }
)
console.log(routes)
export default routes
