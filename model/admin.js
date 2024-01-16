const mongoose = require('mongoose')
const user = require('./userModel')
const { boolean } = require('joi')
const adminSchema = new mongoose.Schema({
  isAccepted: {
    type: Boolean,
    default: false,
  },
 superAdmin: {
    type: Boolean,
    default: false },
});
user.discriminator('admin', adminSchema)
module.exports = mongoose.model('admin')