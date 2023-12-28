const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
  customer: { type: mongoose.Types.ObjectId, ref: "customer" },
  total_quantity: {
    type: Number,
    required:true
  },
  products: [
    {
      product: { type: mongoose.Types.ObjectId, ref: "product" },
      quantity: { type: Number, required: [true, "enter quantity"] },
      price: { type: String },
    },
  ],
  total_price: {
    type: String,
  },
});


module.exports = mongoose.model("order", OrderSchema);
