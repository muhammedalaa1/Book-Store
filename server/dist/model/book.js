"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Please enter the book name"],
    },
    price: {
        type: Number,
        required: [true, "Please enter the price of the book"],
    },
    quantity: {
        type: Number,
        required: [true, "Please enter the quantity of the book"],
    },
    category: {
        type: String,
        required: [true, "Please enter the author of the book"],
    },
    author: {
        type: String,
        required: [true, "Please enter the author of the book"],
    },
    publisher: {
        type: String,
        required: [true, "Please enter the publisher of the book"],
    },
    image: {
        type: String,
        required: [true, "Please upload the image"],
    },
    description: {
        type: String,
        required: [true, "Please Write the description"],
    },
    css: [
        {
            font: {
                type: Number,
            },
            boxShadowValue: {
                type: String,
            },
        },
    ],
}, {
    timestamps: true,
});
const Book = (0, mongoose_1.model)("Books", bookSchema);
exports.default = Book;
