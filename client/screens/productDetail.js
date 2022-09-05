import { parseRequestUrl } from "../src/utils";
import axios from "axios";
import { getProduct } from "../src/api";

const ProductDetail = {
	render: async () => {
		const request = parseRequestUrl();
		let product = await getProduct(request.id);

		if (product.error) {
			return `<div> ${product.error}</div>`;
		}
		product = product.data;
		return `
        <div class="content">
            <div class="back-to-result">
                <a href="/#/">Back to result </a>
            </div>
            <div class="details">
                <div class="details-image">
                    <img src="${product.url_image}" alt="${product.name}" />
                </div>
                <div class="details-info">
                    <ul>
                      <li>
                        <h1>${product.name}</h1>
                      </li>
                    </ul>
                </div>
                <div class="details-action">
                    <ul>
                      <li>
                        Price: $${product.price}
                      </li>
                      <li>
                          <button id="add-button" class="fw primary">Add to Cart </div>
                    </ul>
                </div>
            </div>
        </div>
        `;
	},
	after_render: () => {
		const request = parseRequestUrl();
		document.getElementById("add-button").addEventListener("click", () => {
			document.location.hash = `/cart/${request.id}`;
		});
	},
};

export default ProductDetail;
