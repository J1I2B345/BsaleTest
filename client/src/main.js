function button() {
	alert("hola!");
}

let boton = document.getElementById("button");
let index = 1;
boton.addEventListener("click", () => {
	index === 1
		? (boton.innerText = `Tocaste el botón ${index} vez`)
		: (boton.innerText = `Tocaste el botón ${index} veces`);
	index++;
});
