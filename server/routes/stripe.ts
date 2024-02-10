import express from "express";
const router = express.Router();
import Stripe from 'stripe';
import dotenv from "dotenv";
import { IBook } from "../model/book";
import Cart, { ICart } from "../model/cart";
import mongoose from "mongoose";
import { APIError } from "../errors";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});
router.post('/create-checkout-session', async (req, res) => {
  const { cartItems , userId }: { cartItems: ICart , userId:any } = req.body;
  if (!userId || !mongoose.isValidObjectId(userId))
  throw new APIError("Check userId", 400);
  // Format line items correctly
  const line_items = cartItems.books.map((book) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: book.name,
        images: [book.image], // Convert single image string to array of strings
        description: book.description,
        metadata: {
          id: book.bookId,
        },
      },
      unit_amount: cartItems.coupon ? Math.floor(book.price * 100 * 0.9) : Math.floor(book.price * 100),
    },
    quantity: book.quantity,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
    shipping_address_collection: {
      allowed_countries: ["US", "CA", "PS","EG"],
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
      mode: 'payment',
      success_url: 'http://localhost:5173/Completion',
      cancel_url: 'http://localhost:5173/Cart',
    });
 

    res.send({url: session.url});
    
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).send("Error creating checkout session");
  }
});

export default router;
