import productService from "../services/productService";
import userService from "../services/userService";
import logger from "../config/logger";
import Stripe from "stripe";
// require("dotenv").config();
import dotenv from "dotenv";
dotenv.config();
import { Request, Response } from "express";

// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const addProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productName, price } = req.body;
    if (productName && price) {
      await productService.createProduct(productName, price);
      res.status(200).json("Product is created successfully");
    } else {
      res.status(404).json("Missing fields in the body");
    }
  } catch (error) {
    logger.log("error", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const mapProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, productId } = req.body;
    if (userId && productId) {
      const result = await productService.mapping(userId, productId);
      res.status(200).json({ message: "Mapped successfully", result });
    } else {
      res.status(404).json("Missing fields in the body");
    }
  } catch (error) {
    logger.log("error", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const makePayment = async (req: Request, res: Response): Promise<void> => {
  const { userId, productId } = req.body;

  try {
    const user = await userService.getElementById(userId);
    const product = await productService.getProduct(productId);

    if (product && user) {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: product.price,
        currency: "inr",
        description: `Payment for ${product.productName}`,
        payment_method_types: ["card"],
        // confirm: true,
        metadata: {
          userId: user.id,
          productId: product.id,
        },
        shipping: {
          name: user.userName,
          address: {
            line1: "510 Townsend St",
            postal_code: "98140",
            city: "San Francisco",
            state: "CA",
            country: "US",
          },
        },
      });

      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    } else {
      res
        .status(404)
        .json({ success: false, error: "User of product not found" });
    }
  } catch (error) {
    logger.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

export default { addProduct, makePayment, mapProduct };
