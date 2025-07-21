import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  addToCart,
  getCart,
  removeFromCart,
  updateCartItemQuantity,
  clearCart,
  checkoutCart,
} from "../controllers/cartController.js";

const router = express.Router();

// All routes below are protected (must be logged in)
router.use(protect);

router.get("/", getCart); // Get user's cart
router.post("/add", addToCart); // Add item to cart
router.post("/checkout", checkoutCart);
router.put("/update", updateCartItemQuantity); // Update quantity
router.delete("/remove/:productId", removeFromCart); // Remove item
router.delete("/clear", clearCart); // Clear entire cart

export default router;