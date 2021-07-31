const fs = require('fs');
const path = require("path");

//creating a file inside data folder from the rootdirectory

const p = path.join(path.dirname(process.mainModule.filename),
    "data",
    "cart.json"
    );

module.exports = class Cart{
    static addproduct(id, productPrice){

        //checking for file in data folder if it exits, copying the contents
        //if it doesnt initializing the values

        fs.readFile(p, (err , fileContent) =>{
            let cart = { products: [], totalPrice: 0};
            if(!err){
                cart = JSON.parse(fileContent);
            }

            //finding that is recieved product already exists? using id
            //getting index of that existing product

            const existingProductIndex = cart.products.findIndex(
                findByIndex => findByIndex.id === id
                );

            //by getting index number, store that product array by using indexing

            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            if(existingProduct){

                //stored the existing product array in updatedProduct

                updatedProduct = { ...existingProduct };

                //adding qty + 1 to that existing product

                updatedProduct.qty = updatedProduct.qty + 1;

                //storing cart product to cart product itself

                cart.products = [ ...cart.products ];

                //using indexing replace the existing product with updatedProduct

                cart.products[existingProductIndex] = updatedProduct ;
            }else{

                //if there is no existing product initializating id and quantity

                updatedProduct = { id: id, qty: 1};

                //appending cart products and updatedproduct to cart.products

                cart.products = [ ...cart.products, updatedProduct];
            }

            //if old price exists adding current product price with previous total

            cart.totalPrice = cart.totalPrice+ +productPrice;

            //after done everything writing all cart array to cart.json file

            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            });
            
        }); 
    };

    static deleteProduct(id, productPrice){
        fs.readFile(p, (err,fileContent) => {
            if(err){
                return;
            }
            const updatedCart = {...JSON.parse(fileContent)};
            
            const product = updatedCart.products.find(findId => findId.id === id);
            const productQty = product.qty;
            updatedCart.products = updatedCart.products.filter(prodId => prodId.id !== id);
            updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty;
             fs.writeFile(p, JSON.stringify(updatedCart),err =>{
                 console.log(err);
             });
        });
    };
}

