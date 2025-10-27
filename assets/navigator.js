import {loadShell} from "./shell/shell.js";
import {apiBasePath} from "./config.js";
import {lang} from "./language.js";
let current = "home";
let txHistory = [];
let currentIndex = 0;

// DOM-dependent
export const initNavigator = async () => {
	registerPages();
	await getInitialPage();
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

const loadPage = (page, data) => {
	if (page === current) {
		return;
	}
	
	// TODO refactoring to use history API of DOM
	history.pushState(data, null, page);

	// navigation logic
	// if the txHistory length > currentIndex + 1, I need to cut off the future txHistory
	if (txHistory.length > currentIndex + 1) {
		console.warn("slicing txHistory")
		txHistory = txHistory.slice(0, currentIndex + 1);
	}

	let length = txHistory.push(current);
	currentIndex = length - 1;

	setCurrentPage(page);
	loadThisPage();
}
const navigateBack = () => {
	if (txHistory.length < 2) {
		current = "home";
		loadThisPage();
		txHistory.push(current);
		history.pushState(null, null, current);
		currentIndex = txHistory.length - 1;
		return;
	}

	current = txHistory[currentIndex];

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
		
		if (redirect !== undefined && redirect.length > 0) {
			if (redirect.startsWith("avontuur/")) {
				const routeId = redirect.split("/")[1];
				const category = await getCategory(routeId);
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
		if (routes[routeId] !== undefined) {
			routeId = routes[routeId];
			const category = await getCategory(routeId);
			
			if (category !== undefined) {
				current = `${category}-${routeId}`;
				return;
			}
		}
		current = "xerbutri-404";

	} catch (error) {
		console.error(`An error occured in handleBlogNotFound: ${error}`);
		current = "xerbutri-404";
	}
}

const getCategory = async (routeId) => {
	const response = await fetch(`${apiBasePath()}/blogs.${lang()}.json`);
	const blogs = await response.json();
	return blogs[routeId];
}
