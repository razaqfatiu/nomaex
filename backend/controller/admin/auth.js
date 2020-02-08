require('dotenv').config();
// const debug = require('debug')('app');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const { Op } = require('sequelize');

const User = require('../../models/user-account');


module.exports = {
  signUpValidator: [
    check('firstName').not().isEmpty().trim(),
    check('lastName').not().isEmpty().trim(),
    check('email').isEmail().not().isEmpty()
      .trim(),
    check('password').isLength({ min: 5 }).not().isEmpty()
      .trim()
      .withMessage('must be at least 5 chars long'),
    check('gender').isLength({ min: 4 }).not().isEmpty()
      .trim(),
    check('jobRole').not().isEmpty().trim(),
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
        const checkIfNewuserExists = await User.findAll({
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
          firstName, lastName, email, address1, address2, state, phoneNumber, password: hash, isAdmin,
        };
        // VALIDATION
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(422).json({ errors: errors.array() });
        }
        await User.sync();
        await User.create(newUser);
        return res.status(201).json({
          message: 'Admin Account successfully created',
          token,
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
        const getUser = await User.findAll({
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
          { userId: getUser[0].dataValues.userId, email: getUser[0].dataValues.email, isAdministrator: true },
          process.env.TOKEN_SECRET,
          { expiresIn: '1h' },
        );
        // res.cookie('login', token, 
        res.cookie('jwtsignin', token, {
          maxAge: 60 * 60 * 1000, // 1 hour
          // httpOnly: true,
          // secure: true,
          sameSite: true,
        })
        // )
        return res.status(200).json({
          userId: getUser[0].dataValues.userId,
          token,
        });
      } catch (error) {
        console.log(error)
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
        const checkIfNewuserExists = await User.findAll({ where: { email } });
        if (checkIfNewuserExists.length > 0) {
          return res.status(400).json({ error: 'User account exists' });
        }
        const hash = await bcrypt.hash(password, 10);
        console.log(req.body);
        const newUser = {
          firstName, lastName, email, address1, address2, state, phoneNumber, password: hash, isAdmin,
        };
        await User.sync();
        await User.create(newUser);
        return res.status(201).json({
          message: 'Admin Account successfully created',
        });
      } catch (err) {
        console.log(`ERRORI ${err}`)
        return res.status(500).json({ errorResponse: err.message });
      }
    })();
  },

};
