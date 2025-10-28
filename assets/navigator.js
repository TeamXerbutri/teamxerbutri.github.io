import {loadShell} from "./shell/shell.js";
import {apiBasePath} from "./config.js";
import {lang} from "./language.js";

// TODO: The idea is to store the current state as pathname in the browser.
// TODO: rethink my strategies. My website is not deep! At the entrance (404), instead of using redirect via sessionstorage, just load the correct page directly and redirect to the correct path (by changing pathname and go!)

// DOM-dependent
export const initNavigator = async () => {
	registerPages();
	await getInitialPage();
	loadPage();
}

// TODO This needs to be a better function, filtering hashes and all. See 404.html script as well.
export const currentPage = () => document.location.pathname;

const registerPages = () => {
	window.pageEvents = {
		navigateTo,
		navigateBack
	}
}

// back button support
window.addEventListener("popstate", (event) => {
	loadPage();
})

const navigateTo = (path, data) => {
	history.pushState(data, null, path);
	loadPage();
}

// TODO I can load a page.
const loadPage = () => {
	const path = currentPage();
	switch (path) {
		case "map":
			loadShell(); //TODO loadMap();
			break;
		default:
			loadShell();
			break;
	}
}
const navigateBack = () => {
	history.back()
};

// TODO => split reloading (due to language change) from routing. Please use events for that!
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
					// TODO: Need to update the path here!
					const current = `${category}-${routeId}`;
					history.replaceState(null, null, current);
					return;
				}

				await handleBlogNotFound(routeId);
			} else if (redirect === "map") { //TODO Wanneer is een redirect OOIT map?
				const current = "map";
				history.replaceState(null, null, current);
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
				const current = `${category}-${routeId}`;
				history.replaceState(null, null, current);
				return;
			}
		}
		const current = `${category}-${routeId}`;
		history.replaceState(null, null, current);

	} catch (error) {
		console.error(`An error occured in handleBlogNotFound: ${error}`);
		const current = `${category}-${routeId}`;
		history.replaceState(null, null, current);
	}
}

const getCategory = async (routeId) => {
	const response = await fetch(`${apiBasePath()}/blogs.${lang()}.json`);
	const blogs = await response.json();
	return blogs[routeId];
}
