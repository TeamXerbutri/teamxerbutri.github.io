import {loadShell} from "./shell/shell.js";
import {ApiBasePath} from "./config.js";
import {lang} from "./language.js";

let current = "home";
let history = [];
let currentIndex = 0;

// DOM-dependent
export const initNavigator = async () => {
	registerPages();
	await getInitialPage();
	console.log("retrieved initial page:", current);
	loadThisPage();
}

export const currentPage = () => current;

const setCurrentPage = (page) => {
	current = page;
}

// routing via pageEvents TODO detect back button or swiping.
const registerPages = () => {
	window.pageEvents = {
		loadPage,
		navigateBack
	}
}

const loadPage = (page) => {
	if (page === current) {
		return;
	}

	// navigation logic
	// if the history length > currentIndex + 1, I need to cut off the future history
	if (history.length > currentIndex + 1) {
		console.warn("slicing history")
		history = history.slice(0, currentIndex + 1);
	}

	let length = history.push(current);
	currentIndex = length - 1;

	setCurrentPage(page);
	loadThisPage();
}
const navigateBack = () => {
	if (history.length < 2) {
		current = "home";
		loadThisPage();
		history.push(current);
		currentIndex = history.length - 1;
		return;
	}

	current = history[currentIndex];

	currentIndex = currentIndex - 1;
	loadThisPage();
};

export const loadThisPage = () => {
	switch (current) {
		case "map":
			loadShell(); //TODO loadMap();
			break;
		default:
			loadShell();
			break;
	}
}

const getInitialPage = async () => {
	if (window.location.pathname.length > 1) {
		const redirect = sessionStorage.redirect;
		delete sessionStorage.redirect;

		console.log("redirect", redirect);
		console.log("redirect is not href location: ", redirect !== location.href);
		if (redirect !== undefined && redirect.length > 0) {
			if (redirect.startsWith("avontuur/")) {
				const routeId = redirect.split("/")[1];
				console.log("routeId", routeId);
				const category = await getCategory(routeId);
				console.log("category", category);
				if (category !== undefined) {
					current = `${category}-${routeId}`;
					return;
				}

				await handleBlogNotFound(routeId);
			} else if (redirect === "map") {
				current = "map";
			}
		}
	}
}

const fetchAlternativeRoutes = async () => {
	const response = await fetch(`${apiBasePath()}/routes.json`);
	return await response.json();
}

const handleBlogNotFound = async (routeId) => {
	if (routeId === "404") 
		return;
		
	try {
		const routes = await fetchAlternativeRoutes();
		console.log("handleBlogNotFound", routeId, routes);
		if (routes[routeId] !== undefined) {
			routeId = routes[routeId];
			const category = await getCategory(routeId);
			
			if (category !== undefined) {
				current = `${category}-${routeId}`;
				return;
			}
		}
		console.log("moving though here to 404 setBlogNotFound");
		current = "xerbutri-404";

	} catch (error) {
		console.error(`An error occured in handleBlogNotFound: ${error}`);
		current = "xerbutri-404";
	}
}

const getCategory = async (routeId) => {
	const response = await fetch(`${apiBasePath()}/blogs.${lang()}.json`);
	const blogs = await response.json();
	console.log("getCategory", routeId, blogs[routeId]);
	return blogs[routeId];
}

// TODO this is not okay, should be in config I think.
export const apiBasePath = () => {
	const base = window.location.origin ? window.location.origin + '/' : window.location.protocol + '/' + window.location.host + '/';
	return base + ApiBasePath;
}