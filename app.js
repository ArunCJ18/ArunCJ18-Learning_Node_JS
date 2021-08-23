// const rootDir = require("./util/path.js")
const path = require("path");
const express = require("express");
const app = express();
const errorController = require("./controllers/error");
const body_parser = require("body-parser");
//MySQL
// const db = require("./util/database")
const sequelize = require('./util/database');
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");
const Order = require("./models/order");
const OrderItem = require("./models/order-item");

app.use(body_parser.urlencoded({extended: false}));
//templating engine ejs and i think views is the path where it has to search
app.set("view engine", "ejs");
app.set("views", "views")

const shopRouter = require("./routes/shop.js")
const adminRouter = require("./routes/admin.js")


//always checks for file in this folder if a file that we asked is in this folder
//exists it loads the file => this now used for the css in html
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
    User.findByPk(1)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});

app.use("/admin",adminRouter);
app.use(shopRouter); //include '/admin' for that file before the path 

// ///handling 404 page not found
// app.use("/",(req, res, next)=>{
//     res.status(404).sendFile(path.join(rootDir, "views", "404.html"));
// });

app.use(errorController.get404);

Product.belongsTo(User, {constraints:true, onDelete:'CASCADE'});

User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, {through: CartItem});
Product.belongsToMany(Cart, {through: CartItem});
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, {through: OrderItem});




sequelize.sync()
.then(result => {
    return User.findByPk(1);
})
.then(user => {
    if(!user){
        return User.create({name:'tester', email: 'tester@test.com'});
    }
    return user;
})
.then(user => {
    return user.createCart();
})
.then(cart => {
    app.listen(3000);
})    
.catch(err => {
    console.log(err);
});







