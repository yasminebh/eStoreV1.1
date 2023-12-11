const providerController = require('../controllers/providerController')
const uploadFiles = require('../middlewares/uploadFiles')

const route= require ("express").Router()


 route.get('/', providerController.getAllProvider)
 route.post('/', providerController.createProvider)
module.exports = route