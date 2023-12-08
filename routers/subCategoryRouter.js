const subcategoryController = require('../controllers/subCategoryController')

const route = require ("express").Router()

route.post("/", subcategoryController.create)
route.get("/", subcategoryController.Allsubcategories)
route.put("/:id", subcategoryController.updatesubCategory)
route.delete("/:id", subcategoryController.deletesubCat)
route.get("/:id", subcategoryController.onesubCategory)



module.exports= route