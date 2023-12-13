const userModel = require('../model/userModel')
const bcrypt = require('bcrypt')
const { join } = require('path');
const jwt = require('jsonwebtoken')
const errorHandler = require('../utils/error');

module.exports = {
/* 
login: async (req, res) => {
    const {email, password:userPassword}= req.body
    try {
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found", data: null });
      } 
        const correct = await bcrypt.compare(user.password,userPassword);
        if (!correct) {
          return res
            .status(400)
            .json({ message: "Password is incorrect", success: false });
        } 
           if (!user.verified) {
            return res
              .status(409)
              .json({ message: "User not verified", data: null });
            }

          const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
          const {password, ...others} = user._doc
          res
            .cookie("token", token, {
              httpOnly: true,
              expires: new Date(Date.now() + 24 * 60 * 60 *1000),
            })
            .status(202)
            .json({ message: "Logged in", success: true, data: others });
        
      
    } catch (error) {
      console.error("Error during login:", error);
      return res.status(500).json({
        message: "An error occurred during login.",
        error: error.message,
        success: false,
      });
    }
  }, */
  verifyAccount : async (req,res) => {
    try {
      const verificationCode = req.params.verificationCode

      const user = await userModel.findOne({verificationCode})
      user.verificationCode = undefined
      user.verified = true
      await user.save()
      return res
      .sendFile(join(__dirname+"../../utils/validateEmail.html"))
     
    } catch (error) {
       res.sendFile(join(__dirname+"../../utils/errorPage.html"))
      /* return res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
   */
    }
},
  login: async ( req , res,next) => {
    const {email, password:userPassword}= req.body
    console.log('Entered Password:', userPassword);

    try {
      const user = await userModel.findOne({email})

      if (!user) {
        return next(errorHandler(404, 'User not found'));
      }
      const isCorrect = await bcrypt.compare(userPassword , user.password)
      console.log('Password Comparison Result:', isCorrect);

      if(!isCorrect) {
        return next(errorHandler(401, 'invalid password'))
      }  
      if (!user.verified) {
        return res
          .status(409)
          .json({ message: "User not verified", data: null });
        }
      const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
      const {password, ...others} = user._doc
      res
        .cookie("token", token, {
          httpOnly: true,
          expires: new Date(Date.now() + 24 * 60 * 60 *1000),
        })
        .status(202)
        .json({ message: "you re logged in " ,data:others});

/*        if (!user.verified) {
        return res
          .status(409)
          .json({ message: "User not verified", data: null });
        }
 */    } catch (error) {
      next(error)
    }
  },



  /*   login: async (req,res) => {
 
    try {
      const user = await userModel.findOne({ email: req.body.email });
      console.log("Email in request:",  req.body.email);
    
       if (!user) {
        return res.status(404).json({ message: "user not found", data: null });
       }
      else {
       
        const correct = await bcrypt.compare(req.body.password, user.password);
        console.log(req.body.password);
        console.log(user.password)
        console.log("correct:", correct)
        if (!correct) {
          return res
            .status(400)
            .json({ message: "password is incorrect", success: false });
        } else {
          if (user.verified === false) {
            return res.status(409).json({ message: "user not verified", data: null });
          }  
          return res
            .status(200)
            .json({ message: "logged in", success: true, data: user });
        }
      }
    }  catch (error) {
      console.error("Error during login:", error);
      return res.status(500).json({
        message: "An error occurred during login.",
        error: error.message,
        success: false,
      });
    }
    
  }, */


//logout

logout : async (req,res,next) => {
  try {
    res.clearCookie('token')
    res.status(200).json("you're logged out ")
  } catch (error) {
    next(error)
  }
}
  

};
