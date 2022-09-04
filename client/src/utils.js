//get info from URL
export const parseRequestUrl = () => {
	//get the url => if it has query this would give an array with the two pieces
	// => 0:["/"] => 1: ["category=pisco"]
	//the first piece would be saved in address the second one in queryString

	const address = document.location.hash.slice(1).split("?")[0];
	const queryString =
		document.location.hash.slice(1).split("?").length === 2
			? document.location.hash.slice(1).split("?")[1]
			: "";

	//url is equal to the address or '/' if undefined
	const url = address.toLowerCase() || "/";
	// if the url has more than one /, would return an array of more than one position
	// url = /product/:id
	// r = ["product", ":id"]
	const r = url.split("/");
	//if the url was like the line 4 => q= ["category", "pisco"]
	const q = queryString.split("=");
	return {
		//from url
		resource: r[1],
		id: r[2],
		//from query
		name: q[0],
		value: q[1],
	};
};

//rerender the component if needed
export const rerender = async (component) => {
	document.getElementById("main-container").innerHTML =
		await component.render();

	//this would act like "component Did Mount"
	await component.after_render();
};
