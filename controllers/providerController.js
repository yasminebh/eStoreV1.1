
const providerModel = require('../model/providerModel')

module.exports = {
  // create provider 
  createProvider: async (req,res) => {
    try {
      const newProvider = await new providerModel(req.body)
      
      await newProvider.save()
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
updatePassword : async (req,res) => {
  try {
    
  } catch (error) {
    
  }
}
}