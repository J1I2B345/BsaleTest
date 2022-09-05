import { getCategories } from "../src/api";

const Aside = {
	render: async () => {
		let categories = await getCategories();
		return `
        <div class="aside-header"> 
            <div> Categorías</div>
            <button class="aside-close-button" id="aside-close-button">x</button>
        </div>
        <div class="aside-body">
            <ul class="categories">
				<li>
				<a href="/#/"> todo
                <span> <i class="fa fa-chevron-right"></i></span>
                </a>  
				</li>
                ${categories.data
									.map(
										(e) => `<li>
                <a href="/#/?category=${e.id}"> ${e.name}
                <span> <i class="fa fa-chevron-right"></i></span>
                </a>  
                </li>
                `
									)
									.join("\n")} 
        `;
	},
	after_render: async () => {
		document.getElementById("aside-container").classList.remove("open");
		document
			.getElementById("aside-close-button")
			.addEventListener("click", async () => {
				document.getElementById("aside-container").classList.remove("open");
			});
	},
};

export default Aside;
