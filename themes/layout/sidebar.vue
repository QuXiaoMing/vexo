<template>
    <ol class="side-bar" ref="list">
      <li v-for="item in titleData">
        <div :data-y="item.y">{{item.title}}</div>
        <div v-for="link in item.children" :data-y="link.y">{{link.title}}</div>
      </li>
    </ol>
</template>

<script>
export default {
  data () {
    return {
      titleData: []
    }
  },
  computed: {
    list () {
      return this.$refs.list
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.addEventListener()
    })
  },
  methods: {
    addEventListener () {
      let el = this.list
      el.addEventListener('click', (event) => {
        if (event && event instanceof Event && event) {
          window.scrollTo(0, event.target.dataset.y - 100)
        }
      })
    }
  }
}
</script>

<style>

</style>
