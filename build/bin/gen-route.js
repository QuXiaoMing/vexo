'use strict';

const fs = require('fs');
const path = require('path');
fs.readdir(path.resolve(process.cwd(),'./resource'), (err, files) => {
  if (err) {
    console.log(err.message)
    return
  }
  let data = []
  files.forEach(e => {
    let info = {
      src: e
    }
    var content = fs.readFileSync(path.resolve(process.cwd(), `./resource/${e}`), "utf-8");
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
              .map(e => e.trim())
          }
          info[key] = value
        }
      })
      data.push(info)
  });
  fs.writeFile(path.resolve(process.cwd(),'./dataBase/articleList.json'), JSON.stringify({data}));
})
