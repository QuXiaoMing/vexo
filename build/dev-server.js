if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development'
}

const opn = require('opn')
const path = require('path')
const express = require('express')
const webpack = require('webpack')
const webpackConfig = require('./webpack.dev.config')

// 生成dataBase
require('./bin/gen-route')

// default port where dev server listens for incoming traffic
const port = 8000
// automatically open browser, if not set will be false
const autoOpenBrowser = true
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
// const proxyTable = config.dev.proxyTable

const app = express()

// mock假数据
// const appData = require('../mockdata.json')
// let self = appData.self
// let friend = appData.friend
// let apiRoutes = express.Router()

// apiRoutes.get('/self', (req, res) => {
//   res.json({
//     data: self,
//   })
// })
// apiRoutes.get('/friends', (req, res) => {
//   res.json({
//     data: friend,
//   })
// })

// app.use('/api', apiRoutes)

const compiler = webpack(webpackConfig)

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: false,
  heartbeat: 2000
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
// Object.keys(proxyTable).forEach(function (context) {
//   const options = proxyTable[context]
//   if (typeof options === 'string') {
//     options = { target: options }
//   }
//   app.use(proxyMiddleware(options.filter || context, options))
// })

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
const staticPath = path.posix.join('./', 'static')
app.use(staticPath, express.static('./static'))

const uri = 'http://localhost:' + port

var _resolve
const readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

const server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
