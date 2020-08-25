const transporter = require('../config/nodemailer')
require('dotenv').config();

module.exports = {
  forgotPassword(req, userInfo) {
    (async () => {
      try {
        emailConfig = {
          from: process.env.NOMAEX_EMAIL,
          to: userInfo.email,
          subject: 'Password Reset',
          text: `Dear ${userInfo.name}, \n\n
          You are receiving this because you (or someone else) have requested the reset of the password for your account.\n
          Please click on the following link, or paste this into your browser to complete the process:\n
          ${req.protocol}://${req.get('host').slice(0, -4)}${process.env.frontEndPort}/reset-password/${userInfo.token}\n
          If you did not request this, please ignore this email and your password will remain unchanged.\n\n
          Best regards,
          Nomaex.
 `};
        sendEmail = await transporter.sendMail(emailConfig)
        return sendEmail
      } catch (error) {
        return error
      }
    })()
  },
  activateAccount(req, userInfo) {
    (async () => {
      try {
        emailConfig = {
          from: process.env.NOMAEX_EMAIL,
          to: userInfo.email,
          subject: 'Account Activation',
          text: `Dear ${userInfo.name}, \n\n
          Thank you for signing up with NOMAEX.\n
          To verify your account, Please click on the following link, or paste the link into your browser to complete the process:\n
          ${req.protocol}://${req.get('host').slice(0, -4)}${process.env.frontEndPort}/verify/user/${userInfo.token}\n
          If you did not request this, please ignore this email.\n\n
          Best regards,
          Nomaex.
        `};
        sendEmail = await transporter.sendMail(emailConfig)
        return sendEmail
      } catch (error) {
        return error
      }
    })()
  }
} 