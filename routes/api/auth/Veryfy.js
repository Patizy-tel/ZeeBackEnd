var jwt = require('jsonwebtoken'); 
var config = require('../../../config/index'); // get our config file


var verifyToken = async (req,res ,next) =>{
  //check header parameters 
  let token = req.headers['x-access-token'] ;
  if(!token){
    return res.status(403).send({auth:false,message:'no token provied'})
  }else{
    jwt.verify(token ,config.secret,(err,decode) =>{
      if(err){
        return res.status(500).send( {auth:false,message:"failed to authenticate token"})
      }else{
        req.userId = decode.id ;
        next()
      }
    })
  }

  
}
module.exports = verifyToken;
