"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const book_1 = __importDefault(require("../model/book"));
const errors_1 = require("../errors");
const mongoose_1 = __importDefault(require("mongoose"));
const pixelExtractor_1 = require("../utils/pixelExtractor");
const stripe_1 = __importDefault(require("stripe"));
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2023-10-16",
});
const getAllBooks = express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.query.flag == "featured") {
        const featuredBooks = yield book_1.default.find().sort({ createdAt: -1 }).limit(5);
        res.status(200).json(featuredBooks);
    }
    else {
        const books = yield book_1.default.find();
        res.status(200).json(books);
    }
}));
exports.getAllBooks = getAllBooks;
const getBook = express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.default.isValidObjectId(req.params.bookId))
        throw errors_1.validationError();
    const book = yield book_1.default.findById(req.params.bookId);
    if (!book)
        throw new errors_1.APIError("No book found", 404);
    res.status(200).json(book);
}));
exports.getBook = getBook;
const addBook = express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, price, quantity, author, publisher, image, category, description, } = req.body;
    console.log(req.body);
    if (!name ||
        !quantity ||
        !price ||
        !author ||
        !publisher ||
        !image ||
        !category ||
        !description) {
        throw new errors_1.APIError("All fields are mandatory", 400);
    }
    const css = yield pixelExtractor_1.getPixelData(image);
    let font;
    let boxShadowValue;
    if (css[0] > 100 && css[1] > 100) {
        font = 0;
    }
    else {
        font = 1;
    }
    boxShadowValue = `rgba(${css[0]}, ${css[1]}, ${css[2]}, ${css[3] / 255})`;
    const cssDocument = {
        font,
        boxShadowValue,
    };
    const book = yield book_1.default.create({
        name,
        price,
        quantity,
        category,
        author,
        publisher,
        image,
        description,
        css: cssDocument,
    });
    res.status(201).json(book);
}));
exports.addBook = addBook;
const updateBook = express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    if (!mongoose_1.default.isValidObjectId(req.params.bookId))
        throw errors_1.validationError();
    const book = yield book_1.default.findByIdAndUpdate(req.params.bookId, req.body, {
        new: true,
    });
    if (!book)
        throw new errors_1.APIError("No book found", 404);
    res.status(200).json(book);
}));
exports.updateBook = updateBook;
const searchBook = express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.query;
    if (!name) {
        throw errors_1.searchError();
    }
    const reg = new RegExp(`${name}`, "i");
    const book = yield book_1.default.find({ name: reg });
    if (!book)
        throw new errors_1.APIError("No book found", 404);
    res.status(200).json(book);
}));
exports.searchBook = searchBook;
const deleteBook = express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.default.isValidObjectId(req.params.bookId))
        throw errors_1.validationError();
    const book = yield book_1.default.findByIdAndDelete(req.params.bookId);
    if (!book)
        throw new errors_1.APIError("No Book Found ", 404);
    res.status(204).end();
}));
exports.deleteBook = deleteBook;
const getBooksNumber = express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_1.default.countDocuments();
    res.status(200).json({ count: book });
}));
exports.getBooksNumber = getBooksNumber;
const buyBook = express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { quantity: requestedQuantity } = req.body;
    if (!mongoose_1.default.isValidObjectId(req.params.bookId))
        throw errors_1.validationError();
    const book = yield book_1.default.findById(req.params.bookId);
    if (!book)
        throw errors_1.validationError();
    if (!(book === null || book === void 0 ? void 0 : book.quantity) ||
        requestedQuantity > book.quantity ||
        requestedQuantity <= 0)
        throw errors_1.quantityError();
    const SelectedBook = yield book_1.default.findByIdAndUpdate(req.params.bookId, {
        quantity: (book === null || book === void 0 ? void 0 : book.quantity) - req.body.quantity,
    }, { new: true });
    res.status(200).json(SelectedBook);
}));
exports.buyBook = buyBook;
