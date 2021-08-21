//controllers which consists of functions 
const Sequelize = require("sequelize");
const sequelize = require("../util/database");
const Product = require("../models/product");
const Cart = require("../models/cart.js");

exports.getIndex = (req, res, next) => {
    Product.findAll()
    .then(products => {
        res.render("shop/index", {
            pageTitle: "Index",
            prods: products,
            path: "/"
        });
    })
    .catch(err => {
        console.log(err);
    });
    //Manual SQL Code
    // Product.fetchAll()
    // .then(([rows, fields]) => {
    //     res.render("shop/index", {
    //         pageTitle: "Index",
    //         prods: rows,
    //         path: "/"
    //     });
    // })
    // .catch(err => {
    //     console.log(err);
    // })
};

exports.getProductId = (req, res, next) => {
    prodId = req.params.productId;
    Product.findByPk(prodId)
    .then(products =>{
        res.render("shop/product-detail", {
            product: products,
            pageTitle: "Product Details",
            path: "/products"
                    
    });
    })
    .catch(err => console.log(err))
    //Manual SQL Code
    // Product.getById(prodId)
    // .then(([products]) =>{
    //     console.log(products);
    //     res.render("shop/product-detail", {
    //         pageTitle: "Product Details",
    //         path: "/products",
    //         product: products[0],
    //     });
    // })
    // .catch(err => console.log(err))
};

exports.getProducts = (req, res, next) => {
    req.user.getProducts()
        .then(products => {
            res.render("shop/product-list", {
                pageTitle: "Products",
                prods: products,
                path: "/products"
            });
        })
        .catch(err => {
            console.log(err);
        });
    //Manual SQL Code
    // Product.fetchAll()
    //     .then(([rows, fields]) => {
    //         res.render("shop/product-list", {
    //             pageTitle: "Products",
    //             prods: rows,
    //             path: "/"
    //         });
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     })
     };

exports.getCart = (req, res, next) => {
    req.user.getCart()
    .then(cart => {
        return cart.getProducts()
    .then(product => {
        res.render("shop/cart", {
            pageTitle: "My Cart",
            path: "/cart",
            products: product
        });
    })
    .catch(err => console.log(err));   
})
.catch(err => console.log(err)); 
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    let fetchedCart;
    let newQuantity = 1;
    req.user.getCart()
    .then(cart => {
        fetchedCart = cart;
        return cart.getProducts({where: {id: prodId}});
    })
    .then(products => {
        let product;
        if(products.length > 0){
            
            product = products[0];
        }
        if(product){
            const oldQuantity = product.cartItem.quantity;
            newQuantity = oldQuantity + 1;
            return product
        }
        return Product.findByPk(prodId)
        })
        .then(product => {
            return fetchedCart.addProduct(product, {
                through: { quantity: newQuantity }
            })
        .then(result => {
            res.redirect("/cart");
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));

   
   
    // Product.getById(prodId, product => {
    //     Cart.addproduct(product.id,product.price);
    // });
    // res.redirect("/cart");
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

exports.postDeleteCart = (req, res, next) => {
    const prodId = req.body.prodId;
    console.log(prodId);
    req.user.getCart()
    .then(cart => {
        return cart.getProducts({where: {id: prodId}});
    })
    .then(products => {
        console.log(products);
        const product = products[0];
        return product.cartItem.destroy();
    })
    .then(result => res.redirect("/cart"))
    .catch(err => console.log(err));
}
