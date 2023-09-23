import express from "express";
import expressAsyncHandler from "express-async-handler";
import Cart from "../model/cart";
import { APIError, cartUserError, validationError } from "../errors";
import mongoose from "mongoose";

const getUserCart: express.RequestHandler = expressAsyncHandler(
	async (req, res) => {
		const { userId } = req.query;
		if (!userId) throw cartUserError();
		if (!mongoose.isValidObjectId(userId)) {
			throw validationError();
		}
		const cart = await Cart.findOne({ userId });
		if (!cart) throw new APIError("No cart found", 404);
		var total = 0;
		cart.books.map((book) => (total += book.quantity));
		res.status(200).json({ ...cart.toObject(), total: total });
	}
);

const createCart: express.RequestHandler = expressAsyncHandler(
	async (req, res) => {
		const { userId, bookId, quantity } = req.body;
		if (!bookId || !quantity || !userId) {
			res.status(400);
			throw new Error("bookId or quantity or userId not found");
		}
		if (!mongoose.isValidObjectId(bookId) || !mongoose.isValidObjectId(userId))
			throw validationError();
		let cart = await Cart.findOne({ userId });
		if (cart) {
			const bookInCart = cart.books.find((b) => b.bookId === bookId);
			if (bookInCart) bookInCart.quantity += quantity;
			else cart.books.push({ bookId, quantity });
			await cart.save();
		} else {
			cart = await Cart.create({
				userId,
				books: [{ bookId, quantity }],
			});
		}
		res.status(201).json(cart);
	}
);

const decreaseAmount: express.RequestHandler = expressAsyncHandler(
	async (req, res) => {
		const { userId, bookId, quantity } = req.body;
		const flag = req.query;

		if (!userId || !bookId || !(quantity || flag)) {
			res.status(400);
			throw new Error("bookId or quantity or userId not found");
		}
		if (!mongoose.isValidObjectId(bookId) || !mongoose.isValidObjectId(userId))
			throw validationError();
		let cart = await Cart.findOne({ userId });
		if (!cart) throw new APIError("No cart found", 404);

		let cartItem = cart.books.find((b) => b.bookId === bookId);
		if (!cartItem) {
			throw new APIError("this book is not in the cart", 404);
		}
		if (flag) cart.books = cart.books.filter((b) => b.bookId !== bookId);
		if (cartItem.quantity > quantity) cartItem.quantity -= quantity;
		else cart.books = cart.books.filter((b) => b.bookId !== bookId);
		await cart.save();
		res.status(200).json(cart);
	}
);
const clearCart: express.RequestHandler = expressAsyncHandler(
	async (req, res) => {
		const { userId } = req.body;
		if (!userId || !mongoose.isValidObjectId(userId))
			throw new APIError("Check userId", 400);
		let cart = await Cart.findOne({ userId });
		if (!cart) throw new APIError("No Cart Found for this user", 404);
		await Cart.deleteOne({ userId });

		res.status(204).end();
	}
);

export { getUserCart, createCart, decreaseAmount, clearCart };
