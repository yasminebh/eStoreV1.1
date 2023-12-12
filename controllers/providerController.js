
const providerModel = require('../model/providerModel')
const {verificationMail}  = require('../utils/nodemailer');
const {randomBytes} = require('crypto')

module.exports = {
  // create provider 
  createProvider: async (req,res) => {
    try {
      const verificationCode = randomBytes(6).toString('hex')
      const newProvider = await new providerModel({
        ...req.body,
        verificationCode: verificationCode,
      });
      
      await newProvider.save()
      verificationMail(newProvider)
      res.status(201).json({message:"Provider created successfully!", data:newProvider})

    } catch (error) {
      res.status(500).json({message:"error"+error, data:null})
    }
  },

  //get Provider
  getAllProvider: async (req,res) =>  {

    try {
        const Providerdata = await providerModel.find()
        if (Providerdata.length ===0) {
          return res.status(404).json({ message:"there's no provider"})
        }
      res.status(200).json({message:"Providerdata ", data:Providerdata})
} catch (error) {
  res.status(500).json({message:"error"+error, data:error})
}
  },
  getProvider : async (req,res) => {
    try {
      const providerData = await providerModel.find()
      if(!providerData){
        return res.status(404).json({message:'provider not found' , data:null})
      }
      return res.status(200).json({message:'provider is found', data:providerData})
    } catch (error) {
      return res.status(500).json({message:'error'+error, data:null})
    }

  },

  // Get One Admin 
  getOneProvider : async (req,res) => {
    const providerid = req.params.id

    try {
      const providerData = await providerModel.findOne({_id: providerid})
      if(!providerData){
        return res.status(404).json({message:'provider not found' , data:null})
      }
      return res.status(200).json({message:'provider is found', data:providerData})
    } catch (error) {
      return res.status(500).json({message:'error'+error, data:null})
    }

  },

  //delete Admin 
  deleteProvider : async (req, res) => {
    const providerId = req.params.id
    try {
      const deleteAd= await providerModel.findByIdAndDelete({_id: providerId})
      if(!deleteAd) {
        return res.status(404).json({message:'provider not found', data:null})
      }
     return res.status(200).json({message:'provider deleted', data:deleteAd})
    } catch (error) {
      return res.status(500).json({message:'error'+error, data:null})

    }
  },

  //update Admin 
  updateprovider: async (req,res) => {
    try {
      // update password 
       
      const updateData = req.body

      const updatedprovider = await providerModel.findByIdAndUpdate(
        { _id: req.params.id },
        updateData, 
        {new:true}
      );
      return res.status(201).json({message:'provider updated', data:updatedprovider})

    } catch (error) {
      return res.status(500).json({message:'error'+error, data:null})

    }
  },
  updatePassword: async (req, res) => {
    try {
      const newPassword = req.body.newPassword;
      const currentPassword = req.body.currentPassword
      console.log(newPassword);
      const user = await providerModel.findById({ _id: req.params.id });
      if (user) {
         try {
          await user.updatePassword(currentPassword, newPassword);
          res.status(200).json({ success: true, message: "Password updated successfully", data: user });

         } catch (updateError) {
          console.error("Error updating password:", updateError);
          res.status(500).json({ success: false, message: "Error updating password", error: updateError.message });
        }
    
      } else {
       return console.log("User not found");
      }
    } catch (error) {
      console.error("Error updating password:", error);
    }

  },

  verifyAccount : async (req,res) => {
      try {
        const verificationCode = req.body.verificationCode

        const provider = await providerModel.findOne({_id:req.params.id})
        if (provider.verificationCode === verificationCode) {
          const verifiedProvider = await providerModel.findByIdAndUpdate({_id:req.params.id}, {verified: true}, {new: true})
          
          return res.status(200).json({
            success: true,
            message: 'Account verified successfully',
            provider: verifiedProvider,
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
