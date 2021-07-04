const express = require('express');
const http = require('http');
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const userRouter = require('./routers/user');
const actionRouter = require('./routers/action')
const cors = require('cors')


const hostname = 'localhost';
const port = 5000;

const url = `mongodb+srv://dbquillhash:quillhashbyakshit@cluster0.grpn5.mongodb.net/userRegistrationdb?retryWrites=true&w=majority`;
const connect = mongoose.connect(url,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useFindAndModify: false
});

connect.then((db)=>{
    console.log("Connected to server");
},(err)=>{console.log(err);});

const app = express();

app.use(cors());

app.use(express.json());

app.use(userRouter);
app.use(actionRouter);

const server = http.createServer(app);

server.listen(port,hostname, ()=>{
    console.log('Hello World at Console');
});