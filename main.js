import './style.css'
import txLogo from './assets/images/tx.gif'

import {stateContext} from "./assets/js/statemachine.js";

let navState = new stateContext();


(function () {

	document.addEventListener('DOMContentLoaded', init);

	// github pages 404 work-around
	function manipulateHref() {
		// exclude from production
		if (import.meta.env.DEV) {
			console.warn('dev mode');
						
			return;
		}
		
		if (window.location.hash.length > 1) {
			const hashParts = window.location.hash.split('#');
			const path = hashParts.slice(1).join('#').toLowerCase();
			history.pushState({page: 1}, "", '/' + path);
		}
	}

	function init() {
		// load image
		document.getElementById("tx").src = `${txLogo}`;

		manipulateHref();

		navState.initState();
	}
})();