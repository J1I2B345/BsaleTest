const { Router } = require("express");
const router = Router();
const { product, category: Category } = require("../db/db");
const axios = require("axios");

router.get("/detail/:id", async (req, res) => {
	const { category } = req.query;

	try {
		const products = await product.findAll({
			include: [
				{
					model: Category,
					as: "categoryId",
					attributes: ["name"],
				},
			],
		});

		if (category) {
			const productsCategory = products.filter(
				(product) => product.categoryId.name === category.trim()
			);
			if (productsCategory.length) return res.json(productsCategory);
			else
				return res
					.status(404)
					.json({ error: "No hay productos con esta categoría" });
		}
		return res.json(products);
	} catch (e) {
		res.status(400).json({ error: e.message });
	}
});

module.exports = router;
