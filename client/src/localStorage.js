//get all the items from the cart
export const getCartItems = () => {
	const cartItems = localStorage.getItem("cartItems")
		? JSON.parse(localStorage.getItem("cartItems"))
		: [];
	return cartItems;
};

// to add items to the cart
export const setCartItems = (cartItems) => {
	localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

//when the user finished the order and pay
export const deleteCartItems = () => {
	localStorage.removeItem("cartItems");
};
