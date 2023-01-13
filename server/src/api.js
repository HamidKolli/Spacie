const express = require('express')

function init() {
  const router = express.Router()
  router.use(express.json())
  router.use((req, res, next) => {
    console.log('API: method %s, path %s', req.method, req.path)
    console.log('Body', req.body)
    console.log('param', req.params)
    next()
  })
  return router
}
exports.default = init
