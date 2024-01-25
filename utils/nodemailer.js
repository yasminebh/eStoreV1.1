require('dotenv').config()
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  port: process.env.NODEMAILERPORT,
  auth: {
      user: process.env.USER, // generated mailtrap user
      pass: process.env.PASS, // generated mailtrap password
  }
});


module.exports = {
  verificationMail: (newAdmin) => {
    transporter.sendMail({
      from: "yassmin.benharzallah@gmail.com",
      to: newAdmin.email,
      subject: "hello" + newAdmin.fullName,
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
      <a href="http://localhost:5000/user/verifyaccount/${newAdmin.verificationCode}" target="_blank">
        click here
      </a> 

      </body>
      </html>
      `,
    });
  },

  forgetPasswordMail: (newAdmin) => {
    transporter.sendMail({
      from: "yassmin.benharzallah@gmail.com",
      to: newAdmin.email,
      subject: "hello" + newAdmin.name,
      text: "reset mail",
      html: `<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
        </head>
        <body>
        <h1> hello ${newAdmin.fullName} reset your password </h1>
        <a href="http://localhost:3000/user/resetPassword/${newAdmin.resetToken}">
          click here
        </a> 
  
        </body>
        </html>
        `,
    });
  },
  SendAcceptedAdmin: (newAdmin) => {
    transporter.sendMail({
      from: "yassmin.benharzallah@gmail.com",
      to: newAdmin.email,
      subject: "hello" + newAdmin.fullName,
      text: "you're request as an admin has been accepted",
      html: `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
      </head>
      <body>
      <h1> hello ${newAdmin.fullName} </h1>
      <h1>  you've been accepted as an admin , congrats. </h1>
    
      </body>
      </html>
      `,
    });
  },
  SendRejectedAdmin: (newAdmin) => {
    transporter.sendMail({
      from: "yassmin.benharzallah@gmail.com",
      to: newAdmin.email,
      subject: "hello" + newAdmin.fullName,
      text: "you're request has been declined",
      html: `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
      </head>
      <body>
      <h1> hello ${newAdmin.fullName} </h1>
      <h1>  you're request has been declined. </h1>
    
      </body>
      </html>
      `,
    });
  },
};