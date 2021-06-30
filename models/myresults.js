const mongoose = require('mongoose')
const  ResultSchema = new mongoose.Schema({
    productName:{
        type:String,
        required:true

    },
    income:{
        type:Number,
        required:true
    } ,
    expense:{
        type:Number,
        required:true
    } ,

    optimalcompany:{

        type:Number,
        required:true
    },

    optimalMarket:{
        type:Number
    }
    ,
    
    year:{
        type:Number,
        required:"Year is required",
    length:4,
  
    } 
    
   

},{timestamps:true ,autoIndex:true});


module.exports = mongoose.model('results', ResultSchema);
