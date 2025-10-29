import {loadShell} from "./shell/shell.js";
import {apiBasePath} from "./config.js";
import {lang} from "./language.js";
import {loadMap} from "./map/map.js";

export const initNavigator = () => {
	registerPages();
}

export const currentPage = () => {
	let path = window.location.pathname.replace(/^\/+/, '');
	
	if(!path || path.length < 2 || path === "/vijf" )
		path = "home";
	
	return path;
}

const registerPages = () => {
	window.pageEvents = {
		navigateTo,
		navigateBack
	}
}

// back button support
window.addEventListener("popstate", () => {
	loadPage();
})

const navigateTo = (path, data) => {
	history.pushState(data, null, path);
	loadPage();
}

const loadPage = () => {
	const path = currentPage();
	switch (path) {
		case "map":
			loadMap();
			break;
		default:
			loadShell();
			break;
	}
}

const navigateBack = () => {
	history.back();
	loadPage();
};

// TODO => split reloading (due to language change) from routing. Please use events for that!
export const loadThisPage = () => {
	loadPage();
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
				replacePath(current);
				return;
			}
		}
		const current = "xerbutri-404";
		replacePath(current);

	} catch (error) {
		console.error(`An error occured in handleBlogNotFound: ${error}`);
		const current = "xerbutri-404";
		replacePath(current);
	}
}

const getCategory = async (routeId) => {
	const response = await fetch(`${apiBasePath()}/blogs.${lang()}.json`);
	const blogs = await response.json();
	return blogs[routeId];
}


export const initialPageLoad = () => {
	
	if (window.location.pathname.length < 2) {
		loadPage();
		return;
	}
	
	validatePath().then(() => {loadPage()});
}

const validatePath = async () => {
	let route = window.location.pathname;

	if (location.href.includes("geef=")) {
		const subject = location.href.split("geef=")[1].split("&")[0].toLowerCase();
		await handleOldAdventureRoute(subject);
		return;
	}
	
	if (route.includes(".php")) {
		route = "";
		replacePath(route);
		return;
	} 
		
	const segments = route.split('/');
	
	if (segments.count <= 2) {
		return;
	}

	if (route.includes("spoorkrtbenelux.gif")) {
		route = "map";
		replacePath(route);
		return;
	}

	if (route.startsWith("/avontuur")) {
		const subject = route.split("/").pop().toLowerCase();
		await handleOldAdventureRoute(subject);
		return;
	}
	
	// fallback	
	route = route.toLowerCase().replace("/", "");
	replacePath(route);
}

const handleOldAdventureRoute = async (routeId) => {
		const category = await getCategory(routeId);
		
		if (category !== undefined) {
			const current = `${category}-${routeId}`;
			replacePath(current);
			return;
		}

		await handleBlogNotFound(routeId);
}

const replacePath = (newPath) => {
	const l = window.location;
	const repo = "";
	history.replaceState(null, null, l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') + repo + '/' + newPath);
}
