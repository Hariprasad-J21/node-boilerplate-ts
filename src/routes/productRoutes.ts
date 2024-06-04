import express from "express";
import productController from "../controllers/productController";
// const jwtMiddleware = require('../middlewares/jwtMiddleware')
const router = express.Router();

router.post("/product", productController.addProduct);
router.post("/payment", productController.makePayment);
router.post("/map", productController.mapProduct);
// router.post('/confirm', productController.confirmPaymentIntent)
// router.post('/retrieve', productController.retrieveClientSecret)

export default router;
