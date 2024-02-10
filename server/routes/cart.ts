import express from "express";
const router = express.Router();
import {
	applyCoupon,
	clearCart,
	createCart,
	decreaseAmount,
	getUserCart,
} from "../controllers/cartController";

router
	.route("/")
	.get(getUserCart)
	.post(createCart)
	.put(decreaseAmount)
	.patch(applyCoupon)
	.delete(clearCart);
export default router;
