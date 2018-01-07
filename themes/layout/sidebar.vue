<template>
<ul class="side-bar" ref="list">
  <li v-for="(item, index) in titleData">
    <div :data-y="item.y" class="link link-primary">
      <span :data-y="item.y"  :class="{'active': currentY === item.y}">
        {{index + 1}}. {{item.title}}
      </span>
    </div>
    <ul v-if="item.children">
      <li v-for="(link, num) in item.children" :data-y="link.y" class="link link-secondary">
        <span :data-y="link.y" :class="{'active': currentY === link.y}">
          {{index + 1}}.{{num + 1}} {{link.title}}
        </span>
      </li>
    </ul>
  </li>
</ul>
</template>

<script>
import {debounce} from 'lodash'
export default {
  data() {
    return {
      titleData: [],
      distance: 0,
      currentY: 0,
      postionY: 0
    }
  },
  computed: {
    list() {
      return this.$refs.list
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.addEventListener()
    })
  },
  methods: {
    addEventListener() {
      let el = this.list
      /**
       * 导航滚动
       */
      el.addEventListener('click', (event) => {
        if (event && event instanceof Event && event && !isNaN(event.target.dataset.y)) {
          window.scrollTo(0, event.target.dataset.y - 100)
        }
      }, true)
      /**
       * 获取当前位置
       */
      window.addEventListener('scroll', debounce(() => {
        this.distance = 0
        this.currentY = 0
        this.postionY = window.pageYOffset
        this.titleData.fo
        this.getDistant(this.titleData)
      }, 150))
    },
    getDistant (arr) {
      if (Object.prototype.toString.call(arr) === '[object Array]' && arr.length) {
        arr.forEach((e) => {
          // console.log(`Y: ${e.y}, distance: ${e.y - this.postionY}`)
          // console.log((this.distance === 0 && this.currentY === 0 && e.y - this.postionY > 0)
          //   || (e.y - this.postionY > 0 && e.y - this.postionY < this.distance))
          if (
            (this.distance === 0 && this.currentY === 0 && e.y - this.postionY > 0)
            || (e.y - this.postionY > 0 && e.y - this.postionY < this.distance)
          ) {
            this.distance = e.y - this.postionY
            this.currentY = e.y
          }
          if (e.children) {
            this.getDistant(e.children)
          }
        })
      }
    }
  }
}
</script>
<style scoped lang="scss">
$activeColor: #87daff;
.side-bar {
  padding: 20px;
  li{
    list-style: none;
    color: #999;
    line-height: 1.8em;
    ul{
      padding-left: 1em;
    }
    .link {
      span{
        border-bottom: 1px solid #555;
      }
      .active, &:hover span {
        color: $activeColor;
        border-bottom: 1px solid $activeColor;
      }
    }
    &:hover .link-primary span {
      color: $activeColor;
      border-bottom: 1px solid $activeColor;
    }
  }
}
</style>
