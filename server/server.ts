/// <reference path="./index.d.ts" />

import dotenv from "dotenv";
import express, { Application } from "express";
import cors from "cors";
import errorhandler from "./middleware/errorhandler";
import connectDB from "./config/dbConn";
import booksRouter from "./routes/books";
import { auth } from "./middleware/authentication";
import Auth from "./routes/auth";
dotenv.config();
import type { Request, Response } from "express";

import FloodManager from "./flood";

const flood = new FloodManager({
	times: 10,
	resetTime: 60,
	waitTime: 1500,
	ifFail: (_req: Request, res: Response) => res.sendStatus(429),
	getKey: (req: Request) => req.ip,
});

const app: Application = express();
const PORT: string | number = process.env.PORT || 3500;
app.disable("x-powered-by");

// Connect to DB
connectDB();

// Cross Origin Resource Sharing
app.use(
	cors({
		origin: "*",
		credentials: true,
	})
);

// Built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// Built-in middleware for json
app.use(express.json());

// Assuming you converted ./routes/books to TypeScript, you can use ES6 import.
app.use(flood.middleware());
app.use(auth);
app.use("/api/auth", Auth);
app.use("/api/books", booksRouter);

app.get("/", (_, res) => res.json(_.user));

app.use(errorhandler);
app.listen(PORT, () => {
	console.log(`server is running on port ${PORT}`);
});
