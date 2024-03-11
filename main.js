import './style.css'
import txLogo from './assets/images/tx.gif'
import {
	hideBackToTop,
	hideContactPopover,
	hideMenu,
	hidePrivacyDialog,
	showContactPopover,
	showMenu,
	showPrivacyDialog
} from './assets/js/header.js'
import {stateContext} from "./assets/js/statemachine.js";
import {appState} from "./assets/js/appstate.js";

let navState = new stateContext();

const route = (event) => {
	event = event || window.event; // get window.event if event argument not provided
	event.preventDefault();
	// TODO I can get the navigation info here from the id

	window.history.pushState({}, "", event.target.href);
	navState.navigate();
};

//window.route = route;

//let getAllBlogData = fetch("data/index.".concat(appState.language, ".json")).then((response) => response.json());




(function () {
	document.addEventListener('DOMContentLoaded', init);

	function init() {
		// load image
		document.getElementById("tx").src = `${txLogo}`;

		// set events
		hidePrivacyDialog();
		hideContactPopover();
		hideBackToTop();
		document.addEventListener("click", hideMenu);
		document.addEventListener("click", hidePrivacyDialog);
		document.addEventListener("click", hideContactPopover);
		document.getElementById("menu").addEventListener("click", showMenu);
		document.getElementById("contact").addEventListener("click", showContactPopover);
		document.getElementById("privacy").addEventListener("click", showPrivacyDialog);
		navState.initState();
		//window.onpopstate = navState.navigate();
	}
})();