const mongoose = require ("mongoose")

const subCategorySchema = new mongoose.Schema({

  category: {type: mongoose.Types.ObjectId, ref: "category"},
  name:{
    type:String,
    required:true ,
    unique:true,
    minlength: 5,
    maxlength: 20
  },
  description: {
    type:String,
    required: true,
    minlength: 5,
    maxlength:30,
  },
})

module.exports = mongoose.model("subCategory", subCategorySchema)