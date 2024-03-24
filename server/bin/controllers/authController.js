"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const user_1 = __importDefault(require("../model/user"));
const errors_1 = require("../errors");
const jwtToken_1 = require("../utils/jwtToken");
const bcrypt_1 = __importStar(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
exports.Register = express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = bcrypt_1.default.hashSync(req.body.password, 10);
    const { userName, email, password, phone } = req.body;
    if (!userName || !email || !password || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    req.body.password = hashedPassword;
    const exist = yield user_1.default.findOne({
        $or: [
            {
                email: req.body.email,
            },
            {
                phone: req.body.phone,
            },
        ],
    });
    if (exist)
        throw new errors_1.APIError("User Exist", 409);
    let user = yield user_1.default.create(req.body);
    if (!user)
        throw new errors_1.APIError("Failed to create user", 500);
    const token = jwtToken_1.createToken(user);
    res.cookie(process.env.AUTH_COOKIE, token, {
        httpOnly: process.env.NODE_ENV == "production" ? false : true,
        sameSite: process.env.NODE_ENV == "production" ? "none" : "lax",
        path: "/",
        secure: process.env.NODE_ENV == "production",
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30 * 6),
    });
    user = Object.assign(Object.assign({}, user.toObject()), { token });
    res.status(201).json(user);
}));
exports.Login = express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password)
        throw new errors_1.APIError("Check Fields", 400);
    let exist = yield user_1.default.findOne({ email });
    if (!exist)
        throw new errors_1.APIError("There is no account with this email", 400);
    if (!bcrypt_1.compareSync(password, exist.password))
        throw new errors_1.APIError("Invalid Password", 400);
    const token = jwtToken_1.createToken(exist);
    res.cookie(process.env.AUTH_COOKIE, token, {
        httpOnly: true,
        sameSite: process.env.NODE_ENV == "production" ? "none" : "lax",
        path: "/",
        secure: process.env.NODE_ENV == "production",
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30 * 6),
    });
    exist.password = undefined;
    exist = Object.assign(Object.assign({}, exist.toObject()), { token });
    res.status(200).json(exist);
}));
exports.Logout = express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res
        .clearCookie(process.env.AUTH_COOKIE, { sameSite: "none", secure: true })
        .status(200)
        .json({ status: "Logged out" });
}));
exports.getAllUsers = express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_1.default.find();
    const number = yield user_1.default.countDocuments();
    res.status(200).json({ users, number });
}));
exports.deleteUser = express_async_handler_1.default((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.default.isValidObjectId(req.params.userId))
        throw errors_1.validationError();
    let exist = yield user_1.default.findByIdAndDelete(req.params.userId);
    if (!exist)
        throw new errors_1.APIError("There is no account with this id", 404);
    res.status(204).end();
}));
