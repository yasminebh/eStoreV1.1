const subcategoryController = require('../controllers/subCategoryController')

const route = require ("express").Router()

route.post("/", subcategoryController.create)
route.get("/", subcategoryController.Allcategories)
route.put("/:id", subcategoryController.updateCategory)
route.delete("/:id", subcategoryController.deleteCat)



module.exports= route