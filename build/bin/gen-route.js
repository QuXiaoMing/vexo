'use strict';

const fs = require('fs');
const path = require('path');
const MarkdownIt = require('markdown-it')
const md = new MarkdownIt()

/**
 * 生成文章头部信息
 * @param {*String} article 文章内容
 */
function genHeader(article) {
  let info = {}
  const matches = article
    .match(/^---[\s\S]*?---/g)
    .map(match => match.replace(/---/g, ''))
    .map(match => match.split('\r\n'))[0]
    .map(match => {
      let [key, val] = match.split(':')
      if (key && val) {
        let value = val.trim()
        /**
         * 处理 tags
         */
        let isTag = /^\[[\s\S]*?\]/.test(value)
        if (isTag) {
          value = value
            .substring(1, value.length - 1)
            .split(',')
            .map(e => e.trim())
        }
        info[key] = value
      }
    })
  return info
}

/**
 * 匹配标签，生成文章描述
 */
function genDesc(article) {
  let desc = article
    .replace(/^---[\s\S]*?---/g, '')
    .match(/[\s\S]*?<!-- more -->/)
  return desc && md.render(desc[0].replace('<!-- more -->', '')) || ''
}

/**
 * 解析MarkDown
 * @param {*markdown 文件路径} src
 * @param {* 存储解析后的 md 数据} data 
 */
function parseMD(src, data) {
  let info = {
    src: src
  }
  var content = fs.readFileSync(path.resolve(process.cwd(), `./resource/${src}`), "utf-8");
  // 生成文章头信息
  let header = genHeader(content)
  // 生成文章描述
  let desc = genDesc(content)
  // 返回文章数据
  return Object.assign(
    info,
    header,
    {
      desc
    })
}

// 读取 resource 目录下 markdown 文件
fs.readdir(path.resolve(process.cwd(), './resource'), (err, files) => {
  if (err) {
    console.log(err.message)
    return
  }
  let data = []
  files.forEach(src => {
    data.push(parseMD(src))
  });
  /**
   * TODO
   * dataBase 不存在的情况
   */
  fs.writeFile(path.resolve(process.cwd(), './dataBase/articleList.json'), JSON.stringify({
    data
  }), (ret) => {
    console.log('writeFile', ret);
  });
})
