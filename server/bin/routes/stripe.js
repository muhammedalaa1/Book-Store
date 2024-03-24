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
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const stripe_1 = __importDefault(require("stripe"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const errors_1 = require("../errors");
dotenv_1.default.config();
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2023-10-16",
});
router.post("/create-checkout-session", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cartItems, userId } = req.body;
    if (!userId || !mongoose_1.default.isValidObjectId(userId))
        throw new errors_1.APIError("Check userId", 400);
    // Format line items correctly
    const line_items = cartItems.books.map((book) => ({
        price_data: {
            currency: "usd",
            product_data: {
                name: book.name,
                images: [book.image],
                description: book.description,
                metadata: {
                    id: book.bookId,
                },
            },
            unit_amount: cartItems.coupon
                ? Math.floor(book.price * 100 * 0.9)
                : Math.floor(book.price * 100),
        },
        quantity: book.quantity,
    }));
    try {
        const session = yield stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            shipping_address_collection: {
                allowed_countries: ["US", "CA", "PS", "EG"],
            },
            shipping_options: [
                {
                    shipping_rate_data: {
                        type: "fixed_amount",
                        fixed_amount: {
                            amount: 0,
                            currency: "usd",
                        },
                        display_name: "Free shipping",
                        // Delivers between 5-7 business days
                        delivery_estimate: {
                            minimum: {
                                unit: "business_day",
                                value: 5,
                            },
                            maximum: {
                                unit: "business_day",
                                value: 7,
                            },
                        },
                    },
                },
                {
                    shipping_rate_data: {
                        type: "fixed_amount",
                        fixed_amount: {
                            amount: 1500,
                            currency: "usd",
                        },
                        display_name: "Next day air",
                        // Delivers in exactly 1 business day
                        delivery_estimate: {
                            minimum: {
                                unit: "business_day",
                                value: 1,
                            },
                            maximum: {
                                unit: "business_day",
                                value: 1,
                            },
                        },
                    },
                },
            ],
            phone_number_collection: {
                enabled: true,
            },
            line_items,
            mode: "payment",
            success_url: "https://book-store-qd6a.vercel.app/Completion",
            cancel_url: "https://book-store-qd6a.vercel.app/Cart",
        });
        res.send({ url: session.url });
    }
    catch (error) {
        console.error("Error creating checkout session:", error);
        res.status(500).send("Error creating checkout session");
    }
}));
exports.default = router;
