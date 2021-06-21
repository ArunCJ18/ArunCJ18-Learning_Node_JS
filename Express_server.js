const express = require ("express");

const app = express();

app.use((req, res, next)=>{
    console.log("I am a middleware!")
    next();                      //without next() the function won't jump or execute next function  
});

app.use((req, res, next)=>{
    console.log("I am second user middleware")
});
app.listen(3000)