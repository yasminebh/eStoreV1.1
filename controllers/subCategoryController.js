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
  
deletesubCat : async (req,res) => {
  try {
   const deletedSubCat = await subCategoryModel.findOneAndDelete({_id:req.params.id})
 
   await categoryModel.findByIdAndUpdate(deletedSubCat.category, {
    $pull: {
      subcategories: deletedSubCat._id
         }
  })
 
    res.status(200).json({message:'successfully deleted',data:deletedSubCat} )



  } catch (error) {
    res.status(500).json({message:"error"+error })
  }
},



  Allsubcategories: async (req,res) =>  {

    try {
        const allcat = await subCategoryModel.find().populate({path:'category', select:'name'})
      res.status(200).json({message:"subcategories ", data:allcat})
} catch (error) {
  res.status(500).json({message:"error"+error, data:error})

}
  },

  onesubCategory: async (req,res) =>  {

    try {
        const allcat = await subCategoryModel.findOne({_id: req.params.id}).populate({path: 'product'}).populate({path:'category', select:'name'})
      res.status(200).json({message:"subcategories ", data:allcat})
} catch (error) {
  res.status(500).json({message:"error"+error, data:error})

}
  },


  updatesubCategory : async(req,res) => {
    const id= req.params.id
    const newData = req.body
    try {
      const updatedsubcat = await subCategoryModel.findByIdAndUpdate(
        { _id: id },
        newData,
        { new: true }
      );
        categoryModel.findByIdAndUpdate(req.body.category, {
          $push: {subcategories:updatedsubcat}
        })
      res.status(200).json({message:'sub category is updated ', data: updatedsubcat})
    } catch (error) {
      res.status(500).json({message:'error'+error,data:error})
    }
  },


}