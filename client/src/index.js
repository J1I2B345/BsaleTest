import Home from "../screens/home";
import Header from "../screens/header";
import Footer from "../screens/footer";
import Aside from "../screens/aside";
import Error404Screen from "../screens/error404";
import { parseRequestUrl } from "./utils";
import ProductDetail from "../screens/productDetail";

//create an object to use it as router
const routes = {
	"/": Home,
	"/product/:id": ProductDetail,
	// "/cart": CartScreen,
};

const router = async () => {
	//when the page is loading the components it should show a Loading Page/component
	//showLoading();

	//get info from the url
	const request = parseRequestUrl();

	//using that info to create the final 'route'
	const parseUrl =
		(request.resource ? `/${request.resource}` : "/") +
		(request.id ? "/:id" : "") +
		(request.verb ? `/${request.verb}` : "");

	//the only that changes is main so if the routes[...] is not defined it means that
	//there is no component to that route so it should show an error
	const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;

	// it render the components in the appropiate container

	//Header
	const header = document.getElementById("header-container");
	header.innerHTML = await Header.render();
	// await Header.after_render();

	// //Aside
	// const aside = document.getElementById("aside-container");
	// aside.innerHTML = await Aside.render();
	// await Aside.after_render();

	//Main/Home
	const main = document.getElementById("main-container");
	main.innerHTML = await screen.render();
	if (screen.after_render) await screen.after_render();

	// //Footer
	// const footer = document.getElementById("footer-container");
	// footer.innerHTML = await Footer.render();
	// if (Footer.after_render) Footer.after_render();

	//when the page is ready the loading should be hide
	//hideLoading();
};

let boton = document.getElementById("button");
let index = 1;
boton.addEventListener("click", () => {
	index === 1
		? (boton.innerText = `Tocaste el botón ${index} vez`)
		: (boton.innerText = `Tocaste el botón ${index} veces`);
	index++;
});

//when the client opens the page the event "load" is activated
window.addEventListener("load", router);
//if the page changes, because there is a new URL, this event is activated
window.addEventListener("hashchange", router);
