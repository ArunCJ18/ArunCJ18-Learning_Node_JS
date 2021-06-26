const rootDir = require("./util/path.js")
const path = require("path");
const express = require("express");
const app = express();

const shopRouter = require("./routes/shop.js")
const adminRouter = require("./routes/admin.js")

//always checks for file in this folder if a file that we asked is in this folder
//exists it loads the file => this now used for the css in html
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin",adminRouter);
app.use(shopRouter); //include '/admin' for that file before the path 

///handling 404 page not found
app.use("/",(req, res, next)=>{
    res.status(404).sendFile(path.join(rootDir, "views", "404.html"));
});

app.listen(3000);



