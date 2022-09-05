const { Router } = require("express");
const router = Router();
const { product, category: Category } = require("../db/db");
const axios = require("axios");

router.get("/", async (req, res) => {
	const { category } = req.query;
	try {
		if (!category) {
			const products = await product.findAll({});
			if (products.length) return res.json(products);
			return res.status(404).json({ error: "No hay productos que mostrar" });
		}
		if (category) {
			const products = await product.findAll({
				include: [
					{
						model: Category,
						as: "categoryId",
						attributes: ["name"],
					},
				],
			});
			const productsCategory = products.filter(
				(product) => product.categoryId.name === category.trim()
			);
			if (productsCategory.length) return res.json(productsCategory);
			return res
				.status(404)
				.json({ error: "No hay productos de esta categoría" });
		}
	} catch (e) {
		res.status(400).json({ error: e.message });
	}
});

router.get("/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const productFound = await product.findOne({
			where: { id: Number(id) },
			include: [
				{
					model: Category,
					as: "categoryId",
					attributes: ["name"],
				},
			],
		});

		if (productFound) return res.json(productFound);
		else return res.status(404).json({ error: "No se encontró el producto" });
	} catch (e) {
		res.status(400).json({ error: e.message });
	}
});

module.exports = router;
