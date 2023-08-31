const admin = require("firebase-admin");
const serviceAccount = require("../firebase.json");
const multer = require("multer");
import express from "express";
// Initialize Firebase
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	storageBucket: "gs://book-store-9a2ef.appspot.com/",
});
const bucket = admin.storage().bucket();

const upload = multer({
	storage: multer.memoryStorage(),
	limits: {
		fileSize: 5 * 1024 * 1024, // no larger than 5mb
	},
});
export function uploadSingleImage(req, res, next) {
	const uploadTask = upload.single("image");
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

		// Create a new blob in the bucket and upload the file data.
		const blob = bucket.file(req.file.originalname);
		const blobStream = blob.createWriteStream();

		blobStream.on("error", (err) => {
			next(err);
		});

		blobStream.on("finish", () => {
			// The public URL can be used to directly access the file via HTTP.
			const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${
				bucket.name
			}/o/${encodeURI(blob.name)}?alt=media`;
			req.body.image = publicUrl;
			next();
		});

		blobStream.end(req.file.buffer);
	});
}
