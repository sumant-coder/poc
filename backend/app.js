var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors")

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mangoose = require("mongoose")
var dotenv = require("dotenv");
const { default: mongoose } = require('mongoose');
var app = express();
app.use(cors());
app.use(express.json());
dotenv.config();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var user = require("./routes/users");
var users = ("./user", user);

app.use('/', indexRouter);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

mangoose.connect(
  process.env.LOCAL_DATABASE, { useNewUrlParser: true, useUnifiedTopology: true })
var db = mongoose.connection;
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server start on ${process.env.PORT}`);
})

module.exports = app;
