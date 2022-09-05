import axios from "axios";

export const getProducts = async () => {
	let products = await axios.get("http://localhost:3010/api/products");
	return products;
};

export const getProduct = async (id) => {
	let product = await axios.get(`http://localhost:3010/api/products/${id}`);
	return product;
};
