
const route = require('express').Router()
const categoryController = require('../controllers/categroyController')
const uploadFiles = require('../middlewares/uploadFiles')
 
route.get('/search',categoryController.searchCategorybyName)
route.get("/",categoryController.getCategories)
route.post('/',uploadFiles.single("image"), categoryController.create)
route.delete('/:id', categoryController.deleteCategory)
route.put('/:id', uploadFiles.single("image"), categoryController.updateCategory)
route.get('/:id', categoryController.getOneCategory)
  module.exports = route