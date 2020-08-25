require('dotenv').config();
// const debug = require('debug')('app');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const { Op, where } = require('sequelize');

const models = require('../../models/index');
const crypto = require('crypto');
// const nodeMailer = require('../../config/nodemailer');
const { signAccessToken } = require('../../helper/jwt-helper');
const { forgotPassword, activateAccount } = require('../../helper/mail');


module.exports = {
  signUpValidator: [
    check('firstName').not().isEmpty().trim(),
    check('lastName').not().isEmpty().trim(),
    check('email').isEmail().not().isEmpty()
      .trim(),
    check('password').isLength({ min: 5 }).not().isEmpty()
      .trim()
      .withMessage('must be at least 5 chars long'),
    check('address1').isLength({ min: 4 }).not().isEmpty()
      .trim(),
    check('address2').not().isEmpty().trim(),
    check('state').not().isEmpty().trim(),
    check('phoneNumber').not().isEmpty().trim(),
  ],

  createAdmin(req, res) {
    (async () => {
      try {
        const {
          firstName, lastName, email, address1, address2, state, phoneNumber, password,
        } = req.body;
        const isAdmin = true;

        const userId = req.user.id;
        const { token, isAdministrator } = req.user;
        const checkIfNewuserExists = await models.User.findAll({
          where: {
            [Op.and]: [
              { email },
              { deletedAt: null },
            ],
          },
        });
        if (checkIfNewuserExists.length > 0) {
          return res.status(400).json({ error: 'User account exists, Consider resetting your password' });
        }
        if (!isAdministrator) {
          return res.status(401).json({
            error: 'Only Admins can create accounts',
          });
        }
        const hash = await bcrypt.hash(password, 10);
        const newUser = {
          firstName,
          lastName,
          email,
          address1,
          address2,
          state,
          phoneNumber,
          password: hash,
          isAdmin,
        };
        // VALIDATION
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() });
        }
        await models.User.sync();
        await models.User.create(newUser);
        return res.status(201).json({
          message: 'Admin Account successfully created',
          userId,
        });
      } catch (err) {
        return res.status(500).json({ errorResponse: err });
      }
    })();
  },
  signUp(req, res) {

    (async () => {
      try {
        const {
          firstName, lastName, email, address1, address2, state, phoneNumber, password,
        } = req.body;
        const isAdmin = false;
        const lastLogin = createdAt = new Date()
        const checkIfNewuserExists = await models.User.findAll({
          where: {
            [Op.and]: [
              { email },
              { isDeleted: false },
            ],
          },
        });
        if (checkIfNewuserExists.length > 0) {
          return res.status(400).json({ error: 'User account exists, Consider resetting your password' });
        }

        const hash = await bcrypt.hash(password, 10);
        const genToken = await crypto.randomBytes(20)
        const user = {};
        user.name = firstName; user.email = email
        const token = user.token = genToken.toString('hex');
        const newUser = {
          firstName,
          lastName,
          email,
          address1,
          address2,
          state,
          phoneNumber,
          password: hash,
          isActive: false,
          isAdmin,
          lastLogin,
          resetPasswordToken: token,
          createdAt
        };
        // VALIDATION
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() });
        }
        await models.User.create(newUser);
        await activateAccount(req, user);

        return res.status(201).json({
          message: 'Account successfully created',
        });
      } catch (err) {
        console.log(err)
        return res.status(500).json({ errorResponse: err });
      }
    })();
  },
  verifyAccount(req, res) {
    (async () => {
      try {
        const { token } = req.body
        console.log(token)
        const verAccount = await models.User.findAll({
          where: {
            resetPasswordToken: token,
          }
        })
        if (verAccount.length < 1) {
          return res.status(401).json({ error: 'Account was previously verified or Activation token is invalid or has expired.' });
        }
        const checkifVerifiedBefore = await verAccount[0].dataValues
        if (checkifVerifiedBefore.resetPasswordToken === '') res.status(400).json({ message: 'Account was verified' });
        await models.User.update({
          resetPasswordToken: '',
          isActive: true,
          updatedAt: new Date()
        }, {
          returning: true,
          where: {
            resetPasswordToken: token,
          }
        });
        return res.status(200).json({ message: 'Account Activated Successfully' })
      }
      catch (error) {
        console.log(error)
        res.status(500).json({ error });
      }
    })()
  },
  authenticate(req, res) {
    (async () => {
      try {
        const now = new Date().getTime / 1000
        const { token } = await req.cookies
        // return  res.json({ token });
        if (typeof token !== 'string') {
          return res.sendStatus(401).json({ error: 'Invalid token' });
        }
        const userCred = await jwt.verify(token, process.env.TOKEN_SECRET)
        return res.status(200).json({ userCred });
      }
      catch (error) {
        console.log(error)
        if (error.message === 'jwt expired') res.status(400).json({ value: 'please sign in' });
        res.status(500).json({ error });
      }
    })()
  },
  signIn(req, res) {
    const { email, password } = req.body;

    (async () => {
      try {
        const getUser = await models.User.findAll({
          where: {
            [Op.and]: [
              { email },
              { deletedAt: null },
            ],
          },
        });
        if (getUser.length === 0) {
          return res.status(401).json({
            error: 'User not found',
          });
        }
        const compareHash = await bcrypt.compare(password, getUser[0].dataValues.password);
        if (!compareHash) {
          return res.status(401).json({
            error: 'Incorrect email or password',
          });
        }
        const accountActivation = await getUser[0].dataValues
        if (accountActivation.isActive == false) return res.status(400).json({ message: 'Please refer to the previous email sent to activate your account and retry!' });
        const lastTimeLoggedIn = new Date()
        // const lastTimeLoggedIn = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
        const updateLastLoginInfo = await models.User.update({ lastLogin: lastTimeLoggedIn }, {
          where: {
            userId: getUser[0].dataValues.userId
          }
        })
        // if (!getUser[0].dataValues.isAdmin) {
        //   res.status(400).json({ error: 'Admin accounts only' });
        // }
        const userPayload = {
          userId: getUser[0].dataValues.userId,
          email: getUser[0].dataValues.email,
          isAdministrator: getUser[0].dataValues.isAdmin,
        }


        const oneDayCookie = 1000 * 60 * 60 * 24
        // const oneDayCookie = 60 * 60 * 1000 * 24
        const signToken = await signAccessToken(userPayload)
        //   const token = await jwt.sign(
        //     ,
        //     process.env.TOKEN_SECRET,
        // { expiresIn: '24' },
        //   );

        res.cookie('token', signToken, {
          maxAge: oneDayCookie, // 24 hour
          httpOnly: true,
          // sameSite: true,
          secure: process.env.NODE_ENV === 'production' ? true : false,
          domain: process.env.domain
        })

        // const tokens = await req.cookies.token;
        // if (!tokens) {
        //   return res.status(401).json({ errorResponse: "Login" });
        // }
        // const decodedToken = await jwt.verify(tokens, process.env.TOKEN_SECRET);
        // return res.status(200).json({ response: decodedToken });
        return res.status(200).json({ message: 'Sign in successful!' });


      } catch (error) {
        console.log(error)
        return res.status(500).json({ error });
      }
    })();
  },
  getUserInfo(req, res) {
    (async () => {
      try {
        const { id: userId } = req.user
        const getUserDetails = await models.User.findOne({
          where: {
            userId
          }
        })
        return res.status(200).json({ data: await getUserDetails.dataValues });
      }
      catch (error) {
        res.status(500).json({ error });
      }
    })()
  },
  devcreateAdmin(req, res) {
    const {
      firstName, lastName, email, address1, address2, state, phoneNumber, password,
    } = req.body;
    const isAdmin = true;

    (async () => {
      try {
        const checkIfNewuserExists = await models.User.findAll({ where: { email } });
        if (checkIfNewuserExists.length > 0) {
          return res.status(400).json({ error: 'User account exists' });
        }
        const hash = await bcrypt.hash(password, 10);
        console.log(req.body);
        const newUser = {
          firstName,
          lastName,
          email,
          address1,
          address2,
          state,
          phoneNumber,
          password: hash,
          isAdmin,
        };
        await models.User.sync();
        await models.User.create(newUser);
        return res.status(201).json({
          message: 'Admin Account successfully created',
        });
      } catch (err) {
        console.log(`ERRORI ${err}`);
        return res.status(500).json({ errorResponse: err.message });
      }
    })();
  },
  forgotPassword(req, res) {
    (async () => {

      try {
        const { email } = req.body
        const checkIfUserExists = await models.User.findAll({
          where: {
            [Op.and]: [
              { email },
              { deletedAt: null },
            ],
          },
        });
        if (checkIfUserExists.length < 1) {
          return res.status(401).json({ error: 'Account not found, Create an account' });
        }
        const userDetails = checkIfUserExists[0].dataValues;
        const { firstName, email: userEmail } = userDetails
        const user = {};
        user.name = firstName; user.email = userEmail
        const genToken = await crypto.randomBytes(20)
        const token = user.token = genToken.toString('hex');

        const updateUserWithToken = await models.User.update({
          resetPasswordToken: token,
          resetPasswordExpires: Date.now() + 600000
        }, {
          returning: true,
          where: { email: userEmail }
        });

        const sendEmail = await forgotPassword(req, user);
        // console.log(sendEmail, user)
        res.status(200).json({
          sendEmail
        })
      }
      catch (error) {
        console.log(error)
      }
    })()
  },
  passwordReset(req, res) {
    (async () => {
      try {
        const { token } = req.body
        const resetPassword = await models.User.findAll({
          where: {
            resetPasswordToken: token,
            resetPasswordExpires: {
              [Op.gt]: Date.now()
            }
          }
        })
        if (resetPassword.length < 1) {
          return res.status(401).json({ error: 'Password reset token is invalid or has expired.' });
        }
        if (!(req.body.newPassword === req.body.verifyPassword)) {
          return res.status(400).json({ response: 'The new password must match.' })
        }
        const hash = await bcrypt.hash(req.body.newPassword, 10);

        const updateUserWithNewPassword = await models.User.update({
          password: hash,
          resetPasswordToken: null,
          resetPasswordExpires: Date.now() + 600000
        }, {
          returning: true,
          where: {
            resetPasswordToken: token,
            resetPasswordExpires: {
              [Op.gt]: Date.now()
            }
          }
        });

        res.status(201).json({ result: resetPassword })
      }
      catch (error) {
        console.log(error)
      }
    })()
  },
  signOut(req, res) {
    (async () => {
      try {
        return res.clearCookie('token', { path: '/' }).status(200).json({
          message: 'Sign out success!!!'
        });
      } catch (error) {
        console.log(error)
        return res.status(500).json({ error });
      }
    })()
  }
}