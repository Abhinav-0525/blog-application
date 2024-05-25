//creating a author api using express mini app
const exp = require('express')
let authorApp = exp.Router();
let brcyptjs = require('bcryptjs')
let expressAsync = require('express-async-handler')
let jwt = require('jsonwebtoken')
let verifyToken = require('../Middlewares/verifyToken')
require('dotenv').config()

//get collections object
let authorsCollection
let articlesCollection
authorApp.use((req, res, next)=>{
    authorsCollection = req.app.get('authorsCollection')
    articlesCollection = req.app.get('articlesCollection')
    next();
})

//author registration route
authorApp.post('/author', expressAsync(async(req, res)=>{
    //get user details from client
    let newUser = req.body;
    //check for duplicate user
    let dbuser = await authorsCollection.findOne({username: newUser.username})
    if(dbuser !== null){
        res.send({message:"Username already exists!"})
    }
    else{
        //hash password
        let hashedpass = await brcyptjs.hash(newUser.password, 6)
        newUser.password = hashedpass
        await authorsCollection.insertOne(newUser)
        res.send({message:"Author created"})
    }
}))

//author login route
authorApp.post('/login', expressAsync(async(req, res)=>{
    let userObj = req.body;
    //check whether username exists
    let dbuser = await authorsCollection.findOne({username: userObj.username})
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

//article creation
authorApp.post('/article',verifyToken, expressAsync(async(req, res)=>{
    let newArticle = req.body;
    await articlesCollection.insertOne(newArticle);
    res.send({message:"Article created"})
}))

//article updation
authorApp.put('/article', verifyToken, expressAsync(async(req, res)=>{
    let modifiedObj = req.body;
    let resp = await articlesCollection.updateOne({articleId:modifiedObj.articleId},{$set:{...modifiedObj}})
    let latestArticle=await articlesCollection.findOne({articleId:modifiedObj.articleId})
    res.send({message:"Article updated", article:latestArticle})
}))

//delete operation and restore operation (soft delete)
authorApp.put('/article/:id', verifyToken, expressAsync(async(req, res)=>{
    let searchid = Number(req.params.id);
    let articleToDelete = req.body;
    if(articleToDelete.status === true){
        let resp = await articlesCollection.updateOne({articleId: searchid}, {$set:{...articleToDelete,status: false}})
        //console.log(resp)
        res.send({message:"Article deleted"})
    }
    else{
        let resp = await articlesCollection.updateOne({articleId: searchid}, {$set:{...articleToDelete,status: true}})
        //console.log(resp)
        res.send({message:"Article restored"})
    }
}))

//get all articles of author
authorApp.get('/articles/:username',verifyToken, expressAsync(async(req, res)=>{
    let user = req.params.username;
    let articleList = await articlesCollection.find({$and:[{username:user}]}).toArray()
    res.send({message:"List of articles", payload:articleList})
}))

module.exports = authorApp;