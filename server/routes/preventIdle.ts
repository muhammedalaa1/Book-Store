import express from "express";
const router = express.Router();

router.route("/").get((req, res) => {
	res.status(204).end();
});

export default router;
