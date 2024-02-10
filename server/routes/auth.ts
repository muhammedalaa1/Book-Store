import express from "express";
const router = express.Router();
import {
	Register,
	Login,
	Logout,
	getAllUsers,
	deleteUser,
} from "../controllers/authController";
import { isLogged } from "../middleware/authentication";
import { APIError } from "../errors";
import { allowAdmin } from "../middleware/authentication";

router.route("/").all((_, res) => res.json(_.user));

router.route("/getUsers").get(allowAdmin("admin"), getAllUsers);
router.route("/deleteUser/:userId").delete(allowAdmin("admin"),deleteUser);

router
	.route("/register")
	.post(isLogged(false, new APIError("You already Logged in ", 400)), Register);

router
	.route("/login")
	.post(isLogged(false, new APIError("You already Logged in ", 400)), Login);

router.route("/logout").all(Logout);

export default router;
