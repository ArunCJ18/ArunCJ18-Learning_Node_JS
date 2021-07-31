//controllers which consists of functions 
const Product = require("../models/product");
const Cart = require("../models/cart.js");

exports.getIndex = (req, res, next) => {
    Product.fetchAll()
    .then(([rows, fields]) => {
        res.render("shop/index", {
            pageTitle: "Index",
            prods: rows,
            path: "/"
        });
    })
    .catch(err => {
        console.log(err);
    })
};

exports.getProductId = (req, res, next) => {
    const prodId = req.params.productId;
    Product.getById(prodId).then(([products]) =>{
        console.log(products);
        res.render("shop/product-detail", {
            pageTitle: "Product Details",
            path: "/products",
            product: products[0],
        });
    })
    .catch(err => console.log(err))
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll()
        .then(([rows, fields]) => {
            res.render("shop/product-list", {
                pageTitle: "Products",
                prods: rows,
                path: "/"
            });
        })
        .catch(err => {
            console.log(err);
        })
    };

exports.getCart = (req, res, next) => {
    res.render("shop/cart", {
        pageTitle: "My Cart",
        path: "/cart"
    });
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.getById(prodId, product => {
        Cart.addproduct(product.id,product.price);
    });
    res.redirect("/cart");
};

exports.getOrder = (req, res, next) => {
    res.render("shop/orders", {
        pageTitle: "My Order",
        path: "/order"
    });
};

exports.getCheckout = (req, res, next) => {
    res.render("shop/checkout", {
        pageTitle: "Checkout",
        path: "/checkout"
    });
};
