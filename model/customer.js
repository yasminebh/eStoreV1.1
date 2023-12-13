const mongoose = require('mongoose')
const user = require('./userModel')
const customerSchema = new mongoose.Schema({
  CIN : {
    type: String,
    required: true,
    validate: {
      validator: validateCIN,
      message: 'Invalid CIN format',
    },

  },
  address: {
    type: String,
    required: true
  }

});
function validateCIN(value) {
  const regex = /^[0-9]{8}$/;
 if (!regex.test(value)) {
   return false;
 }

 return true;
}

user.discriminator('customer', customerSchema)
module.exports = mongoose.model('customer')