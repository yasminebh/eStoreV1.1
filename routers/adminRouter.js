const mongoose = require("mongoose")

const route= require('express').Router()

const adminController = require('../controllers/adminController')

route.post('/',adminController.createAdmin)
route.get('/',adminController.getAdmin)
route.get('/:id',adminController.getOneAdmin)
route.delete('/:id',adminController.deleteAdmin)
route.put('/:id',adminController.updateAdmin)
route.put('/password/:id',adminController.updatePassword)
route.put('/verifyaccount/:id',adminController.verifyAccount)

module.exports = route;