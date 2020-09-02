require('dotenv').config({ path: './.env' });
const nodemailer = require('nodemailer');
var sesTransport = require('nodemailer-ses-transport');

// const nodeMailer = async () => {
//   // try {
//     console.log('test NM')
var SESCREDENTIALS = {
  accessKeyId: process.env.AWSAccessKeyId,
  secretAccessKey: process.env.AWSSecretKey
};


const transporter = nodemailer.createTransport(sesTransport({
  // host: 'mail.privateemail.com',
  // port: 465,
  // secure: true,
  // auth: {
  //   user: process.env.NOMAEX_EMAIL,
  //   pass: process.env.NOMAEX_EMAIL_PASSWORD // naturally, replace both with your real credentials or an application-specific password
  // }
  accessKeyId: SESCREDENTIALS.accessKeyId,
  secretAccessKey: SESCREDENTIALS.secretAccessKey,
  rateLimit: 5

}));
// return transporter
// }
// catch (error) {
//   return error
// }
// }

module.exports = transporter
