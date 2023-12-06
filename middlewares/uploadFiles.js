const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './my-uploads')
  },
  filename: function (req, file, cb) {
   cb(null, file.originalname  )
   }
})
const fileFilter = (req, file, cb) => {
   const mimetype = file.mimetype;
  if(
    mimetype == 'image/jpg' ||
    mimetype == 'image/jpeg' ||
    mimetype == 'image/png' 
) {
  cb(null, true)
}  else {
cb ('error', false)
}
}
module.exports = multer({ storage: storage,fileFilter:fileFilter  })

 