import { parseRequestUrl } from "../src/utils";

const Header = {
	render: () => {
		let value = "";
		const request = parseRequestUrl();
		if (request.name === "name") {
			value = request.value;
		}
		return `
        <div class="brand">
            <button id= "aside-open-button"> 
                 &#9776;
            </button>  
            <a href="/#/"> Bsale</a>
        </div>
        <div class="search"> 
            <form class="search-form" id= "search-form"> 
                <input type="text" name="q" id="q" value= "${value || ""}" />
                <button type="submit"> <i class="fa-sharp fa-solid fa-magnifying-glass"></i></button>
            </form>
        </div>
        <div>
            <a href="/#/cart"><i class="fa-solid fa-cart-shopping"></i></a>
        </div>
        `;
	},
	after_render: () => {
		document
			.getElementById("search-form")
			.addEventListener("submit", async (e) => {
				e.preventDefault();
				let value = document.getElementById("q").value;
				if (value.trim() !== "") {
					const searchKeyword = value;
					document.location.hash = `/?name=${searchKeyword}`;
				}
			});
		document
			.getElementById("aside-open-button")
			.addEventListener("click", async () => {
				document.getElementById("aside-container").classList.add("open");
			});
	},
};

export default Header;
