
module.exports = function compileMD (source) {
  return source
    .replace(/^---[\s\S]*?---/g, '\n')
    + ` <script>
          import mixins from '@/mixins/addPostinfo.js'
          export default {
            mixins: [mixins]
          }
        </script>`
}
