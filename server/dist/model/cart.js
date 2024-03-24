"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const cartSchema = new mongoose_1.Schema({
    userId: {
        type: String,
        required: [true],
    },
    coupon: { type: Boolean, default: false },
    books: [
        {
            bookId: {
                type: String,
            },
            quantity: {
                type: Number,
                default: 1,
            },
            price: {
                type: Number,
            },
            name: {
                type: String,
            },
            image: {
                type: String,
            },
            description: {
                type: String,
            },
        },
    ],
}, {
    timestamps: true,
});
const Cart = (0, mongoose_1.model)("Cart", cartSchema);
exports.default = Cart;
