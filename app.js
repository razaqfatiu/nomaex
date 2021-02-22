/* eslint-disable func-names */
require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const debug = require('debug')('app');
const cors = require('cors');
const userRouter = require('./routes/user');
const adminRouter = require('./routes/admin');

const app = express();
const port = process.env.PORT || '5000';
const db = require('./models/index');

const { sequelize } = db;


(async function () {
  try {
    await sequelize.authenticate();
    debug('connected to Db on 5432......');
  } catch (err) {
    debug(`db error: ${err}`);
  }
}());

app.set('port', port);
app.use(cookieParser());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('tiny'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cors());
// app.use(cors({ credentials: true, origin: process.env.frontEndURL }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.frontEndURL);
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, OPTIONS, DELETE');
  next();
});
console.log(process.env.frontEndURL)
app.use('/media', express.static(path.join(__dirname, 'media')));
app.use('/product-images', express.static(path.join(__dirname, 'media/product-images')));


app.use('/api/v1/user', userRouter);
app.use('/api/v1', adminRouter);
app.use('/', (req, res) => res.send('Welcome to Nomaex API'));

app.get('*', (req, res) => {
  res.status(404).send('NotFound');
});
// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
