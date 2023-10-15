import express from "express";
import * as Controller from "../controllers/booksController";
import { uploadSingleImage } from "../middleware/uploadImage";
import { allowAdmin } from "../middleware/authentication";
const router = express.Router();

router
	.route("/")
	.get(Controller.getAllBooks)
	.post(allowAdmin("admin"), uploadSingleImage, Controller.addBook);

router.route("/Books").get(Controller.getBooksNumber);
router.route("/search").get(Controller.searchBook);
router
	.route("/:bookId")
	.get(Controller.getBook)
	.post(uploadSingleImage, Controller.updateBook)
	.put(Controller.buyBook)
	.delete(allowAdmin("admin"), Controller.deleteBook);

export default router;
