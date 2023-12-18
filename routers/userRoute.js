const auth = require('../controllers/auth')
 

const route = require('express').Router()

route.get('/verifyaccount/:verificationCode',auth.verifyAccount)

route.post('/login', auth.login)
route.post('/loggout', auth.logout)

route.post('/forgetPassword', auth.forgetPassword)
route.put('/resetPassword/:token', auth.resetPassword)

module.exports = route