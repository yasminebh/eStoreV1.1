

const  mongoose = require('mongoose')

const GalleryModel = new mongoose.Schema ({
  name : {
    type: String,
   }
  })

const productSchema = new mongoose.Schema({
  subCategorie: { type: mongoose.Types.ObjectId, ref: "subCategory" },
  gallery: [GalleryModel],

  name: {
    type: String,
    required: true,
  },
  ref: {
    type: String,
    required: true,
    unique: true,
  },
  Price: { type: Number, required: true },
  description: { type: String },
  Quantity: { type: Number, required: true },
});

  module.exports= mongoose.model("product", productSchema)