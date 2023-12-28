const mongoose = require ("mongoose")

const subCategorySchema = new mongoose.Schema({
  product: [{ type: mongoose.Types.ObjectId, ref: "product" }],
  category: { type: mongoose.Types.ObjectId, ref: "category" },
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 50,
  },
  description: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 150,
  },
});

module.exports = mongoose.model("subCategory", subCategorySchema)