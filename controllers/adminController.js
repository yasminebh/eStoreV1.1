const mongoose = require ('mongoose')
const nodemailer = require('nodemailer')
const adminModel = require('../model/admin')

const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  port: process.env.NODEMAILERPORT,
  auth: {
      user: process.env.USER, // generated mailtrap user
      pass: process.env.PASS, // generated mailtrap password
  },
});
{/* <a href="http://localhost:8080/auth/verify/${item.codeverify}">
click here
</a> */}


module.exports = {
  
  createAdmin: async(req, res) => {
        
    try {
      const newAdmin = await new adminModel(req.body)
       console.log(newAdmin)
       await newAdmin.save()

         await  transporter.sendMail({
            from: "yasminebharzallah@gmail.com",
            to: newAdmin.email,
            subject: "hello" + newAdmin.name,
            text: "mail de confirmation",
            html: `<!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Document</title>
            </head>
            <body>
            <h1> verify account</h1>
            </body>
            </html>
            `,
          });
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
  updatePassword: async (req, res) => {
    try {
      const newPassword = req.body.password;
      console.log(newPassword);
      const user = await adminModel.findById({ _id: req.params.id });
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









}