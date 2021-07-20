const fs = require('fs');
const path = require("path");
//creating a file inside data folder from the rootdirectory
const p = path.join(path.dirname(process.mainModule.filename),
    "data",
    "products.json"
);

//cb is a callback function which returns file content if file exists
//else return an empty array []
const getProductsFromFile = cb => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            cb([]);
        } else {
            cb(JSON.parse(fileContent));
        }
    });
}

//constructor recieve the title imagerl price description values in parameter

module.exports = class Product {
    constructor(title, imageUrl, price, description) {
        this.id = Math.random().toString();
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
    };

//using getProductsFromFile it checks filecontent 
//then push the vaule that constructor recieves to products
//products converts to a json string and write into the data file 
    save() {
        getProductsFromFile((products) => {
            products.push(this);
            var product = JSON.stringify(products);
            fs.writeFile(p, product, (err) => {
                console.log(err);
            });
        });
    }

//fetch the values by using the getProductsFromFile function
    static fetchAll(cb) {
        getProductsFromFile(cb);
    };

//by passing the id in parameter it finds for a product with that id
//in data file, then display that content through callback

    static getById(id,cb){
        getProductsFromFile(products => {
            const product=products.find(findId => findId.id === id);
            cb(product);
        });
    };
}
