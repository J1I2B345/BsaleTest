import { parseRequestUrl } from "../src/utils";

const Header = {
	render: () => {
		const { value } = parseRequestUrl();
		return `
        <div class="brand">
        <button id= "aside-open-button"> 
             &#9776;
        </button>  
        <a href="/#/"> Bsale</a> 
        `;
	},
};

export default Header;
