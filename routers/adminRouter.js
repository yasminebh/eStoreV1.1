const mongoose = require("mongoose")

const route= require('express').Router()

const adminController = require('../controllers/adminController')
const { verifyToken } = require("../utils/verifyToken")

route.post('/',adminController.createAdmin)
route.get('/',adminController.getAdmin)
route.get('/:id',adminController.getOneAdmin)
route.delete('/:id',adminController.deleteAdmin)

//verify admin
route.put('/:id',verifyToken, adminController.updateAdmin)


route.put('/password/:id',adminController.updatePassword)
//route.put('/password/:id',adminController.updatePassword)
//route.put('/verifyaccount/:id',adminController.verifyAccount)

module.exports = route;