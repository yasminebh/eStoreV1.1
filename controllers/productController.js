

const productModel = require('../model/productModel')
const subCategoryModel = require('../model/subCategory')
const providerModel= require('../model/providerModel')
module.exports = {
  create : async (req,res) => {

    try {
      req.body["gallery"] =
        req.files.length === 0
          ? []
          : req.files.map((file) => {
              console.log(file.filename);
              return { name: file.filename };
            });
      //check if the product already exists with the same refference : 
      const existedproduct = await productModel.findOne({ref: req.body.ref})
      if(existedproduct) {
          return res.status(400).json({ message: "Product with the same reference already exists", data: null });
      }
      // proceed with new product
      const productNew = await new productModel(req.body)
      await subCategoryModel.findByIdAndUpdate(req.body.subCategorie, {
        $push:{
          product: productNew
        }
      })
      // provider 
      await providerModel.findByIdAndUpdate(req.body.provider, {
        $push:{
          products: productNew
        }
      })
      await productNew.save()
   return   res.status(200).json({message:"product created successfully ", data: productNew})

      } catch (error) {
      res.status(500).json({message:'error'+error, data:null})
    }
  },
// get all product
  getProduct : async (req,res) => {
    
    try {
      const products = await productModel.find().populate({path:"subCategorie", populate:{path:"category", select:'name'} })
       res.status(200).json({message:"products ", data: products})
    } catch (error) {
      res.status(500).json({message: "error"+error, data:null})
    }
  },

  getOneProduct:async (req,res) => {
    const prodId = req.params.id
    try {
      const product = await productModel.findOne({_id:prodId}).populate("subCategorie")
      if (!product){
        return res.status(404).json({message:"product not found"+error, data:null})
      }
      res.status(200).json({success: true , message: "the product is getting", data: product})
    } catch (error) {
      res.status(500).json({message: "error"+error, data:null})

    }
  },
  deleteProduct : async (req, res) => {
    const ProcutId = req.params.id
    try {
      const deletedProduct = await productModel.findByIdAndDelete({_id: ProcutId})
      subCategoryModel.findByIdAndUpdate({
        $pull : {
          product: deletedProduct._id
        }
      })
      await providerModel.findByIdAndUpdate(deletedProduct.provider, {
        $pull: {
          products: deletedProduct._id
             }
      })
      res.status(200).json({message:'deleted product', data:product})
    } catch (error) {
      res.status(500).json({message: "error"+error, data:null})
    }
  },

updateProduct : async (req,res) => {
try {
  req.body['gallery'] = req.files.length === 0 ? []: 
    req.files.map((f) => (
        {name: file.filename}
    ))
  
  const UpdatedProd = await productModel.findByIdAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true }
  );
  if(!UpdatedProd) {
    return res.status(404).json({message:'product not found ', data: UpdatedProd})
  }
  subCategoryModel.findByIdAndUpdate(req.body.subCategorie, {
    $push: {product:UpdatedProd}
  })

res.status(200).json({message:'product updated successfully ', data: UpdatedProd})
} catch (error) {
  res.status(500).json({message: "error"+error, data:null})

}

  },
  SearchProduct: async (req,res)=> {
    const prodName = req.query.name
    console.log(prodName)
    try {
      const ProductbyName = await productModel.find({name:prodName})
      if(!ProductbyName || ProductbyName.length ===0) {
        return res.status(404).json({succes: false ,message:'product not found ', data: null})
      }
      res.status(200).json({message:'product by name ', data: ProductbyName})

    } catch (error) {
      res.status(500).json({message: "error"+error, data:null})

    }
  }
  
}