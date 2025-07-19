import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getProfile ,
  updateProfile 
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";   // <-- add this import

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

// *** Add this GET route for fetching current user profile ***
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);

export default router;