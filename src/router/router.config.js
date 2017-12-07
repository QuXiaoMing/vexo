import artticleData from '../../dataBase/articleList.json'
import { loadFile } from '../tools'
// const post = resolve => require(['../../themes/post.vue'])
import post from '../../themes/post.vue'
let _routes = [
]
function addArticles () {
  let { data } = artticleData
  let children = []
  data.forEach((e) => {
    children.push({
      path: e.src.replace('.md', ''),
      component: loadFile('resource', e.src)
    })
  })
  _routes.push({
    path: '/post',
    component: post,
    children
  })
}
addArticles()
export const routes = _routes
