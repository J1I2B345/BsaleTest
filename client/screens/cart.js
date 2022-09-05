import { getProduct } from "../src/api";
import {
	deleteCartItems,
	getCartItems,
	setCartItems,
} from "../src/localStorage";
import { parseRequestUrl, rerender } from "../src/utils";

const addToCart = (item, forceUpdate = false) => {
	let cartItems = getCartItems();
	const existItem = cartItems.find((x) => x.id == item.id);
	if (existItem) {
		if (forceUpdate) {
			cartItems = cartItems.map((x) => (x.id == existItem.id ? item : x));
		}
	} else {
		cartItems = [...cartItems, item];
	}
	setCartItems(cartItems);
	if (forceUpdate) {
		rerender(Cart);
	}
};
const removeFromCart = (id) => {
	setCartItems(getCartItems().filter((x) => x.id != id));
	if (id === parseRequestUrl().id) {
		document.location.hash = "/cart";
	} else {
		rerender(Cart);
	}
};

const Cart = {
	after_render: () => {
		const qtySelects = document.getElementsByClassName("qty-select");
		console.log(qtySelects);
		Array.from(qtySelects).forEach((qtySelect) => {
			console.log(qtySelects, qtySelect);
			qtySelect.addEventListener("change", (e) => {
				const item = getCartItems().find((x) => x.id == qtySelect.id);
				addToCart({ ...item, qty: Number(e.target.value) }, true);
			});
		});
		const deleteButtons = document.getElementsByClassName("delete-button");
		Array.from(deleteButtons).forEach((deleteButton) => {
			deleteButton.addEventListener("click", () => {
				removeFromCart(deleteButton.id);
			});
		});
		document.getElementById("checkout-button").addEventListener("click", () => {
			alert("Finalizaste la compra!");
		});
	},
	render: async () => {
		const request = parseRequestUrl();
		const stock = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
		if (request.id) {
			const product = await getProduct(request.id);
			addToCart({ ...product.data, qty: 1 });
		}
		const cartItems = getCartItems();
		console.log(cartItems);
		return `
    <div class="content cart">
      <div class="cart-list">
        <ul class="cart-list-container">
          <li>
            <h3>Carrito de compras</h3>
            <div>Precio</div>
          </li>
          ${
						cartItems.length === 0
							? '<div>El carrito esta vacío. <a href="/#/">Volver al home</a>'
							: cartItems
									.map(
										(item) => `
            <li>
              <div class="cart-image">
                <img src="${item.url_image}" alt="${item.name}" />
              </div>
              <div class="cart-name">
                <div>
                  <a href="/#/product/${item.id}">
                    ${item.name}
                  </a>
                </div>
                <div>
                  Cantidad: 
                  <select class="qty-select" id="${item.id}">
                  ${stock.map((x) =>
										item.qty === x + 1
											? `<option selected value="${x + 1}">${x + 1}</option>`
											: `<option  value="${x + 1}">${x + 1}</option>`
									)}  
                  </select>
                  <button type="button" class="delete-button" id="${item.id}">
                    Delete
                  </button>
                </div>
              </div>
              <div class="cart-price">
                $${item.price}
              </div>
            </li>
            `
									)
									.join("\n")
					} 
        </ul>
      </div>
      <div class="cart-action">
          <h3>
            Subtotal (${cartItems.reduce((a, c) => a + c.qty, 0)} items)
            :
            $${cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
          </h3>
          <button id="checkout-button" class="primary fw">
            Finalizar la compra
          </button>
      </div>
    </div>
    `;
	},
};

export default Cart;
