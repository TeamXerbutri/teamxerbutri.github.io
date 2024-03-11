import '../avontuur/style.css'
import txLogo from '../assets/images/tx.gif'
import {
	hideBackToTop,
	hideContactPopover,
	hideMenu,
	hidePrivacyDialog,
	showContactPopover,
	showMenu,
	showPrivacyDialog
} from '../assets/js/header.js'
import {initBlog} from "../assets/js/blog.js";
import {stateContext} from "../assets/js/statemachine.js";

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
		hidePrivacyDialog();
		hideContactPopover();
		hideBackToTop();
		document.addEventListener("click", hideMenu);
		document.addEventListener("click", hidePrivacyDialog);
		document.addEventListener("click", hideContactPopover);
		document.getElementById("menu").addEventListener("click", showMenu);
		document.getElementById("contact").addEventListener("click", showContactPopover);
		//document.getElementById("privacy").addEventListener("click", showPrivacyDialog);
		// navState.initState();
		initBlog();
		//ToDo I am not sure what to do with route const. I need to add onclicks at hrefs
	}
})();