
module.exports = function compileMD (source) {
  return source
    .replace(/^---[\s\S]*?---/g, '\n')
    + ` <script>
          export default {
          }
        </script>`
}
