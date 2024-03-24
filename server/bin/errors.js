"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class APIError extends Error {
    /**
     * @param {string} message
     * @param {number} statusCode
     */
    constructor(message, statusCode) {
        super(message);
        super.name = "APIError";
        this.statusCode = statusCode;
    }
}
exports.APIError = APIError;
const validationError = () => new APIError("Validation failed.", 400);
exports.validationError = validationError;
const quantityError = () => new APIError("Invalid quantity requested or book out of stock", 422);
exports.quantityError = quantityError;
const searchError = () => new APIError("Name is required", 400);
exports.searchError = searchError;
const cartUserError = () => new APIError("UserId is required", 400);
exports.cartUserError = cartUserError;
