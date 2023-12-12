const mongoose = require ('mongoose')
const nodemailer = require('nodemailer')
const adminModel = require('../model/admin');
const {verificationMail}  = require('../utils/nodemailer');
const dotenv = require('dotenv').config()
const {randomBytes} = require('crypto')

/* const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  port: process.env.NODEMAILERPORT,
  auth: {
      user: process.env.USER, // generated mailtrap user
      pass: process.env.PASS, // generated mailtrap password
  },
}); */
{/* <a href="http://localhost:8080/auth/verify/${item.codeverify}">
click here
</a> */}


module.exports = {
  
  createAdmin: async(req, res) => {
        
    try {
      const codeverify = randomBytes(6).toString('hex')
      const newAdmin = await new adminModel({...req.body, verificationCode: codeverify})
       console.log(newAdmin)
       await newAdmin.save()

       verificationMail(newAdmin)
      res.status(200).json({success: true , message: "admin is added", data:newAdmin})

    } catch (error) {
      res.status(500).json({success:false, message:'error'+error, data:null})
    }
  },
// get All Admins 
  getAdmin : async (req,res) => {
    try {
      const AdminData = await adminModel.find()
      if(!AdminData){
        return res.status(404).json({message:'admin not found' , data:null})
      }
      return res.status(200).json({message:'admin is found', data:AdminData})
    } catch (error) {
      return res.status(500).json({message:'error'+error, data:null})
    }

  },

  // Get One Admin 
  getOneAdmin : async (req,res) => {
    const Adminid = req.params.id

    try {
      const AdminData = await adminModel.findOne({_id: Adminid})
      if(!AdminData){
        return res.status(404).json({message:'admin not found' , data:null})
      }
      return res.status(200).json({message:'admin is found', data:AdminData})
    } catch (error) {
      return res.status(500).json({message:'error'+error, data:null})
    }

  },

  //delete Admin 
  deleteAdmin : async (req, res) => {
    const adminId = req.params.id
    try {
      const deleteAd= await adminModel.findByIdAndDelete({_id: adminId})
      if(!deleteAd) {
        return res.status(404).json({message:'admin not found', data:null})
      }
     return res.status(200).json({message:'admin deleted', data:deleteAd})
    } catch (error) {
      return res.status(500).json({message:'error'+error, data:null})

    }
  },

  //update Admin 
  updateAdmin: async (req,res) => {
    try {
      // update password 
       
      const updateData = req.body

      const updatedAdmin = await adminModel.findByIdAndUpdate(
        { _id: req.params.id },
        updateData, 
        {new:true}
      );
      return res.status(201).json({message:'admin updated', data:updatedAdmin})

    } catch (error) {
      return res.status(500).json({message:'error'+error, data:null})

    }
  },
/*   updatePassword: async (req, res) => {
    try {
      const newPassword = req.body.newPassword;
      console.log('new password',newPassword)
      const currentPassword = req.body.currentPassword
      console.log(currentPassword);
      const user = await adminModel.findById({ _id: req.params.id });
      console.log('user password', user.password)
      if (user) {
         try {
          await user.updatePassword(currentPassword, newPassword);
          console.log('user password', user.password)
          res.status(200).json({ success: true, message: "Password updated successfully", data: user });

         } catch (updateError) {
          console.error("Error updating password:", updateError);
          res.status(500).json({ success: false, message: "Error updating password", error: updateError.message });
        }
    
      } else {
       return    res.status(404).json({ success: false, message: "Admin not found", data: null });

      }
    } catch (error) {
      console.error("Error updating password:", error);
      res.status(500).json({ success: false, message: "Internal server error", error: error.message });

    }

  }, */
  updatePassword: async (req, res) => {
    try {
      const newPassword = req.body.newPassword;
      console.log('new password',newPassword)
       const user = await adminModel.findById({ _id: req.params.id });
      console.log('user password', user.password)
      if (user) {
         try {
          await user.updatePassword(newPassword);
          console.log('user password', user.password)
          res.status(200).json({ success: true, message: "Password updated successfully", data: user });

         } catch (updateError) {
          console.error("Error updating password:", updateError);
          res.status(500).json({ success: false, message: "Error updating password", error: updateError.message });
        }
    
      } else {
       return    res.status(404).json({ success: false, message: "Admin not found", data: null });

      }
    } catch (error) {
      console.error("Error updating password:", error);
      res.status(500).json({ success: false, message: "Internal server error", error: error.message });

    }

  },
  verifyAccount : async (req,res) => {
      try {
        const verificationCode = req.body.verificationCode

        const admin = await adminModel.findOne({_id:req.params.id})
        if (admin.verificationCode === verificationCode) {
         const adminVerified= await adminModel.findByIdAndUpdate({_id:req.params.id}, {verified: true}, {new: true})
          
          return res.status(200).json({
            success: true,
            message: 'Account verified successfully',
            admin: adminVerified,
          });
    
        }else {
           return res.status(401).json({
            success: false,
            message: 'Invalid verification code',
          });
        }
    

      } catch (error) {
        console.error('Error verifying account:', error);
        return res.status(500).json({
          success: false,
          message: 'Internal server error',
        });
    
      }
  }



}