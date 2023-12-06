const express = require("express");
const connectedToDB = require("./db");
connectedToDB()


const PORT = 5000

const app = express()

app.use(express.json())


const categoryRouter= require('./routers/categroyRouter')
const subcategoryRouter= require('./routers/subCategoryRouter')

app.use('/categories', categoryRouter)
app.use('/subcategories', subcategoryRouter)


app.get('/:img',(req, res ) => {
  res.sendFile(__dirname+ '/my-uploads/'+ req.params.img)
})

app.listen(PORT, () => {
  console.log("server listening on port 5000")
})