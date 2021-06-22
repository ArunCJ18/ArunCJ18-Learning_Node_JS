const express = require("express");
const body_parser = require("body-parser"); 
const app = express();
//const adminRoutes = require('./routes/admin.js');
//const shopRoutes = require("./routes/shop.js");


app.use(body_parser.urlencoded({extended:false})); //package used for the parse the req body

/* app.use((req, res, next)=>{
    console.log("I am a middleware!")
    next();                      //without next() the function won't jump or execute next function  
});

app.use((req, res, next)=>{
    console.log("I am second user middleware")
});
app.listen(3000) */

/* app.use("/", (req, res, next) => {
    console.log("This always Print"); //bcoz its use one thread it executes line by line
    console.log("This is firmware 0.0");
    next();  //we're using next bcoz its common firmware for both '/' and '/page2'
});

app.use("/Page2", (req, res, next) => {  //we're declaring /page2 first bcoz "/"== "/page2" && "/"
    console.log("Its Firmware 0.2");
    res.send("<h1>You're at Page 2</h1>");
    //if we put next() here js try to execute the next firmware, that is 2 pages at a time
    //this will lead to "Cannot set headers after they are sent to the client"
});

app.use("/", (req, res, next) => {
    console.log("Its Firmware 0.1");
    res.send("<h1>You're at page 1</h1>"); 
});   */

 app.use("/products", (req, res, next) => {
    res.send("<h1>You're at Products Page</h1>");
});

app.post("/product",(req, res, next)=>{ //only parse the body of the incomming post request
    console.log(req.body);
    res.redirect("/products");
}) 

app.use("/", (req, res, next) => {
    res.send("<form action = '/product' method = 'POST' ><input type = 'text' name = 'search'><button type = 'submit'>Search</button></form>");
}); 







app.listen(3000);