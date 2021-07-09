const rootDir = require("../util/path.js")
const path = require("path");
const products =[];

const express = require("express");

const router = express.Router();

const body_parser = require("body-parser");

router.use(body_parser.urlencoded({extended:false}))

// //admin/add-product => POST
// router.post("/add-product", (req, res, next) => { //only parse the body of the incomming post request
//     products.push({title : req.body.title});
//     res.redirect("/");
// });

// //admin/add-product => GET
// router.get("/add-product", (req, res, next) => {
//     res.sendFile(path.join(rootDir, "views", "add-products.html"))
// });

router.post("/add-product",(req, res, next)=>{
    products.push({title: req.body.title});
    res.redirect("/");
    
});

router.get("/add-product",(req, res, next)=>{
    res.render("add-products",{
        pageTitle: "add-products",
        path:"/add-product"
    });
});

exports.routes = router;
exports.products = products;
