import express, { Request } from "express";
import multer from "multer";
import ImageKit from "imagekit";
import dotenv from "dotenv";
dotenv.config();

// Initialize ImageKit
const imagekit = new ImageKit({
	publicKey: process.env.PUBLIC_KEY,
	privateKey: process.env.PRIVATE_KEY,
	urlEndpoint: process.env.IMAGEKIT_ENDPOINT,
});

const upload = multer({
	storage: multer.memoryStorage(),
	limits: {
		fileSize: 5 * 1024 * 1024, // no larger than 5mb
	},
});

export function uploadSingleImage(req: Request, res, next) {
	const uploadTask = upload.single("image");
	console.log(req.files);

	uploadTask(req, res, function (err) {
		if (err) {
			return res.send(err);
		}
		if (!req.file) {
			if (req.params.bookId) {
				return next();
			}
			res.status(400).send("No file uploaded.");
			return;
		}

		// Upload the image buffer to ImageKit
		const image = {
			fileName: req.file.originalname,
			file: req.file.buffer.toString("base64"),
		};

		imagekit.upload(image, function (error, result) {
			if (error) {
				next(error);
				return;
			}

			// Use the URL provided by ImageKit
			req.body.image = result.url;
			next();
		});
	});
}
