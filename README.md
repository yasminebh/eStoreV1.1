# eStoreV1.1
// added update product  ( update without push ? )
// problem with create product : product is not being pushed to subcat : solved 
// products is being added more than one time to the same subcategory with the same reference : solved by adding condition ( unique : true didn't work)


// added getone subcat
// update Sub category : push to category 

// problem with search in both category and product : changed category to findOne , 
//how to remove spaces in the request: just add + or %20
http://localhost:5000/categories/search?name=pc dell v8


npm install nodemailer --save
// mailing : 
//nodemailer
// mailtrap.io : for testing mailing


///i added new password , current password to compare between them  before updating the password 
/// i added verify code 
/// provider is done 
