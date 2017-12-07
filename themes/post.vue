<template>
  <vexo-layout>
    <vexo-header slot="header"></vexo-header>
    <div class="post-container" slot="main">
      <router-view></router-view>
    </div>
    <vexo-header slot="footer"></vexo-header>
  </vexo-layout>
</template>
<script>
export default {
  // comments
}
</script>

