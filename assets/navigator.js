import {loadShell} from "./shell/shell.js";
import {apiBasePath} from "./config.js";
import {lang} from "./language.js";
import {loadMap} from "./map/map.js";
import {get} from "./helpers.js";

export const initNavigator = () => {
	registerEvents();
}

export const currentPage = () => {
	let path = window.location.pathname.replace(/^\/+/, '');

	if (!path || path.length < 2 || path === "/vijf")
		path = "home";

	return path;
}

const registerEvents = () => {
	window.pageEvents = {
		navigateTo,
		navigateBack
	}

	// back button support
	window.addEventListener("popstate", () => {
		loadPage();
	})
}


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
		case "cmsmap":
			import("./cms/cmsmap.js").then(module => {
				module.loadCmsMap();
			});
			break;
		default:
			loadShell();
			break;
	}
}

const navigateBack = () => {
	history.back();
};

// TODO => split reloading (due to language change) from routing. Please use events for that!
export const reloadPage = () => {
	loadPage();
}

const fetchAlternativeRoutes = async () => {
	try {
		const response = await get(`${apiBasePath()}/routes.json`);
		return await response.json();
	} catch (error) {
		console.error(`Error fetching alternative routes: ${error}`);
		return {};
	}
}

const handleBlogNotFound = async (routeId) => {
	if (routeId === "404")
		return;

	try {
		const routes = await fetchAlternativeRoutes();
		if (routes[routeId] !== undefined) {
			const redirectRouteId = routes[routeId];
			const category = await getCategory(redirectRouteId);

			if (category !== undefined) {
				const current = `${category}-${redirectRouteId}`;
				replacePath(current);
				return;
			}
		}
		const current = "xerbutri-404";
		replacePath(current);

	} catch (error) {
		console.error(`An error occurred in handleBlogNotFound: ${error}`);
		const current = "xerbutri-404";
		replacePath(current);
	}
}

const getCategory = async (routeId) => {
	try {
		const response = await get(`${apiBasePath()}/blogs.${lang()}.json`);
		const blogs = await response.json();
		return blogs[routeId];
	} catch (error) {
		console.error(`Error fetching category for ${routeId}. Error: ${error}`);
		return undefined;
	}
}


export const initialPageLoad = () => {

	if (window.location.pathname.length < 2) {
		loadPage();
		return;
	}

		validatePath()
		.then(() => loadPage())
		.catch(err => {
			console.error('Path validation failed:', err);
			const current = "xerbutri-404";
			replacePath(current);
			loadPage();
		});
}

export const validatePath = async () => {
	let route = window.location.pathname;

	if (window.location.href.includes("geef=")) {
		const subject = window.location.href.split("geef=")[1].split("&")[0].toLowerCase();
		await handleOldAdventureRoute(subject);
		return;
	}

	if (route.includes(".php")) {
		route = "";
		replacePath(route);
		return;
	}

	const segments = route.split('/');

	if (segments.length <= 2) {
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
	
	if (window.location.hostname === "teamxerbutri.github.io" && route.startsWith("/cmsmap")) {
		route = "cmsmap";
		replacePath(route);
		return;
	}

	// fallback	
	route = route.toLowerCase().replaceAll("/", "");
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
