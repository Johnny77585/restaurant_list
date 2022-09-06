// 引用 Express 與 Express 路由器
const express = require('express')
// 準備引入路由模組
const router = express.Router()
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const users = require('./modules/users')
const { authenticator } = require('../middleware/auth')

router.use('/restaurants', authenticator, restaurants)
router.use('/users', users)
router.use('/', authenticator, home)

// 匯出路由器
module.exports = router