import express from "express";
import authRoutes from "../src/routes/authRoutes";
import userRoutes from "../src/routes/userRoutes";
import productRoutes from "../src/routes/productRoutes";
const app = express();
import cors from "cors";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/user", productRoutes);

export default app;
