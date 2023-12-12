const userModel = require('../model/userModel')
const bcrypt = require('bcryptjs')


module.exports = {
  login: async (req,res) => {
 
     console.log("Email in request:",  req.body.email);
    try {
      const user = await userModel.findOne({ email: req.body.email });
      console.log("User found:", user);
      if (!user) {
        return res.status(404).json({ message: "user not found", data: null });
      } else {
        const correct = await bcrypt.compare(req.body.password, user.password);
        if (!correct) {
          return res
            .status(400)
            .json({ message: "password is incorrect", success: false });
        } else {
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
    
  },
};
