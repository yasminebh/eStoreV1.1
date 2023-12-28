

const orderModel = require('../model/order')
const customerModel= require('../model/order')

module.exports = {
/*   createOrder : async (req,res) => {
    try {
      const newOrder = new orderModel(req.body)

      await customerModel.findByIdAndUpdate(customerModel.orders,
        {$push: {
            orders: newOrder._id
      }} )
      await newOrder.save()
      res.status(200).json({message:'new order added', data:newOrder })

    } catch (error) {
      res.status(500).json({message: error })

    }
  }, */
  createOrder : async (req,res) => {
   res.status(200).json(req.body)
  },
  getAllOrders: async (req,res) => {
    try {
      ordersData = await customerModel.find()
      
      res.status(200).json({message:'new order added', data:ordersData })

    } catch (error) {
      res.status(500).json({message: error })

    }
  },
}