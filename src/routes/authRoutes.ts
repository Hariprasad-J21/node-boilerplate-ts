import authController from "../controllers/authController";

import express from "express";

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);

export default router;
