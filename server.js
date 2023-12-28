const express = require("express");
const connectedToDB = require("./db");
const path = require('path');
const cookieParser = require('cookie-parser')

const dotenv = require('dotenv').config()
const cors = require('cors')
connectedToDB()


const app = express()
app.use(cors())

app.use(express.json())

app.use(cookieParser())


const categoryRouter= require('./routers/categroyRouter')
const subcategoryRouter= require('./routers/subCategoryRouter')
const productRouter = require('./routers/productRouter')
const adminRouter = require('./routers/adminRouter')
const providerRouter = require('./routers/providerRouter')
const userRouter = require('./routers/userRoute')
const customerRouter = require('./routers/customerRouter')
const cartRouter = require('./routers/cartRouter')
const orderRouter = require('./routers/orderRouter')

app.use('/categories', categoryRouter)
app.use('/subcategories', subcategoryRouter)
app.use('/products', productRouter)
app.use('/admin', adminRouter)
app.use('/provider', providerRouter)
app.use('/user', userRouter)
app.use('/customer', customerRouter)
app.use('/cart', cartRouter)
app.use('/order', orderRouter)


//images
app.use('/img', express.static(path.join(__dirname, 'img')));

app.get('/:img',(req, res ) => {
  res.sendFile(__dirname+ '/my-uploads/'+ req.params.img)
})

app.listen(process.env.PORT, () => {
  console.log("server listening on port", process.env.PORT)
})