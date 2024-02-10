/// <reference path="./index.d.ts" />

import dotenv from "dotenv";
import express, { Application } from "express";
import cors from "cors";
import errorhandler from "./middleware/errorhandler";
import connectDB from "./config/dbConn";
import booksRouter from "./routes/books";
import cartRouter from "./routes/cart";
import { auth } from "./middleware/authentication";
import Auth from "./routes/auth";
import http from "http";
import stripeRouter from "./routes/stripe"
dotenv.config();
import type { Request, Response } from "express";
import axios from "axios";
import FloodManager from "./flood";
import Cart from "./model/cart";
const flood = new FloodManager({
	times: 20,
	resetTime: 60,
	waitTime: 1500,
	ifFail: (_req: Request, res: Response) => res.sendStatus(429),
	getKey: (req: Request) => req.ip,
});

const app: Application = express();

const server = http.createServer(app);
const PORT: string | number = process.env.PORT || 3500;
app.disable("x-powered-by");

// Connect to DB
connectDB();
// Cross Origin Resource Sharing
const allowedOrigins = [
	"http://localhost:5173",
	"https://book-stpre.onrender.com",
	"https://book-store-qd6a.vercel.app",
];

app.use(
	cors({
		origin: (origin, callback) => {
			if (!origin) return callback(null, true);
			if (allowedOrigins.indexOf(origin) === -1) {
				const errMsg =
					"The CORS policy for this site does not allow access from the specified Origin.";
				return callback(new Error(errMsg), false);
			}
			return callback(null, true);
		},
		credentials: true,
	})
);

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(auth);
app.use("/api/auth", Auth);
app.use(flood.middleware());

app.use("/api/books", booksRouter);
app.use("/api/cart", cartRouter);
app.use("/api/stripeRouter",stripeRouter);

app.get("/", (_, res) => res.json(_.user));
app.use(errorhandler);
server.listen(PORT, () => {
	console.log(`server is running on port ${PORT}`);
});
setInterval(() => {
	const data = axios.get("https://bookstore-303p.onrender.com/api/auth/");
	console.log(data);
}, 1000 * 60 * 14);
