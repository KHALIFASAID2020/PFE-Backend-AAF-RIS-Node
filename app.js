const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const User = require('./models/User');

const passport = require('passport');
//const cookieParser = require('cookie-parser');
const session = require('express-session');
const Strategy = require('passport-local').Strategy;

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const cors = require('cors');

const mongoose =require('mongoose');

mongoose
  .connect(
    "mongodb://localhost:27017/AAF-db-RIS", { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });




const app = express();




/* 
app.use(cookieParser());
app.use(session({
secret: 'my super secrect',
resave:true,
saveUninitialized:true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user,cb)=>{
    cb(null,user);
});
passport.deserializeUser((user,cb)=>{
    cb(null,user);
});

passport.use(new Strategy({
    usernameField: 'email',
    passwordField:'password'
},(email,pwd,cb)=>{
    User.findOne({email : email},(err,user)=>{
      if(err){
        console.log(`could not find ${email} in mongodb`,err);
      }
      if(user.password !==pwd){
        console.log(`wrong password for ${email}`);
        
      }else{
        console.log(`${email} found in Mongodb and autetificated`);
        cb(null,user);
      }
    });
})); */




//-----
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});
app.use('/', indexRouter);
app.use('/api/users', usersRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
