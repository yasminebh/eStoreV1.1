const mongoose = require('mongoose')


const cartSchema = new mongoose.Schema({
  products: [{type: mongoose.Types.ObjectId, ref: "product"}],
  customer: {type: mongoose.Types.ObjectId, ref: "customer"}
})


module.exports = mongoose.model('cart', cartSchema)