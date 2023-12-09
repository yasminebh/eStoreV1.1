const mongoose = require('mongoose')
const user = require('./userModel')
const customerSchema = new mongoose.Schema({
  CIN : {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true
  }

});

user.discriminator('customer', customerSchema)
module.exports = mongoose.model('customer')