import { parseRequestUrl } from "../src/utils";
import axios from "axios";
import { getProduct } from "../src/api";

const ProductDetail = {
	render: async () => {
		const request = parseRequestUrl();
		let product = await getProduct(request.id);
		if (product.error) {
			return `<div class="product" style="font-size: 2rem"> ${product.error}</div>`;
		} else {
			product = product.data;
			return `
	      	<div class="content">
	          	<div class="details">
	              	<div class="details-image">
	              	    <img src="${product.url_image}" alt="${product.name}" />
	              	</div>
	              	<div class="details-info">
	              	    <h1>${product.name}</h1>   
                  		<h4>
                  			${product.categoryId.name.toUpperCase()}
                  		</h4>
	              	</div>
	        	</div>
				<div class="checkout-container">
					<div class="details-action">
	            	  	    <ul>
	            	  	      	<li style="text-align: center">
	            	  	        Precio: $${product.price}
	            	  	      	</li>
	            	  	    	<button id="add-button" class="fw primary">Agregar al carrito </div>
	            	  	    </ul>
	            	</div>
				</div>
	      	</div>
	      `;
		}
	},

	after_render: () => {
		const request = parseRequestUrl();
		document.getElementById("add-button").addEventListener("click", () => {
			document.location.hash = `/cart/${request.id}`;
		});
	},
};

export default ProductDetail;
