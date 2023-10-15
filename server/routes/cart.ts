import express from "express";
const router = express.Router();
import {
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
	.delete(clearCart);
export default router;
