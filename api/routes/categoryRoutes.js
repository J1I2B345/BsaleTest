const { Router } = require("express");
const router = Router();
const { category } = require("../db/db");

router.get("/", async (req, res) => {
	try {
		let categories = await category.findAll();
		return res.send(categories);
	} catch (e) {
		res.status(400).json({ error: e.message });
	}
});

module.exports = router;
