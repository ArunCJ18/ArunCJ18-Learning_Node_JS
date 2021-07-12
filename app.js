// const rootDir = require("./util/path.js")
const path = require("path");
const express = require("express");
const app = express();
const errorController = require("./controllers/error");
const body_parser = require("body-parser");

app.use(body_parser.urlencoded({extended: false}));
//templating engine ejs and i think views is the path where it has to search
app.set("view engine", "ejs");
app.set("views", "views")

const shopRouter = require("./routes/shop.js")
const adminRouter = require("./routes/admin.js")

//always checks for file in this folder if a file that we asked is in this folder
//exists it loads the file => this now used for the css in html
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin",adminRouter);
app.use(shopRouter); //include '/admin' for that file before the path 

// ///handling 404 page not found
// app.use("/",(req, res, next)=>{
//     res.status(404).sendFile(path.join(rootDir, "views", "404.html"));
// });

app.use(errorController.get404);

app.listen(3000);



