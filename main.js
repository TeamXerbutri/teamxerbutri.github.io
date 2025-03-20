import "./style.css"
import txLogo from "./assets/images/tx.gif"
import {stateContext} from "./assets/js/statemachine.js";

let navState = new stateContext();

(function () {

	document.addEventListener("DOMContentLoaded", init);

	// github pages 404 work-around
	function manipulateHref() {
		// exclude from production
		if (import.meta.env.DEV) {
			console.warn("dev mode");
			 
			if(window.location.href.includes("geef=")) {
				// extract route (old VdF route = vdf2, brug-ks =barsg, rail-ks = d2516)
				const route = window.location.href.split("geef=")[1].split("&")[0].toLowerCase();
				window.location.href = "/#avontuur/" + route;
			}
			else if (window.location.pathname.includes(".php")) {
				// all other routes go to home.
				window.location.href = "/";
			}
			else if (window.location.pathname.length > 1) // mimmick redirecting behaviour of github pages. It strips off the query AND any hash 
				window.location.href = "/#" + window.location.pathname.toLowerCase().replace("/", "")
		}

		if (window.location.hash.length > 1) {
			const path = window.location.hash.replace("#", "")
			history.pushState({page: 1}, "", "/" + path)
		}
	}

	function init() {
		manipulateHref();
		navState.initState();
	}
})();