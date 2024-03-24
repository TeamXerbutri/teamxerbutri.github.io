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

let navState = new stateContext();

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
		if (window.location.hash.length > 1) {
			const path = window.location.hash.replace('#', '')
			history.pushState({ page: 1 }, "", '/' + path)
		}
		navState.initState();
	}
})();