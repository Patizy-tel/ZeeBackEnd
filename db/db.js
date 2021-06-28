var mongoose = require('mongoose') ;
const chalk = require('chalk')
const confi = require('../config/index')

mongoose.connect(confi.mydb,{ useNewUrlParser: true })
        .then(console.log(chalk.green('db now runnning bho zvekuti')))
        .catch(err=>console.error(chalk.red(err.message)))


module.exports = mongoose;
