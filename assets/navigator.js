import {loadBlog} from "./shell/blog/blog.js";
import {loadShell} from "./shell/shell.js";

let current = "home";

// DOM-dependent
export const initNavigator = () => {
	registerPages();
	getInitialPage();
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
	}
}
const loadPage = (page) => {
	if (page === current) {
		return;
	}
	
	setCurrentPage(page);
	loadThisPage();
}

const loadThisPage = () => {
	switch (current) {
		case "map":
			loadShell(); //TODO loadMap();
			break;
		default:
			loadShell();
			break;
	}
}
	
const getInitialPage = () => {
	if (window.location.pathname.length > 1) {
		const redirect = sessionStorage.redirect;
		delete sessionStorage.redirect;
		
		if (redirect && redirect !== location.href) {
			// TODO find page / routing table.
			current = redirect;
		}
	}
}

