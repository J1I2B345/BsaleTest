const { Router } = require("express");
const router = Router();
const { product, category } = require("../db/db");

router.get("/get", async (req, res) => {
	try {
		let categories = await product.findAll({
			include: [
				{
					model: category,
					as: "categoryId",
					attributes: ["name"],
				},
			],
		});
		res.json(categories);
	} catch (e) {
		res.status(400).json(e.message);
	}
});

module.exports = router;
