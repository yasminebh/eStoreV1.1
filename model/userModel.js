const mongoose = require("mongoose")
const bcrypt = require('bcryptjs')

const baseOptions = {
  descriminator: 'itemTypes'
}
const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true, baseOptions }
);

UserSchema.pre('save', async function  (next) {
  try {
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(this.password, salt)
    this.password = hashPassword
    next();
  } catch (error) {
    next(error)
  }
})
//the use of this is when you want to update the whole body  
 UserSchema.pre('findOneAndUpdate', async function(next) {
 try {
  const update = this.getUpdate()
  if(update.password) {
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(update.password, salt)
    this.setUpdate({$set: {
      password:hashPassword
    }})
    next();
  }
 } catch (error) {
  next(error)
 }
}) 
// to update only the password 
UserSchema.methods.updatePassword = async function (newPassword) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(newPassword, salt);
    this.password = hashPassword;
    await this.save();
    return true;
   } catch (error) {
    console.error("Error updating password:", error);
    throw error;
  }
};

module.exports= mongoose.model("user", UserSchema)