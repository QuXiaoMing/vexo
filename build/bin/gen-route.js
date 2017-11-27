'use strict';

const fs = require('fs');
const path = require('path');
fs.readdir(path.resolve(process.cwd(),'./resource'), (err, files) => {
  if (err) {
    console.log(err.message)
    return
  }
  let data = {
    data: files
  }
  fs.writeFile(path.resolve(process.cwd(),'./dataBase/articleList.json'), JSON.stringify(data));
})
