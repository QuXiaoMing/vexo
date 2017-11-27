import artticleData from '../dataBase/articleList.json'
console.log(artticleData, typeof artticleData)
let loadFile = (name, type = 'md') => {
  if (type === 'md') {
    return r => require.ensure([], () =>
      r(require(`../resource/${name}`)),
    'zh-CN')
  }
}
let _routes = []
function addArticles() {
  let {data} = artticleData
  let children = []
  data.forEach((e) => {
    console.log(e.replace('.md', ''))
    children.push({
      path: '/' + e.replace('.md', ''),
      component: loadFile(e)
    })
  })

  _routes = children
  // _routes.push({
  //   path: '/post',
  //   // component: 
  //   children
  // })
}
addArticles()
export const routes = _routes
