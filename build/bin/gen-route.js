'use strict';

const fs = require('fs');
const path = require('path');

/**
 * 收集 tags 数据
 * @param {*tags} 储存tag的Array 
 * @param {*} tag 
 */
function addTags(tags, tag) {
  if (tags && tag) {
    let ret = tags.find(e => e.key === tag)
    if (ret) {
      ret.count++
    } else {
      tags.push({
        key: tag,
        count: 1
      })
    }
  }
  return tags
}

/**
 * 
 * @param {*markdown 文件路径} src
 * @param {* 存储解析后的 md 数据} data 
 * @param {* 存储 md 文件的标签信息} tags 
 */
function parseMD(src, data, tags) {
  let info = {
    src: src
  }
  var content = fs.readFileSync(path.resolve(process.cwd(), `./resource/${src}`), "utf-8");
  const matches = content
    .match(/^---[\s\S]*?---/g)
    .map(match => match.replace(/---/g, ''))
    .map(match => match.split('\r\n'))[0]
    .map(match => {
      let [key, val] = match.split(':')
      if (key && val) {
        let value = val.trim()
        let flag = /^\[[\s\S]*?\]/.test(value)
        if (flag) {
          value = value.substring(1, value.length - 1).split(',')
            .map(e => {
              if (key === 'tags') {
                addTags(tags, e.trim())
              }
              return e.trim()
            })
        }
        info[key] = value
      }
    })
  data.push(info)
}

// 读取 resource 目录下 markdown 文件
fs.readdir(path.resolve(process.cwd(), './resource'), (err, files) => {
  if (err) {
    console.log(err.message)
    return
  }
  let data = []
  let tags = []
  files.forEach(src => {
    parseMD(src, data, tags)
  });
  fs.writeFile(path.resolve(process.cwd(), './dataBase/articleList.json'), JSON.stringify({
    data,
    tags
  }));
})
