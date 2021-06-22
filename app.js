const express = require("express");
const app = express();



const shopRouter = require("./routes/shop.js")
const adminRouter = require("./routes/admin.js")

app.use(adminRouter);
app.use(shopRouter);

app.listen(3000);
