const userModel = require('../model/userModel')
const bcrypt = require('bcrypt')
const { join } = require('path');


module.exports = {

  login: async (req, res) => {
    try {
      const user = await userModel.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).json({ message: "User not found", data: null });
      } else {
        const correct = await bcrypt.compare(req.body.password, user.password);
        if (!correct) {
          return res
            .status(400)
            .json({ message: "Password is incorrect", success: false });
        } else {
           if (!user.verified) {
            return res
              .status(409)
              .json({ message: "User not verified", data: null });
          }
           return res
            .status(200)
            .json({ message: "Logged in", success: true, data: user });
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
      return res.status(500).json({
        message: "An error occurred during login.",
        error: error.message,
        success: false,
      });
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


// verify Account
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




};
