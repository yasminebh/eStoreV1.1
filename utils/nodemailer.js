
const dotenv = require('dotenv').config()
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  port: process.env.NODEMAILERPORT,
  auth: {
      user: process.env.USER, // generated mailtrap user
      pass: process.env.PASS, // generated mailtrap password
  }
});


module.exports  = {
  

  verificationMail:  (newAdmin) => {
    transporter.sendMail({
      from: "yasminebharzallah@gmail.com",
      to: newAdmin.email,
      subject: "hello" + newAdmin.name,
      text: "mail de confirmation",
      html: `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
      </head>
      <body>
      <h1> hello ${newAdmin.fullName} please verify your account</h1>
      <a href="http://localhost:5000/user/verifyaccount/${newAdmin.verificationCode}">
        click here
      </a> 

      </body>
      </html>
      `,
    });}





}