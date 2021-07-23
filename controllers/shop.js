//controllers which consists of functions 
const Product = require("../models/product");
const Cart = require("../models/cart.js");

exports.getIndex = (req, res, next) => {
    Product.fetchAll(products => {
        res.render("shop/index", {
            pageTitle: "Index",
            prods: products,
            path: "/"
        });
    });
};

exports.getProductId = (req, res, next) => {
    const prodId = req.params.productId;
    Product.getById(prodId, products => {
        res.render("shop/product-detail", {
            pageTitle: "Product Details",
            path: "/products",
            product: products,
        });
    });
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render("shop/product-list", {
            pageTitle: "Products",
            prods: products,
            path: "/products"

        });
    });
};

exports.getCart = (req, res, next) => {
    Cart.getCart(cart => {
        Product.fetchAll(products => {
            const cartProducts = [];
            console.log(cart.totalPrice);
            for (cartProduct of cart.products) {
                const cartProductData = products.find(prod => prod.id === cartProduct.id);
                if (cartProductData) {
                    cartProducts.push({ productData: cartProductData, qty: cartProduct.qty });
                }
            }
            res.render("shop/cart", {
                pageTitle: "My Cart",
                path: "/cart",
                products: cartProducts,
                totalPrice: cart.totalPrice
            });
        });
    });
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.getById(prodId, product => {
        Cart.addproduct(product.id, product.price);
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
exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.prodId;
    Product.getById(prodId,products => {
    Cart.deleteProduct(prodId,products.price)
    res.redirect("/cart")
    });
};
