const productController = require('../controllers/productController')
const uploadFiles = require('../middlewares/uploadFiles')

const route= require ("express").Router()

route.post('/',uploadFiles.array('photo'),productController.create )


module.exports = route