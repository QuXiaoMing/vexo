/**
 * Add Title, Tags, Date for post pages
 * $route.meta is Required
 */
import Vue from 'vue'
import hljs from 'highlight.js'
import sideBar from '../../themes/layout/sidebar.vue'
export default {
  mounted() {
    this.setInfo()
    this.$nextTick(() => {
      this.highlightCode()
      this.genNav()
    })
  },
  methods: {
    /**
     * 代码高亮
     */
    highlightCode() {
      let code = Array.from(document.querySelectorAll('article code'))
      if (code && code.length) {
        code.map(element => {
          if (element.childNodes.length > 1) {
            hljs.highlightBlock(element)
          } else {
            element.classList.add('code-inline')
          }
        })
      }
    },
    /**
     * 设置文章信息
     */
    setInfo() {
      let infoBox = document.createElement('div')
      infoBox.id = 'post-header'
      let {
        title,
        tags,
        date
      } = this.$route.meta

      if (title) {
        let $title = document.createElement('h1')
        $title.className = 'title'
        $title.innerHTML = title
        infoBox.appendChild($title)
      }

      let $info = document.createElement('div')
      let _tags = tags && tags.map((e) => {
        return ` <a href="/#/tags/${e}">${e}</a>`
      }).join(',')
      $info.innerHTML = '<span class="tags">' +
        _tags +
        '</span> | <span class="date">' +
        date || "" +
        '</span>'
      $info.className = 'info'
      infoBox.appendChild($info)

      document.querySelector('.post-container article').prepend(infoBox)
    },
    /**
     * 生成文章导航
     */
    genNav () {
      window.scrollTo(0, 0)
      let oArticle = document.querySelector('.post-container article')
      let titleList = Array.from(oArticle.querySelectorAll('h2, h3'))
      let titleData = titleList.reduce((list, next, index) => {
        console.log(next.getBoundingClientRect());
        if (next.tagName === 'H2') {
          list.push({
            title: next.innerHTML,
            y: next.getBoundingClientRect().y,
            children: []
          })
        } else if (next.tagName === 'H3') {
          if (list.length) {
            Array.isArray(list[list.length - 1].children) && list[list.length - 1].children.push({
              title: next.innerHTML,
              y: next.getBoundingClientRect().y
            })
          }
        }
        return list
      }, [])
      console.dir(titleData)
      this.$route.meta.titleData = titleData
      this.mountNav(titleData)
    },
    /**
     * 挂载导航
     */
    mountNav (titleData) {
      var Nav = Vue.extend(sideBar)
      let nav = new Nav()
      nav.$data.titleData = titleData
      nav.$mount('#side')
    }
  }
}
