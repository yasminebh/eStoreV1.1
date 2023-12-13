const mongoose = require("mongoose")
const bcrypt = require('bcrypt')

const baseOptions = {
  descriminator: 'itemTypes'
}

const validateEmail = function(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

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
      unique:true,
      validate: [validateEmail, "Enter a valid email!"], // Use the custom validator
    },
    phone: {
      type: Number,
      required: true,
    },
    verificationCode: {
      type: String,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true, baseOptions }
);



/* UserSchema.pre('save', async function  (next) {
  try {
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(this.password, salt)
    this.password = hashPassword
    next();
  } catch (error) {
    next(error)
  }
})
 */

UserSchema.pre('save', async function (next) {
  try {
    // Check if the password is already hashed
    if (!this.isModified('password')) {
      return next();
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(this.password, salt);
    this.password = hashPassword;
    next();
  } catch (error) {
    next(error);
  }
});

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
 /// to update only the password 
 UserSchema.methods.updatePassword = async function (newPassword) {
  try {
    console.log("New password received:", newPassword);

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(newPassword, salt);
   // this.password = hashPassword;
   // await this.save();
   await this.updateOne({ $set: { password: hashPassword } });

    console.log("Password updated successfully");

    return true;
   } catch (error) {
    console.error("Error updating password:", error);
    throw error;
  }
}; 
 
/*  UserSchema.methods.updatePassword = async function(currentPass, newPass) {
  try {
    const isPasswordcorrect = await bcrypt.compare(currentPass, this.password
      )
      if(!isPasswordcorrect) {
         throw new Error("password incorrect")
      }
      const isNewPasswordSameAsCurrent = await bcrypt.compare(newPass, this.password);
      if (isNewPasswordSameAsCurrent) {
        throw new Error("New password must be different from the current password");
      }
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(newPass, salt);
      //this.password = hashPassword;
     // await this.save();
      await this.updateOne({ $set: { password: hashPassword } });

      return true;
  
  } catch (error) {
    console.error("Error updating password:", error);
    throw error;

  }


} */


 


module.exports= mongoose.model("user", UserSchema)