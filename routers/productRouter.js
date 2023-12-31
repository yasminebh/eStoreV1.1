const productController = require('../controllers/productController')
const uploadFiles = require('../middlewares/uploadFiles')

const route= require ("express").Router()


route.get('/search', productController.SearchProduct)
route.get('/', productController.getProduct)
route.get('/:id', productController.getOneProduct)
route.delete('/', productController.deleteProduct)
route.put('/:id',uploadFiles.array('photo'), productController.updateProduct )
route.post('/',uploadFiles.array('photo'),productController.create )

module.exports = route