"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const cartController_1 = require("../controllers/cartController");
router
    .route("/")
    .get(cartController_1.getUserCart)
    .post(cartController_1.createCart)
    .put(cartController_1.decreaseAmount)
    .patch(cartController_1.applyCoupon)
    .delete(cartController_1.clearCart);
exports.default = router;
