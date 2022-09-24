var express = require('express')
var router = express.Router()

router.get('/personal', function (req, res, next) {
  res.send(req.query)
})

router.post('/favorite', function (req, res, next) {
  res.send(req.body)
})

module.exports = router
