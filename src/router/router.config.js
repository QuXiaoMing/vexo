import artticleData from '../../dataBase/articleList.json'
import { loadFile } from '../tools'
let _routes = []
function addArticles () {
  let { data } = artticleData
  let children = []
  data.forEach((e) => {
    children.push({
      path: '/' + e.src.replace('.md', ''),
      component: loadFile('resource', e.src)
    })
  })
  _routes = children
}
addArticles()
export const routes = _routes
