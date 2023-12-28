const mongoose = require ('mongoose')
const nodemailer = require('nodemailer')
const customerModel = require('../model/customer');
const {verificationMail}  = require('../utils/nodemailer');
const dotenv = require('dotenv').config()
const {randomBytes} = require('crypto');
const { join } = require('path');
const userModel = require('../model/userModel');

module.exports = {
  
  createCustomer: async(req, res) => {
    try {

      req.body.image = req.file ? req.file.filename : null
      console.log("req.body.img" , req.body.image)
      const codeverify = randomBytes(6).toString('hex')
      const newcustomer = await new customerModel({...req.body, verificationCode: codeverify})
       console.log(newcustomer)
       await newcustomer.save()

     verificationMail(newcustomer)
      res.status(200).json({success: true , message: "customer is added", data:newcustomer})

    } catch (error) {
      res.status(500).json({success:false, message:'error'+error, data:null})
    }
  },

  
// get All Admins 
  getCustomer : async (req,res) => {
    try {
      const customerData = await customerModel.find()
      if(!customerData){
        return res.status(404).json({message:'customer not found' , data:null})
      }
      return res.status(200).json({message:'customer is found', data:customerData})
    } catch (error) {
      return res.status(500).json({message:'error'+error, data:null})
    }

  },

  // Get One Admin 
  getOneCustomer : async (req,res) => {
    const customerID = req.params.id

    try {
      const customerData= await customerModel.findOne({_id: customerID})
      if(!customerData){
        return res.status(404).json({message:'customer not found' , data:null})
      }
      return res.status(200).json({message:'customer is found', data:customerData})
    } catch (error) {
      return res.status(500).json({message:'error'+error, data:null})
    }

  },

  //delete Admin 
  deleteCustomer : async (req, res) => {
    const customerID = req.params.id
    try {
      const deleteAd= await customerModel.findByIdAndDelete({_id: customerID})
      if(!deleteAd) {
        return res.status(404).json({message:'customer not found', data:null})
      }
     return res.status(200).json({message:'customer deleted', data:deleteAd})
    } catch (error) {
      return res.status(500).json({message:'error'+error, data:null})

    }
  },
 

  updateCustomer: async (req,res) => {
    try {
      // update password 

      const existingCustomer = await customerModel.findOne({_id:req.params.id})
      if (!existingCustomer) {
        return res.status(404).json({
          status: "404",
          message: "customer not found",
          data: null,
        });
      }
      //mergin existing value witth the updated values
      const updatedCustomer= { ...existingCustomer.toObject(), ...req.body };

      /* req.body["image"] = req.file ? req.file?.filename : existingCustomer.image; */

      if (req.file) {
        updatedCustomer.image = req.file.filename;
      }
  

      const result = await customerModel.updateOne(
        { _id: req.params.id },
        updatedCustomer, 
        {new:true}
      );
      return res.status(201).json({message:'customer is updated', data:result, updatedCustomer})

    } catch (error) {
      return res.status(500).json({message:'error'+error, data:null})

    }
  },
 



  

  updatePassword: async (req, res) => {
    try {
      const newPassword = req.body.password;
      console.log(newPassword);
      const user = await customerModel.findById({ _id: req.params.id });
      if (user) {
         await user.updatePassword(newPassword);
        console.log("Password updated successfully");
        res
        .status(200)
        .json({ success: true, message: "success ", data: user });
      } else {
       return console.log("User not found");
      }
    } catch (error) {
      console.error("Error updating password:", error);
    }
  },
 
/*   verifyAccount : async (req,res) => {
      try {
        const verificationCode = req.body.verificationCode

        const admin = await customerModel.findOne({_id:req.params.id})
        if (admin.verificationCode === verificationCode) {
         const adminVerified= await customerModel.findByIdAndUpdate({_id:req.params.id}, {verified: true, verificationCode: undefined}, {new: true})
          
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
  } */


}