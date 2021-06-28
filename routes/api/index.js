const router = require('express').Router()
const chalk  =  require('chalk');



router.use('/api/users' , require('./users'));
router.use('/api/results' , require('./ResultRoute'));
console.log(chalk.red('all apis ready')) 

module.exports = router ;