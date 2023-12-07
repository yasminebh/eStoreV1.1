

const productModel = require('../model/productModel')
const subCategoryModel = require('../model/subCategory')

module.exports = {
  create : async (req,res) => {

    try {
      req.body["gallery"] = req.files.length <=0 ? [] : 
      req.files.map((file) => {
        console.log(file)
        return {name: file.filename}
      })
      const productNew = await new productModel(req.body)
      await productNew.save()
      res.status(200).json({message:"product created successfully ", data: productNew})
      await subCategoryModel.findByIdAndUpdate(req.body.subCategory, {
        $push:{
          product: productNew
        }
      })

      } catch (error) {
      res.status(500).json({message:'error'+error, data:null})
    }
  },
}