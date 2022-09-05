import { parseRequestUrl } from "../src/utils";
import { getProducts } from "../src/api";

const Home = {
	//the first property which fills the main-container
	//this is async because it will request the info to the backend
	render: async () => {
		const { value, name } = parseRequestUrl();
		let searchKeyword;
		let products;
		if (value && name) {
			searchKeyword = { name, value };
		}
		if (searchKeyword) {
			products = await getProducts(searchKeyword);
		} else {
			products = await getProducts();
		}

		if (products.error) {
			return `<div class="product" style="font-size: 3rem"> No existe producto con esas características</div>`;
		} else
			return `
		<ul class="products"> 
		${products.data
			.map(
				(e) => `<li> 
					<div class="product"> 
					<a href="#/product/${e.id}"> 
						<img src=${e.url_image} alt="img_${e.name}"/> 
					</a>
					<div class="product-name"> 
						<a href="#/product/${e.id}"> 
							${e.name}
						</a> 
					</div>
					<div class="product-price"> 
					$${(e.price * (100 - e.discount)) / 100}
					</div>
					</div>
				</li>`
			)
			.join("\n")}
		</ul>
		`;
	},
};

export default Home;

// to show the old price and new price to show the offer/discount
// e.discount !== 0
// 	? `<div>
// 					<p class="discount"> ${e.price}</p>
// 					<h5> ${(e.price * (100 - e.discount)) / 100}</h5>
// 					</div>`
// 	: `<div>
// 					${e.price}
// 					</div>`;
