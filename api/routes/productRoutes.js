const { Router } = require("express");
const router = Router();
const { product, category: Category } = require("../db/db");
const { Op } = require("sequelize");

router.get("/", async (req, res) => {
	const { category, name } = req.query;
	try {
		if (!category && !name) {
			const products = await product.findAll({});
			if (products.length) return res.json(products);
			return res.status(404).json({ error: "No hay productos que mostrar" });
		}
		if (category) {
			const products = await product.findAll({
				where: { category: Number(category) },
			});
			if (products.length) return res.json(products);
			return res
				.status(404)
				.json({ error: "No hay productos de esta categoría" });
		}
		if (name) {
			const products = await product.findAll({
				where: {
					name: {
						[Op.substring]: [name],
					},
				},
			});
			if (products.length) return res.json(products);
			return res.status(404).json({ error: "No hay productos con ese nombre" });
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
