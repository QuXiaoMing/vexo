<template>
  <vexo-layout>
    <vexo-header slot="header"></vexo-header>
    <div class="post-container">
      <router-view></router-view>
    </div>
    <div id="side" slot="sidebar"></div>
    <vexo-footer slot="footer"></vexo-footer>
  </vexo-layout>
</template>
<script>
import mixins from '../src/mixins/addPostInfo'
export default {
  // comments
  mixins: [mixins],
  watch: {
    $route () {
      console.log('$route', this.$route)
    }
  }
}
</script>

