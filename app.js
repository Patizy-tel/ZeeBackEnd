const express = require('express');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const chalk =  require('chalk');
const cors = require('cors');

 console.log(chalk.blue('done fetching the petrol from the tank'))
const app = express();
  console.log(chalk.yellow('starting the engine'))

// Express body parser
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors())


console.log(chalk.magenta("middleware set"))
// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);


console.log(chalk.red("session set"))
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

console.log(chalk.red("encryption on"))
// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});


// Add routes
app.use(require('./routes/api/index'));

console.log("api  loaded")

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));





 