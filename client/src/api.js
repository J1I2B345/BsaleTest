import axios from "axios";

export const getProducts = async (searchKeyword) => {
	if (!searchKeyword) var searchKeyword = "";
	try {
		if (searchKeyword) {
			if (searchKeyword.name === "name") {
				let products = await axios.get(
					`http://localhost:3010/api/products?name=${searchKeyword.value}`
				);
				return products;
			}
			if (searchKeyword.name === "category") {
				let products = await axios.get(
					`http://localhost:3010/api/products?category=${searchKeyword.value}`
				);
				return products;
			}
		}
		let products = await axios.get("http://localhost:3010/api/products");
		return products;
	} catch (e) {
		return { error: e.message || error.response.data.message };
	}
};

export const getProduct = async (id) => {
	let product = await axios.get(`http://localhost:3010/api/products/${id}`);

	return product;
};

export const getCategories = async () => {
	let categories = await axios.get(`http://localhost:3010/api/categories/`);
	return categories;
};
