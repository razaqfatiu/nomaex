require('dotenv').config({ path: './.env' });
const nodemailer = require('nodemailer');

// const nodeMailer = async () => {
//   // try {
//     console.log('test NM')
const transporter = nodemailer.createTransport({
  host: 'mail.privateemail.com',
  port: 587,
  // 465,
  secure: false,
  auth: {
    user: process.env.NOMAEX_EMAIL,
    pass: process.env.NOMAEX_EMAIL_PASSWORD // naturally, replace both with your real credentials or an application-specific password
  }
});
// return transporter
// }
// catch (error) {
//   return error
// }
// }

module.exports = transporter
