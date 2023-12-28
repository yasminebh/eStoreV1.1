const cartSchema = require ('../model/cart')
const mongoose = require('mongoose')


module.exports = {
//   createCart : async (req,res ) => {
//     try {
//       const {customerID, productID} = req.params
//      // console.log("customer", customerID, "prod: ", productID)
//       const customerData = await cartSchema.findOne({customer: customerID})
//       let newCart;
//       if(!customerData){
        
//         newCart = new cartSchema({customer: customerID, products:[]})
//         console.log(newCart)
//         //return  res.status(200)
//       }
     
//       const findProduct =  newCart.products.find(item => item.productID == productID)
//       console.log("find product" ,findProduct)
//       /* const findProduct = await cartSchema.products.findById(productID) */
      
//       if (findProduct) {
//         console.log("quantity of product",findProduct.Quantity)
//       } else {
//         newCart.products.push({productID, Quantity:1})
//       }
      
//       await newCart.save()
 
 
 
//      console.log(findProduct)
//     res.status(200).json({newCart})
// } catch (error) {
//   res.status(500).json({message:"error"+error})
// }
//   }



createCart: async (req, res) => {
  try {
    const { customerID, productID } = req.params;
    // console.log("customer", customerID, "prod: ", productID)
    const customerData = await cartSchema.findOne({ customer: customerID });
    let newCart;

    if (!customerData) {
      newCart = new cartSchema({ customer: customerID, products: [] });
      console.log(newCart);
      //return  res.status(200)
    }

    const findProduct = newCart ? newCart.products.find(item => item.productID == productID) : undefined;

    if (findProduct) {
      console.log("quantity of product", findProduct.Quantity);
    } else {
      newCart.products.push({ productID, Quantity: 1 });
    }

    if (newCart) {
      await newCart.save();
    }

    console.log(findProduct);
    res.status(200).json({ newCart });
  } catch (error) {
    res.status(500).json({ message: "error" + error });
  }
}

}