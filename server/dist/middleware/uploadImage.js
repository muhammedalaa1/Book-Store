"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadSingleImage = void 0;
const multer_1 = __importDefault(require("multer"));
const imagekit_1 = __importDefault(require("imagekit"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Initialize ImageKit
const imagekit = new imagekit_1.default({
    publicKey: process.env.PUBLIC_KEY,
    privateKey: process.env.PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_ENDPOINT,
});
const upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // no larger than 5mb
    },
});
//@ts-nocheck
function uploadSingleImage(req, res, next) {
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
exports.uploadSingleImage = uploadSingleImage;
