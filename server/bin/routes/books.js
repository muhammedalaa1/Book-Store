"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Controller = __importStar(require("../controllers/booksController"));
const uploadImage_1 = require("../middleware/uploadImage");
const authentication_1 = require("../middleware/authentication");
const router = express_1.default.Router();
router
    .route("/")
    .get(Controller.getAllBooks)
    .post(authentication_1.allowAdmin("admin"), uploadImage_1.uploadSingleImage, Controller.addBook);
router.route("/Books").get(Controller.getBooksNumber);
router.route("/search").get(Controller.searchBook);
router
    .route("/:bookId")
    .get(Controller.getBook)
    .patch(uploadImage_1.uploadSingleImage, Controller.updateBook)
    .put(Controller.buyBook)
    .delete(authentication_1.allowAdmin("admin"), Controller.deleteBook);
exports.default = router;
