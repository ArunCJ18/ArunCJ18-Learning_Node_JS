const express = require("express");
const router = express.Router();
const shopController = require("../controllers/shop");

router.get("/",shopController.getIndex);

router.get("/products", shopController.getProducts);

router.get("/cart", shopController.getCart);

router.post("/cart", shopController.postCart);

router.get("/order", shopController.getOrder);

router.get("/checkout",shopController.getCheckout);

router.get("/products/:productId",shopController.getProductId);

router.post("/cart-delete-item", shopController.postDeleteCart);

module.exports = router;

