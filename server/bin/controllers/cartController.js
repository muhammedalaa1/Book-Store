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
const cart_1 = __importDefault(require("../model/cart"));
const errors_1 = require("../errors");
const mongoose_1 = __importDefault(require("mongoose"));
const book_1 = __importDefault(require("../model/book"));
const getUserCart = express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.query;
    if (!userId)
        throw errors_1.cartUserError();
    if (!mongoose_1.default.isValidObjectId(userId)) {
        throw errors_1.validationError();
    }
    const cart = yield cart_1.default.findOne({ userId });
    if (!cart)
        throw new errors_1.APIError("No cart found", 404);
    var total = 0;
    cart.books.map((book) => (total += book.quantity));
    res.status(200).json(Object.assign(Object.assign({}, cart.toObject()), { total: total }));
}));
exports.getUserCart = getUserCart;
const createCart = express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, bookId, quantity } = req.body;
    if (!bookId || !quantity || !userId) {
        res.status(400);
        throw new Error("bookId or quantity or userId not found");
    }
    if (!mongoose_1.default.isValidObjectId(bookId) || !mongoose_1.default.isValidObjectId(userId))
        throw errors_1.validationError();
    let cart = yield cart_1.default.findOne({ userId });
    let book = yield book_1.default.findById(bookId);
    const { image, name, description } = book;
    let price = book.price;
    if (cart) {
        let bookInCart = cart.books.find((b) => b.bookId === bookId);
        if (bookInCart)
            bookInCart.quantity = parseInt(quantity);
        else
            cart.books.push({ bookId, image, name, quantity, price, description });
        yield cart.save();
    }
    else {
        cart = yield cart_1.default.create({
            userId,
            books: [{ bookId, image, name, quantity, price, description }],
        });
    }
    res.status(201).json(cart);
}));
exports.createCart = createCart;
const decreaseAmount = express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, bookId, quantity } = req.body;
    const deleteItem = req.query["delete"];
    console.log(deleteItem);
    if (!userId || !bookId || !(quantity || deleteItem)) {
        res.status(400);
        throw new Error("bookId or quantity or userId not found");
    }
    if (!mongoose_1.default.isValidObjectId(bookId) || !mongoose_1.default.isValidObjectId(userId))
        throw errors_1.validationError();
    let cart = yield cart_1.default.findOne({ userId });
    if (!cart)
        throw new errors_1.APIError("No cart found", 404);
    let cartItem = cart.books.find((b) => b.bookId === bookId);
    if (!cartItem) {
        throw new errors_1.APIError("this book is not in the cart", 404);
    }
    if (deleteItem)
        cart.books = cart.books.filter((b) => b.bookId !== bookId);
    if (cartItem.quantity > quantity)
        cartItem.quantity -= parseInt(quantity);
    else
        cart.books = cart.books.filter((b) => b.bookId !== bookId);
    yield cart.save();
    res.status(200).json(cart);
}));
exports.decreaseAmount = decreaseAmount;
const clearCart = express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.query.userId;
    if (!userId || !mongoose_1.default.isValidObjectId(userId))
        throw new errors_1.APIError("Check userId", 400);
    let cart = yield cart_1.default.findOne({ userId });
    if (!cart)
        throw new errors_1.APIError("No Cart Found for this user", 404);
    yield cart_1.default.deleteOne({ userId });
    res.status(204).end();
}));
exports.clearCart = clearCart;
const applyCoupon = express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { coupon, userId } = req.body;
    console.log(userId);
    if (!userId)
        throw new errors_1.APIError("Check userId", 400);
    if (coupon !== undefined) {
        let cart = yield cart_1.default.findOne({ userId });
        if (!cart)
            throw new errors_1.APIError("No Cart Found for this user", 404);
        cart.coupon = coupon;
        yield cart.save();
        res.status(200).json(cart);
    }
}));
exports.applyCoupon = applyCoupon;
