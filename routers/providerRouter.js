const providerController = require('../controllers/providerController')
const uploadFiles = require('../middlewares/uploadFiles')

const route= require ("express").Router()


route.post('/',providerController.createProvider)
route.get('/',providerController.getProvider)
route.get('/:id',providerController.getOneProvider)
route.delete('/:id',providerController.deleteProvider)
route.put('/:id',providerController.updateprovider)
//route.put('/password/:id',providerController.updatePassword)
 module.exports = route