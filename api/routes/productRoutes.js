const { Router } = require("express");
const router = Router();
const { product, category: Category } = require("../db/db");

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
			const products = await product.findAll({});
			const productsFiltered = products.filter((e) =>
				e.name.toLowerCase().includes(name.toLowerCase())
			);
			if (productsFiltered.length) return res.json(productsFiltered);
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
