const mongoose = require('mongoose')
const user = require('./userModel')

const providerSchema = new mongoose.Schema({
  matricule : {
    type: String,
    required: true,
  },

});

user.discriminator('provider', providerSchema)
module.exports = mongoose.model('provider')