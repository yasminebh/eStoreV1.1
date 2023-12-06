const mongoose = require ("mongoose")


var categorySchema = new mongoose.Schema({
  subcategories: [{ type: mongoose.Types.ObjectId, ref:"subCategory" }],
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});

module.exports = mongoose.model("category", categorySchema)