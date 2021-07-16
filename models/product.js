const fs = require('fs');
const path = require("path");
const p = path.join(path.dirname(process.mainModule.filename),
    "data",
    "products.json"
);
const getProductsFromFile = cb => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            cb([]);
        } else {
            cb(JSON.parse(fileContent));
        }
    });
}
module.exports = class Product {
    constructor(title, imageUrl, price, description) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
    };
    save() {
        getProductsFromFile((products) => {
            console.log(this);
            products.push(this);
            var product = JSON.stringify(products);
            fs.writeFile(p, product, (err) => {
                console.log(err);
            });
        });
    }

    static fetchAll(cb) {
        getProductsFromFile(cb);
    };
}
// const products = [];
// module.exports = class Product {
//     constructor(t) {
//         this.title = t
//     }
//     save(){
//         products.push(this);
//     }
//     static fetchAll(){
//         return products;
//     }
// }