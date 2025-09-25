import {loadShell} from "./shell/shell.js";

let current = "home";
let history = [];
let currentIndex = 0;

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
	if(history.length < 2){
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

