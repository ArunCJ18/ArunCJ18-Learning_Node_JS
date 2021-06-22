const express = require("express");
const router = express.Router();

router.get("/products", (req, res, next) => {
    res.send("<h1>You're at Products Page</h1>");
});

module.exports = router;

