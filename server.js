const express = require("express");
const connectedToDB = require("./db");
connectedToDB()


const PORT = 5000

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

app.listen(PORT, () => {
  console.log("server listening on port 5000")
})