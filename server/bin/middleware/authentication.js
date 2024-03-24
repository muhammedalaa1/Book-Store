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
Object.defineProperty(exports, "__esModule", { value: true });
const jwtToken_1 = require("../utils/jwtToken");
const errors_1 = require("../errors");
const cookie_1 = __importDefault(require("cookie"));
exports.auth = function (req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.headers.cookie)
            return next();
        const cookies = cookie_1.default.parse((_a = req.headers.cookie) !== null && _a !== void 0 ? _a : "");
        const token = cookies[process.env.AUTH_COOKIE];
        if (!token)
            return next();
        req.user = yield jwtToken_1.findUserByToken(token);
        next();
    });
};
exports.isLogged = function (LoggedIn, path = "/") {
    return (req, res, next) => {
        if (!!req.user === LoggedIn)
            return next();
        if (typeof path === "string")
            res.redirect(path);
        else
            throw path;
    };
};
exports.allowAdmin = function (role) {
    return (req, res, next) => {
        if (!req.user)
            throw new errors_1.APIError("You are not logged in ", 400);
        if (req.user.role !== "admin")
            throw new errors_1.APIError("You are not allowed to access this feature", 400);
        return next();
    };
};
