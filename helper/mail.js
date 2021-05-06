const { transporter } = require('../config/nodemailer');
require('dotenv').config();
const parseEmailContent = require('../config/nodemailer');

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
                ${process.env.frontEndURLProd}/reset-password/${userInfo.token}\n
                If you did not request this, please ignore this email and your password will remain unchanged.\n\n
                Best regards,
                Nomaex.
       `,
        };
        sendEmail = await transporter.sendMail(emailConfig);
        return sendEmail;
      } catch (error) {
        console.log(error);
        return error;
      }
    })();
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
          ${process.env.frontEndURLProd}/verify/user/${userInfo.token}\n
          If you did not request this, please ignore this email.\n\n
          Best regards,
          Nomaex.
        `,
        };
        sendEmail = await transporter.sendMail(emailConfig);
        return sendEmail;
      } catch (error) {
        return error;
      }
    })();
  },
  orderComfirmed(userInfo) {
    (async () => {
      try {
        emailConfig = {
          from: process.env.NOMAEX_EMAIL,
          to: userInfo.email,
          subject: 'Order has been shipped',
          text: `Dear ${userInfo.name}, \n\n
          Thank you for shopping with NOMAEX.\n
          We have just dispatched the item(s) below from your order ${userInfo.order} in package DS-023-362654157-8338.
          The package will be delivered by our delivery agent once its get to the delivery hub at the following address: ${userInfo.address}.
          You will receive be contacted on ${userInfo.phone} when the package is out for delivery with details of our delivery associate.
        `,
        };
        sendEmail = await transporter.sendMail(emailConfig);
        return sendEmail;
      } catch (error) {
        return error;
      }
    })();
  },
};
