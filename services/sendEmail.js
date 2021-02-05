"use strict";
const nodemailer = require("nodemailer");
/*
async function sendEmail({to,subject,from,text,html}) {


    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'worktestegypt@gmail.com',
          pass: '0115120323'
        }
      });
      
      var mailOptions = {
        from,
        to,
        subject,
        text,
        html
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}*/

async function sendEmail({ to, subject, from, text, html }) {
    console.log("EMAILT TO ", to);
    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        auth: {
            user: "ahmed2291996@gmail.com",
            pass: "2291996echo",
        },
    });
    /* nodemailer.createTransport({
    //WORK EGYPT CONFIG
 host: "mail.workegypt.net",
    pool:true,
    name:"workegypt.net",
    sendmail: true ,
    domains: ["gmail.com", "googlemail.com"],

    port: 587,
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
      },
    secure :false,
  
    auth: {
      user: "dev@workegypt.net", // generated ethereal user
      pass: "0115120323" // generated ethereal password
    }
    
  });*/

    // verify connection configuration
    transporter.verify(function (error, success) {
        if (error) {
            console.log(JSON.stringify(error,null,2));
        } else {
            console.log("Server is ready to take our messages");
        }
    });

    // send mail with defined transport object

    let info = await transporter.sendMail({
        from,
        to,
        subject,
        text,
        html,
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
module.exports = {
    sendEmail,
};
