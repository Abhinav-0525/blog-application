//creating a user api using express mini app
const exp = require('express')
let userApp = exp.Router();
let brcyptjs = require('bcryptjs')
let expressAsync = require('express-async-handler')
let jwt = require('jsonwebtoken')
let verifyToken = require('../Middlewares/verifyToken')
require('dotenv').config()

//get collections object
let usersCollection
userApp.use((req, res, next)=>{
    usersCollection = req.app.get('usersCollection')
    next();
})

//user registration route
userApp.post('/user', expressAsync(async(req, res)=>{
    //get user details from client
    let newUser = req.body;
    //check for duplicate user
    let dbuser = await usersCollection.findOne({username: newUser.username})
    if(dbuser !== null){
        res.send({message:"Username already exists!"})
    }
    else{
        //hash password
        let hashedpass = await brcyptjs.hash(newUser.password, 6)
        newUser.password = hashedpass
        await usersCollection.insertOne(newUser)
        res.send({message:"User created"})
    }
}))

//user login route
userApp.post('/login', expressAsync(async(req, res)=>{
    let userObj = req.body;
    //check whether username exists
    let dbuser = await usersCollection.findOne({username: userObj.username})
    if(dbuser===null){
        res.send({message:"Username not found!"});
    }
    else{
        let val = await brcyptjs.compare(userObj.password, dbuser.password);
        if(val){
            let signedToken = jwt.sign({username:dbuser.username},process.env.SECRET_KEY)
            res.send({message:"Login successful", token:signedToken, obj:dbuser})
        }
        else{
            res.send({message:"Invalid password!"})
        }
    }
}))

//view all articles
userApp.get('/articles',verifyToken, expressAsync(async(req, res)=>{
    let articlesCollection = req.app.get('articlesCollection')
    let articleList = await articlesCollection.find({status:true}).toArray()
    res.send({message:"List of all articles", payload:articleList})
}))

//post comments
userApp.post('/comment/:articleId',verifyToken, expressAsync(async(req, res)=>{
    let articlesCollection = req.app.get('articlesCollection')
    let userCom = req.body;
    let articleIdFromParam = Number(req.params.articleId);
    let resp = await articlesCollection.updateOne({articleId:articleIdFromParam},{$addToSet:{comments:userCom}});
    //console.log(resp);
    res.send({message:"Comment posted"})
}))


module.exports = userApp;