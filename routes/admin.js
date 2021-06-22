const express = require("express");

const router = express.Router();

const body_parser = require("body-parser");

router.use(body_parser.urlencoded({extended:false}))

router.get("/", (req, res, next) => {
    res.send("<form action = '/product' method = 'POST' ><input type = 'text' name = 'search'><button type = 'submit'>Search</button></form>");
});

router.post("/product", (req, res, next) => { //only parse the body of the incomming post request
    console.log(req.body);
    res.redirect("/products");
});





module.exports = router;
