
module.exports = function compileMD (source) {
  return source
    .replace(/^---[\s\S]*?---/g, '\n')
    + ` <script>
          export default {
            mounted () {
              this.setInfo()
            },
            methods: {
              setInfo() {
                let infoBox = document.createElement('div')
                infoBox.id = 'post-header'
                let { title, tags, date } = this.$route.meta
                if (title) {
                  let $title = document.createElement('h1')
                  $title.className = 'title'
                  $title.innerHTML = title
                  infoBox.appendChild($title)
                }
                let $info = document.createElement('div')
                let _tags = tags && tags.map((e) => {
                  return '<a>'+ e +'</a>'
                }).join(',')
                $info.innerHTML = '<span class="tags">'
                  + _tags
                  + '</span><span class="date">'
                  + date || ""
                  + '</span>'
                $info.className = 'info'
                infoBox.appendChild($info)
                document.querySelector('.post-container article').prepend(infoBox)
              }
            }
          }
        </script>`
}
