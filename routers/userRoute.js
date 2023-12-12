const auth = require('../controllers/auth')

const route = require('express').Router()


route.post('/login', auth.login)

module.exports = route