require('dotenv').config({path: '../.env'});
const nodemailer = require('nodemailer');

module.exports = nodeMailer = async (req, userInfo) => {
  try {
    const transporter = await nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.passwordResetEmail,
        pass: process.env.passwordResetPassword // naturally, replace both with your real credentials or an application-specific password
      }
    });
    const mailOptions = {
      from: process.env.passwordResetEmail,
      to: 'mfatiu09@gmail.com' || userInfo.email,
      subject: 'Password Reset',
      text: `Dear ${userInfo.name}, \n\n
      You are receiving this because you (or someone else) have requested the reset of the password for your account.\n
      Please click on the following link, or paste this into your browser to complete the process:\n
      ${req.protocol}://${req.get('host').slice(0, -4)}${process.env.frontEndPort}/reset-password/${userInfo.token}\n
      If you did not request this, please ignore this email and your password will remain unchanged.\n\n
      Best regards,
      Nomaex.
     `
    };
    return transporter.sendMail(mailOptions)
    //   , (error, info) => {
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     console.log('Email sent: ' + info.response);
    //   }
    // }
  }
  catch (error) {
    console.log(error)
  }
}
