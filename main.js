import './style.css'
import txLogo from './assets/images/tx.gif'
import {
	hideBackToTop,
	hideContactModal,
	hideMenu,
	hidePrivacyModal,
	showContactModal,
	showMenu,
	showPrivacyModal
} from './assets/js/header.js'
import {stateContext} from "./assets/js/statemachine";

let navState = new stateContext();
const route = (event) => {
	event = event || window.event; // get window.event if event argument not provided
	event.preventDefault();
	// window.history.pushState(state, unused, target link);
	window.history.pushState({}, "", event.target.href);
	navState.navigate();
};

(function () {
	document.addEventListener('DOMContentLoaded', init);

	function init() {
		// load image
		document.getElementById("tx").src = `${txLogo}`;

		// set events
		hidePrivacyModal();
		hideContactModal();
		hideBackToTop();
		document.addEventListener("click", hideMenu);
		document.addEventListener("click", hidePrivacyModal);
		document.addEventListener("click", hideContactModal);
		document.getElementById("menu").addEventListener("click", showMenu);
		document.getElementById("contact").addEventListener("click", showContactModal);
		document.getElementById("privacy").addEventListener("click", showPrivacyModal);
		navState.initState();
		//ToDo I am not sure what to do with route const. I need to add onclicks at hrefs
	}
})();