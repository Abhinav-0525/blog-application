const exp = require('express');
const app = exp();
require('dotenv').config()
const mongoClient = require('mongodb').MongoClient;
const path = require('path');
const cors = require('cors');

//connecting react build to server
app.use(exp.static(path.join(__dirname, '../frontend/build')))

app.use(cors({
    origin: 'https://scribbly-plum.vercel.app', // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
    credentials: true
}));

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: true,
  };

//making a connection with the Database
mongoClient.connect(process.env.DB_URL, options)
.then(client =>{
    //get db object
    const blogdb = client.db('blogdb')
    //get collections object
    const usersCollection = blogdb.collection('usersCollection')
    const authorsCollection = blogdb.collection('authorsCollection')
    const articlesCollection = blogdb.collection('articlesCollection')

    //make the collections object available to express app
    app.set('usersCollection',usersCollection )
    app.set('authorsCollection',authorsCollection )
    app.set('articlesCollection',articlesCollection )

    console.log("Connection to db successful")
})
.catch((err)=>{
    console.log("An error occured while connecting to db", err)
})

//To parse the body of the request
app.use(exp.json())

let userApp = require('./APIs/user-api')
let adminApp = require('./APIs/admin-api')
let authorApp = require('./APIs/author-api')


//if path starts with user-api, send request to user app
app.use('/user-api', userApp)
//if path starts with admin-api, send request to admin app
app.use('/admin-api', adminApp)
//if path starts with author-api, send request to author app
app.use('/author-api', authorApp)

//code to prevent refresh error of webpage
app.use((req, res, next)=>{
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'))
})

//error handler
app.use((err, req, res, next)=>{
    res.send({message: "Error", payload:err.message})
})

let port = process.env.PORT || 4000;
app.listen(port, ()=>{console.log(`Web server running on ${port}`)})