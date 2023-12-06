const { trusted } = require('mongoose')
const subCategoryModel = require('../model/subCategory')

const categoryModel = require("../model/categoryModel")
const subCategory = require('../model/subCategory')

module.exports = {
  create: async (req,res)=> {
    
    try {
      const newSubCat = new subCategoryModel(req.body)
      await newSubCat.save()
      res.status(201).json({message:"sub category created successfully!", data:newSubCat})
      await categoryModel.findByIdAndUpdate(req.body.category, {
        $push:{
          subcategories: newSubCat
        }
      })
  
    } catch (error) {
      res.status(500).json({message:"error"+error, data:error})
    }

  },
  
deleteCat : async (req,res) => {
  try {
   const deletedSubCat = await subCategoryModel.deleteOne({_id:req.params.id})
   console.log("deletedSubCat._id",deletedSubCat._id)

   await categoryModel.findByIdAndUpdate(subCategoryModel.category, {
    $pull: {
      subcategories: deletedSubCat._id
    }
  })
  console.log("subCategoryModelcategory",subCategoryModel.category)

    res.status(200).json({message:'successfully deleted',data:deletedSubCat} )



    

  } catch (error) {
    res.status(500).json({message:"error"+error })
  }
},
  Allcategories: async (req,res) =>  {

    try {
        const allcat = await subCategoryModel.find()
      res.status(200).json({message:"subcategories ", data:allcat})
} catch (error) {
  res.status(500).json({message:"error"+error, data:error})

}
  },

  updateCategory : async(req,res) => {
    const id= req.params.id
    const newData = req.body
    try {
      const updatedsubcat = await subCategoryModel.findByIdAndUpdate(
        { _id: id },
        newData,
        { new: true }
      );

      res.status(200).json({message:'sub category is updated ', data: updatedsubcat})
    } catch (error) {
      res.status(500).json({message:'error'+error,data:error})
    }
  },


}