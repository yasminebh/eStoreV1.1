const express = require("express");
const connectedToDB = require("./db");
const path = require('path');

const dotenv = require('dotenv').config()

connectedToDB()


const app = express()

app.use(express.json())


const categoryRouter= require('./routers/categroyRouter')
const subcategoryRouter= require('./routers/subCategoryRouter')
const productRouter = require('./routers/productRouter')
const adminRouter = require('./routers/adminRouter')
const providerRouter = require('./routers/providerRouter')
const userRouter = require('./routers/userRoute')

app.use('/categories', categoryRouter)
app.use('/subcategories', subcategoryRouter)
app.use('/products', productRouter)
app.use('/admin', adminRouter)
app.use('/provider', providerRouter)
app.use('/user', userRouter)


//images
app.use('/img', express.static(path.join(__dirname, 'img')));

app.get('/:img',(req, res ) => {
  res.sendFile(__dirname+ '/my-uploads/'+ req.params.img)
})

app.listen(process.env.PORT, () => {
  console.log("server listening on port", process.env.PORT)
})