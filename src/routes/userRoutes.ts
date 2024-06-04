import express from "express";
import userController from "../controllers/userController";
import jwtMiddleware from "../middlewares/jwtMiddleware";
const router = express.Router();

router.get("/profile", jwtMiddleware, userController.viewProfile);
router.put("/profile", jwtMiddleware, userController.updateProfile);
router.delete("/profile", jwtMiddleware, userController.deleteProfile);

export default router;
