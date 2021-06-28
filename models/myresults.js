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

    result:{

        type:Number,
        required:true
    },
    
    year:{
        type:Number,
        required:"Year is required",
        maxlength:4,
        minlength:4
    } 
    
   

},{timestamps:true ,autoIndex:true});


module.exports = mongoose.model('results', ResultSchema);
