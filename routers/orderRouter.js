const route = require ('express').Router()

const orderController = require('../controllers/orderController')


route.post('/', orderController.createOrder)
route.get('/', orderController.getAllOrders)



module.exports= route