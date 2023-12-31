const express = require("express");
const connectedToDB = require("./db");

const dotenv = require('dotenv').config()

connectedToDB()


const app = express()

app.use(express.json())


const categoryRouter= require('./routers/categroyRouter')
const subcategoryRouter= require('./routers/subCategoryRouter')
const productRouter = require('./routers/productRouter')
const adminRouter = require('./routers/adminRouter')

app.use('/categories', categoryRouter)
app.use('/subcategories', subcategoryRouter)
app.use('/products', productRouter)
app.use('/admin', adminRouter)


app.get('/:img',(req, res ) => {
  res.sendFile(__dirname+ '/my-uploads/'+ req.params.img)
})

app.listen(process.env.PORT, () => {
  console.log("server listening on port", process.env.PORT)
})