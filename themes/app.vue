<template>
  <div>
    <vexo-header />
    <router-view></router-view>
  </div>
</template>
<script>
import VexoHeader from './header.vue'
export default {
  data () {
    return {}
  },
  components: {
    VexoHeader
  }
}
</script>

