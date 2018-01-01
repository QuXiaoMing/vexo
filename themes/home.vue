<template>
  <vexo-layout>
    <vexo-header slot="header"/>
    <div id="home">
      <div v-if="articles.length">
        <div v-for="item in articles" class="post">
          <router-link class="post-title" tag="h1" :to="parseLink(item.src)">{{item.title}}</router-link>
          <p class="date">发表于：{{item.date}}</p>
          <p v-if="item.desc" v-html="item.desc" class="post-desc"></p>
          <div class="footer" >
            <router-link tag="span" class="more" :to="parseLink(item.src)">阅读全文</router-link>
          </div>
        </div>
      </div>
      <div v-if="!articles.length">
        <h3>暂时还没有文章</h3>
      </div> 
    </div>
    <vexo-footer slot="footer"/>
  </vexo-layout>
</template>
<script>
import dataBase from '../dataBase/articleList.json'
export default {
  data () {
    return {
      articles: []
    }
  },
  methods: {
    parseLink (src) {
      return '/post/' + src.replace('.md', '')
    }
  },
  created () {
    if (dataBase && dataBase.data && dataBase.data.length) {
      this.$set(this, 'articles', dataBase.data)
    }
  }
}
</script>
<style lang="scss">
@import './assets/styles/var.scss';
#home{
  .post-title {
    color: $primaryTextColor;
    position: relative;
    border-bottom: none;
    line-height: 1.2;
    vertical-align: top;
    font-weight: 500;
    cursor: pointer;
    border: 2px solid transparent;
    display: inline-block;

    &:hover {
      border-bottom: 2px solid $primaryTextColor;
    }
  }
  .post:not(:first-of-type){
    padding-top: 50px;
  }
  .post-desc{
    color: $normalTextColor;
    h2, h3, p,{
      color: inherit;
    }
  }
  .date{
    font-size: 14px;
    color: $secondaryTextColor;
    margin: 0;
  }
  .more {
    display: inline-block;
    font-weight: 500;
    color: $secondaryTextColor;
    border-bottom: 2px solid $secondaryTextColor;
    line-height: 30px;
    height: 30px;
    cursor: pointer;
  }
  .more::after{
    content: '>>';
    padding-left: 8px;
    font-size: 0.3em;
    font-weight: 600;
  }
}
</style>
