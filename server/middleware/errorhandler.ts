import mongoose from "mongoose";
import { APIError } from "../errors";
import { Request, Response, NextFunction } from "express";

const errorhandler = (
	err: any,
	req: Request,
	res: Response,
	next: NextFunction
): Response => {
	if (err instanceof APIError) {
		return res.status(err.statusCode).json({
			message: err.message,
			stackTrace: err.stack,
		});
	}

	console.log(err);

	return res.status(500).json({
		message: "UnExpected Error, try to shsmo.",
	});

	/*
	// console.log(err);
	const statusCode = res.statusCode ?? 500;
	switch (statusCode) {
		case 400:
			return res.status(400).json({
				title: "Validation failed",
				message: err.message,
				stackTrace: err.stack,
			});
		case 401:
			return res.status(401).json({
				title: "Not Authorized",
				message: err.message,
				stackTrace: err.stack,
			});
		case 403:
			return res.status(403).json({
				title: "Forbidden",
				message: err.message,
				stackTrace: err.stack,
			});
		case 404:
			return res.status(404).json({
				title: "Not Found",
				message: err.message,
				stackTrace: err.stack,
			});

		case 500:
			return res.status(500).json({
				title: "Internal Server Error",
				message: err.message,
				stackTrace: err.stack,
			});

		default:
			console.log("No errors");
			break;
	}
	res.json();*/
};

export default errorhandler;
