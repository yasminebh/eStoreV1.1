const userModel = require('../model/userModel')
const bcrypt = require('bcrypt')
const { join } = require('path');
const jwt = require('jsonwebtoken')
const errorHandler = require('../utils/error');
//const { access } = require('fs');
const dotenv = require('dotenv').config()
const nodemailer = require('nodemailer')

const {updatePassword} = require('../model/userModel')

const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  port: process.env.NODEMAILERPORT,
  auth: {
      user: process.env.USER, // generated mailtrap user
      pass: process.env.PASS, // generated mailtrap password
  }
});

const accessKey = process.env.token
const refreshKey = process.env.rToken
let refreshTokensArr = []
let revokedTokens = [];

//

const generateAccessToken = (user) => {
  return  jwt.sign({id: user._id}, accessKey, {expiresIn:"30m"})

}
const gererateRefreshToken = (user) => {
  return  jwt.sign({id: user._id}, refreshKey, {expiresIn:"30m"})
}

module.exports = {


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
  /* login: async ( req , res,next) => {
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

     } catch (error) {
      next(error)
    }
  }, */

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
     
        const access_Token = generateAccessToken(user)
        const refresh_Token = gererateRefreshToken(user)
        console.log("1",refreshTokensArr)
        refreshTokensArr.push(refresh_Token)

    // Remove the access token from the list of revoked tokens (if it was there)
     revokedTokens = revokedTokens.filter((token) => token !== access_Token); 

console.log("revoled",revokedTokens)
        console.log("2",refreshTokensArr)
        res
        .status(202)
        .json({ message: "you re logged in " ,data:user , accessToken: access_Token, refreshToken: refresh_Token});

     } catch (error) {
      next(error)
    }
  },



//logout

/* logout: async (req, res, next ) => {
  try {
    const refreshToken = req.body.refresh_Token
    console.log('first:' ,refreshTokensArr)
    refreshTokensArr=await  refreshTokensArr.filter((token)=> {
      return token !== refreshToken
    })
    console.log('after:' ,refreshTokensArr)

    res.status(200).json("you're logged out")
  } catch (error) {
    next(error)
  }
} */

/*  logout: async (req, res) => {
  try {
      let refreshtoken = req.body.refresh_token;

      if (!refreshtoken) {
        return res.status(400).json({
          message: "Refresh token not provided",
        });
      }
  

      refreshTokensArr = refreshTokensArr.filter((token) => token !== refreshtoken);
    // Add the authentication token to the list of revoked tokens
    revokedTokens.push(req.headers["authorization"]);
      console.log("after logout:", refreshTokensArr);
      res.status(200).json({
          message: "Déconnexion réussie",
      });
  } catch (error) {
      res.status(500).json({
          message: "Erreur lors de la déconnexion",
          error: error.message,
      });
  }
 }
 */
/*  logout: async (req, res) => {
  try {
    const refreshToken = req.body.refresh_token;

    // Check if refresh_token is provided
    if (!refreshToken) {
      return res.status(400).json({
        message: 'Refresh token not provided',
      });
    }

    // Remove the refresh token from the array
    refreshTokensArr = refreshTokensArr.filter((token) => token !== refreshToken);

    // Add the authentication token to the list of revoked tokens
   // revokedTokens.push(req.headers['authorization']);
    revokedTokens.push(req.headers['authorization']);

    console.log('after logout:', refreshTokensArr);
    res.status(200).json({
      message: 'Déconnexion réussie',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Erreur lors de la déconnexion',
      error: error.message,
    });
  }
}, */

logout: async (req, res) => {
  try {
    const refreshToken = req.body.refresh_token;
    const accessToken = req.headers['authorization'];

    // Check if refresh_token is provided
    if (!refreshToken || !accessToken) {
      return res.status(400).json({
        message: 'Refresh token or access token not provided',
      });
    }

    // Remove the refresh token from the array
    refreshTokensArr = refreshTokensArr.filter((token) => token !== refreshToken);

    // Add the access token to the list of revoked tokens
    revokedTokens.push(accessToken);

    console.log('after logout:', refreshTokensArr);
    res.status(200).json({
      message: 'Déconnexion réussie',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Erreur lors de la déconnexion',
      error: error.message,
    });
  }
},


forgetPassword: async(req,res, next) => {
  try {
    const userEmail = req.body.email

    const userData = await userModel.findOne({email: userEmail})

    if(!userData) {
      return  next(errorHandler(404, "user not found"))
    }

    const resetT = jwt.sign({_id: userData._id}, accessKey, {expiresIn: "1m"})
    await userModel.findOneAndUpdate({email: userEmail}, {resetToken: resetT}, {new: true}) 
   //sending mail
    transporter.sendMail({
      from: "yasminebharzallah@gmail.com",
      to: userData.email,
      subject: "hello" + userData.fullName,
      text: "reset mail",
      html: `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
      </head>
      <body>
      <h1> hello ${userData.fullName} reset your password </h1>
      <a href="http://localhost:5000/user/resetPassword/${resetT}">
        click here
      </a> 

      </body>
      
      </html>
      `,
    }, (error, data) => {
      if (error) {
        console.log(error)
      } else {
        console.log(data)
      }
    })

      res.status(200).json({success: true , message: "check your email" })


  } catch (error) {
    
    next (error)
  }
  
},

 resetPassword : async (req, res ) => {
   try {
     jwt.verify(req.params.token, accessKey, async (error) => {
      if (error){
        res.status(400).json({ message: "token expired" });
      }  
   
      const user = await userModel.findOne({resetToken: req.params.token})
      console.log(user)
      
/*       const salt = await bcrypt.genSalt(10)
      const newPassword = await bcrypt.hash(req.body.password, salt)
      
 */
      const newPassword = await req.body.password
      user.password = newPassword
      user.resetToken = undefined
     user.save()

    return res.status(200).json({message: "password updated"})
      
 
    }) 
   } catch (error) {
    res.status(500).json({message:"error"+error})
   } 
  

 }

/* logout : async (req,res,next) => {
  try {
    res.clearCookie('token')
    res.status(200).json("you're logged out ")
  } catch (error) {
    next(error)
  }
} */
  
 
};
