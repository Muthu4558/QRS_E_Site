import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  googleLogin,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/google-login", googleLogin);

export default router;