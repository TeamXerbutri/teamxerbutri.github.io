import {createBlogObject} from "./objectfactory"
import {uiState} from "./uistate"
import {hideBackToTop, showBackToTop} from "./header";
import {appState} from "./appState";




// UI state Business logic for filtering
function setDisplayFilter(className, display) {
	let categories = document.getElementsByClassName(className);
	let i;

	for (i = 0; i < categories.length; i++) {
		categories[i].style.display = display;
	}
}

// Builds the objects
function objectFactory(subjects) {
	const objectContainer = document.getElementById('oc');
	for (let i in subjects) {
		let displayObject = createBlogObject(subjects[i]);
		objectContainer.appendChild(displayObject);
	}
}

function filterObjects() {
	if (uiState.hasFilter.bridge) {
		setDisplayFilter('bridge', 'none');
	}
	if (uiState.hasFilter.building) {
		setDisplayFilter('building', 'none');
	}
	if (uiState.hasFilter.rail) {
		setDisplayFilter('rail', 'none');
	}
	if (uiState.hasFilter.tunnel) {
		setDisplayFilter('tunnel', 'none');
	}
}

export function initHome() {

	let getObjects = fetch("data/index.".concat(appState.language, ".json")).then((response) => response.json());
	document.querySelector('#app').innerHTML = `
<div id="oi">
	<div id="oc">
    </div>
</div>
<a id="back-to-top" href="#app">^</a>`
	uiState.hasFilter = {bridge: false, building: false, rail: false, tunnel: false};
	let viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	// fetch the objects
	getObjects.then(
		function (value) {
			objectFactory(value.subjects);
		},
		function (error) {
			errorHandler(error)
		}
	)
	if (window.scrollY >= 200) {
		showBackToTop();
	} else {
		hideBackToTop();
	}
	document
		.querySelector('meta[name="description"]')
		.setAttribute("content", "Team Xerbutri explores abandoned buildings, railway tunnels and bridges. The website is about urban exploring, enjoy the pictures.");
	document.title = "Xerbutri Urban Exploring";
}

	