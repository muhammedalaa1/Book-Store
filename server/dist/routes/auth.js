"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const authController_1 = require("../controllers/authController");
const authentication_1 = require("../middleware/authentication");
const errors_1 = require("../errors");
const authentication_2 = require("../middleware/authentication");
router.route("/").all((_, res) => res.json(_.user));
router.route("/getUsers").get((0, authentication_2.allowAdmin)("admin"), authController_1.getAllUsers);
router.route("/deleteUser/:userId").delete((0, authentication_2.allowAdmin)("admin"), authController_1.deleteUser);
router
    .route("/register")
    .post((0, authentication_1.isLogged)(false, new errors_1.APIError("You already Logged in ", 400)), authController_1.Register);
router
    .route("/login")
    .post((0, authentication_1.isLogged)(false, new errors_1.APIError("You already Logged in ", 400)), authController_1.Login);
router.route("/logout").all(authController_1.Logout);
exports.default = router;
