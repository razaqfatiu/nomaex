require('dotenv').config();
// const debug = require('debug')('app');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const { Op } = require('sequelize');

const models = require('../../models/index');
const crypto = require('crypto');
const nodeMailer = require('../../config/nodemailer');

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
    const {
      firstName, lastName, email, address1, address2, state, phoneNumber, password,
    } = req.body;
    const isAdmin = true;

    const userId = req.user.id;
    const { token, isAdministrator } = req.user;
    (async () => {
      try {
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
  adminSignIn(req, res) {
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

        if (!getUser[0].dataValues.isAdmin) {
          res.status(400).json({ error: 'Admin accounts only' });
        }
        const token = await jwt.sign(
          {
            userId: getUser[0].dataValues.userId,
            email: getUser[0].dataValues.email,
            isAdministrator: true,
          },
          process.env.TOKEN_SECRET,
          { expiresIn: '1h' },
        );
        // res.setHeader('Cache-Control', 'private')

        // res.cookie('login', token,
        res.cookie('token', token, {
          maxAge: 60 * 60 * 1000, // 1 hour
          httpOnly: true,
          secure: false,
          // sameSite: true,
        })
        // .send({ token });
        // )
        // res.send('done');
        return res.status(200).json({
          userId: getUser[0].dataValues.userId,
          token,
        });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ error });
      }
    })();
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
          return res.status(401).json({ error: 'Register an account' });
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

        console.log(updateUserWithToken);

        const sendEmail = await nodeMailer(req, user);

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
        // const checkUserWithToken = await 
        models.User.findOne({
          where: {
            resetPasswordToken: token,
            resetPasswordExpires: {
              [Op.gt]: Date.now()
            }
          },
          function(err, user) {
            if (!user) {
              return res.status(400).json({ response: 'Password reset token is invalid or has expired.' })
            }
            if (!(req.body.newPassword === req.body.verifyPassword)) {
              return res.status(400).json({ response: 'The new password must match.' })
            }
    
            user.password = req.body.password;
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
    
            user.save(function(err) {
              req.logIn(user, function(err) {
                done(err, user);
              });
            });
          }
        });
        
        
        // if (!checkUserWithToken) {
        //   return res.status(400).json({ response: 'Password reset token is invalid or has expired.' })
        // }
        // if (!(req.body.newPassword === req.body.verifyPassword)) {
        //   return res.status(400).json({ response: 'The new password must match.' })
        // }
        
        // const user = {}
        // const hashedPassword = await bcrypt.hash(password, 10);
        // const resetPasswordToken = undefined;
        // const resetPasswordExpires = undefined

        // const updateUsersWithoutToken = await models.User.update({

        // })
        // const updateUserPassword = await models.User.update({
        //   resetPasswordToken,
        //   resetPasswordExpires,
        // }, {
        //   returning: true,
        //   where: { email: userEmail }
        // });

      }
      catch (error) {
        console.log(error)
      }
    })()
  }

};
