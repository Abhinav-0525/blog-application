let jwt = require('jsonwebtoken')
require('dotenv').config()

function verifyToken(req, res, next){
    let bearerToken = req.headers.authorization;
    if(!bearerToken){
       return res.send({message:"Unauthorised request. Please log in"})
    }
    let token = bearerToken.split(' ')[1];
    try{
        jwt.verify(token, process.env.SECRET_KEY)
        next()
    }
    catch(err){
        next(err);
    }
}

module.exports = verifyToken;