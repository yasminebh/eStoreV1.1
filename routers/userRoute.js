const auth = require('../controllers/auth')
 

const route = require('express').Router()

route.get('/verifyaccount/:verificationCode',auth.verifyAccount)

route.post('/login', auth.login)
route.get('/loggout', auth.logout)

module.exports = route