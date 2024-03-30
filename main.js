import './style.css'
import txLogo from './assets/images/tx.gif'

import {stateContext} from "./assets/js/statemachine.js";

let navState = new stateContext();

(function () {
	document.addEventListener('DOMContentLoaded', init);

	function init() {
		// load image
		document.getElementById("tx").src = `${txLogo}`;
		
		if (window.location.hash.length > 1) {
			const path = window.location.hash.replace('#', '')
			history.pushState({ page: 1 }, "", '/' + path)
		}
		navState.initState();
	}
})();