import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";

const app = express();
dotenv.config();
connectDB();

app.use(cors({ 
    origin: "http://localhost:5173", 
    credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve uploaded images
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));