const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
    res.render("admin/edit-product", {
        pageTitle: "add-product",
        path: "/admin/add-product",
        editing: false
    });
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(title, imageUrl, price, description);
    product.save().then(() => {
        res.redirect("/");
    })
    .catch(err => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if(!editMode){
        return res.redirect("/");
    }
    prodId = req.params.productId;
    Product.getById(prodId, product => {
        if(!product){
            return res.redirect("/");
        }
        res.render("admin/edit-product", {
            pageTitle: "Edit-product",
            path: "/admin/products",
            editing: editMode,
            product: product

    });
    
    });
};
exports.postEditProducts = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDescription = req.body.description;
    const updatedProduct = new Product(prodId, updatedTitle, updatedImageUrl, updatedPrice, updatedDescription);
    updatedProduct.save();
    res.redirect("/admin/products")
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render("admin/products", {
            pageTitle: "Admin Products",
            prods: products,
            path: "/admin/products"

        });
    });
}
exports.postDeleteProducts =(req, res, next) => {
    prodId = req.body.productId;
    Product.delete(prodId);
    res.redirect("/admin/products")
}