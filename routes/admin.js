const rootDir = require("../util/path.js")
const path = require("path");

const express = require("express");

const router = express.Router();

const body_parser = require("body-parser");

router.use(body_parser.urlencoded({extended:false}))

//admin/add-product => POST
router.post("/add-product", (req, res, next) => { //only parse the body of the incomming post request
    console.log(req.body);
    res.redirect("/");
});

//admin/add-product => GET
router.get("/add-product", (req, res, next) => {
    res.sendFile(path.join(rootDir, "views", "add-products.html"))
});


module.exports = router;
