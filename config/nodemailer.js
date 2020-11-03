require("dotenv").config({ path: "./.env" });
const nodemailer = require("nodemailer");
const sesTransport = require("nodemailer-ses-transport");
const AWS = require("aws-sdk");
// const SES = require('node-ses')
 
// const client = SES.createClient({key: process.env.AWSAccessKeyId, secret: process.env.AWSSecretKey});
const ses = new AWS.SES();

const SESCREDENTIALS = {
  accessKeyId: process.env.AWSAccessKeyId,
  secretAccessKey: process.env.AWSSecretKey,
  region: process.env.AWS_REGION,
};

const parseEmailContent = async (req, user, emailSubject, emailBody) => {
  try {
    const emailContent = {
      source: process.env.NOMAEX_EMAIL,
      Destination: {
        ToAddresses: [user.email, 'nomeax@nomaex.com'],
      },
      ReplyToAddresses: [process.env.NOMAEX_EMAIL],
      message: {
        Body: {
          Text: {
            Charset: "UTF-8",
            Data: emailBody,
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: emailSubject,
        },
      },
    };
    const send = await new AWS.SES(SESCREDENTIALS).sendEmail(emailContent);
    return send;
  } catch (error) {
    console.log(error)
    return error;
  }
};

const transporter = nodemailer.createTransport(
  sesTransport({
    // host: 'mail.privateemail.com',
    // port: 465,
    // secure: true,
    // auth: {
    //   user: process.env.NOMAEX_EMAIL,
    //   pass: process.env.NOMAEX_EMAIL_PASSWORD // naturally, replace both with your real credentials or an application-specific password
    // }
    accessKeyId: SESCREDENTIALS.accessKeyId,
    secretAccessKey: SESCREDENTIALS.secretAccessKey,
    rateLimit: 5,
  })
);
// return transporter
// }
// catch (error) {
//   return error
// }
// }

module.exports = { transporter, parseEmailContent };
