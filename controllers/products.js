//controllers which consists of functions 
const Product = require("../models/product");
const appjs = require("../app");


exports.getAddProduct = (req, res, next) => {
    res.render("add-products", {
        pageTitle: "add-products",
        path: "/add-product"
    });
};

exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect("/");
};

exports.getProduct = (req, res, next) => {
    Product.fetchAll(products => {
        res.render("shop", {
            pageTitle: "Shop",
            prods: products,
            path: "/"

        });
    });
};

