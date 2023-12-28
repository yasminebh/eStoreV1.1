const route = require('express').Router()
const uploadFiles = require('../middlewares/uploadFiles')
const customerController = require('../controllers/customerController')


route.get('/', customerController.getCustomer)
route.get('/:id', customerController.getOneCustomer)
route.delete('/:id', customerController.deleteCustomer)
route.post('/',uploadFiles.single('image') ,customerController.createCustomer)
route.put('/:id',uploadFiles.single('image'), customerController.updateCustomer)


module.exports = route