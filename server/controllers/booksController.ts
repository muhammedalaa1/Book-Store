import express from "express";
import expressAsyncHandler from "express-async-handler";
import Books from "../model/book";
import {
	APIError,
	validationError,
	quantityError,
	searchError,
} from "../errors";
import mongoose from "mongoose";

const getAllBooks: express.RequestHandler = expressAsyncHandler(
	async (req, res, next) => {
		if (req.query.flag == "t") {
			const featuredBooks = await Books.find().sort({ createdAt: -1 }).limit(5);
			res.status(200).json(featuredBooks);
		} else {
			const books = await Books.find();
			res.status(200).json(books);
		}
	}
);
const getBook: express.RequestHandler = expressAsyncHandler(
	async (req, res) => {
		if (!mongoose.isValidObjectId(req.params.bookId)) throw validationError();
		const book = await Books.findById(req.params.bookId);
		if (!book) throw new APIError("No book found", 404);
		res.status(200).json(book);
	}
);

const addBook: express.RequestHandler = expressAsyncHandler(
	async (req, res) => {
		console.log(req.body);
		const {
			name,
			price,
			quantity,
			author,
			publisher,
			image,
			category,
			description,
		} = req.body;

		if (
			!name ||
			!quantity ||
			!price ||
			!author ||
			!publisher ||
			!image ||
			!category ||
			!description
		) {
			throw new APIError("All fields are mandatory", 400);
		}
		const book = await Books.create({
			name,
			price,
			quantity,
			category,
			author,
			publisher,
			image,
			description,
		});

		res.status(201).json(book);
	}
);

const updateBook: express.RequestHandler = expressAsyncHandler(
	async (req, res) => {
		if (!mongoose.isValidObjectId(req.params.bookId)) throw validationError();
		const book = await Books.findByIdAndUpdate(req.params.bookId, req.body, {
			new: true,
		});
		if (!book) throw new APIError("No book found", 404);

		res.status(200).json(book);
	}
);

const searchBook: express.RequestHandler = expressAsyncHandler(
	async (req, res) => {
		const { name } = req.query;
		if (!name) {
			throw searchError();
		}
		const reg = new RegExp(`${name}`, "i");

		const book = await Books.find({ name: reg });
		if (!book) throw new APIError("No book found", 404);
		res.status(200).json(book);
	}
);

const deleteBook: express.RequestHandler = expressAsyncHandler(
	async (req, res) => {
		if (!mongoose.isValidObjectId(req.params.bookId)) throw validationError();
		const book = await Books.findByIdAndDelete(req.params.bookId);
		if (!book) throw new APIError("No Book Found ", 404);
		res.status(204).end();
	}
);

const getBooksNumber: express.RequestHandler = expressAsyncHandler(
	async (req, res) => {
		const book = await Books.countDocuments();
		res.status(200).json({ count: book });
	}
);

const buyBook: express.RequestHandler = expressAsyncHandler(
	async (req, res) => {
		const { quantity: requestedQuantity } = req.body;
		if (!mongoose.isValidObjectId(req.params.bookId)) throw validationError();
		const book = await Books.findById(req.params.bookId);
		if (!book) throw validationError();
		if (
			!book?.quantity ||
			requestedQuantity > book.quantity ||
			requestedQuantity <= 0
		)
			throw quantityError();

		const SelectedBook = await Books.findByIdAndUpdate(
			req.params.bookId,
			{
				quantity: book?.quantity - req.body.quantity,
			},
			{ new: true }
		);
		res.status(200).json(SelectedBook);
	}
);

export {
	getAllBooks,
	getBook,
	addBook,
	updateBook,
	buyBook,
	getBooksNumber,
	deleteBook,
	searchBook,
};
