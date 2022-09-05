import axios from "axios";

export const getProducts = async (searchKeyword) => {
	if (!searchKeyword) var searchKeyword = "";
	try {
		if (searchKeyword) {
			if (searchKeyword.name === "name") {
				let products = await axios.get(
					`https://backend-ecommerce-bsale.herokuapp.com/api/products?name=${searchKeyword.value}`
				);
				return products;
			}
			if (searchKeyword.name === "category") {
				let products = await axios.get(
					`https://backend-ecommerce-bsale.herokuapp.com/api/products?category=${searchKeyword.value}`
				);
				return products;
			}
		}
		let products = await axios.get(
			"https://backend-ecommerce-bsale.herokuapp.com/api/products"
		);
		return products;
	} catch (e) {
		return { error: e.response.data.message || e.message };
	}
};

export const getProduct = async (id) => {
	try {
		let product = await axios.get(
			`https://backend-ecommerce-bsale.herokuapp.com/api/products/${id}`
		);
		return product;
	} catch (e) {
		return { error: e.response.data.message || e.message };
	}
};

export const getCategories = async () => {
	try {
		let categories = await axios.get(
			`https://backend-ecommerce-bsale.herokuapp.com/api/categories/`
		);
		return categories;
	} catch (e) {
		return { error: e.response.data.message || e.message };
	}
};
