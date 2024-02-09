const adventurePath = "/avontuur/index.html";
//TODO Create routes from json or something
// Cant you create an easier way to create the index homepage and use this router to load everything as htmls?
const routes = {
	"/vbmh": {
		template: adventurePath,
		title: "Muggenhoeve",
		category: "gebouw", 
		description: "Muggenhoeve",
	},
	"/l126": {
		template: adventurePath,
		title: "Lijn 126 Condroz",
		category: "spoor",
		description: "Lijn 126 Condroz",
	},
	"/kwh": {
		template: adventurePath,
		title: "Chateau Blanc",
		category: "gebouw",
		description: "TX bezoekt wit kasteel",
	},
	"/skfe": {
		template: adventurePath,
		title: "Koolmijn Lorraine",
		description: "Koolmijn Lorraine",
	},
	"/txatx": {
		template: adventurePath,
		title: "About Us",
		description: "This is the about page",
	},
	"/txaue": {
		template: adventurePath,
		title: "About Urban Exploring",
		description: "About Urban Exploring",
	},
};

const route = (event) => {
	event = event || window.event; // get window.event if event argument not provided
	event.preventDefault();
	// window.history.pushState(state, unused, target link);
	window.history.pushState({}, "", event.target.href);
	locationHandler();
};

const locationHandler = async () => {
	let location = window.location.pathname; // get the url path
	// if the path length is 0, set it to primary page route
	if (location.length == 0) {
		location = "/";
	}
	// get the route object from the urlRoutes object
	const route = routes[location] || routes["404"];
	// get the html from the template
	const html = await fetch(route.template).then((response) => response.text());
	// set the content of the content div to the html
	document.getElementById("content").innerHTML = html;
	// set the title of the document to the title of the route
	document.title = route.title;
	// set the description of the document to the description of the route
	document
		.querySelector('meta[name="description"]')
		.setAttribute("content", route.description);
};

export { route, locationHandler };