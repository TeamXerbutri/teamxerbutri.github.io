import "./style.css"
import {stateContext} from "./assets/js/statemachine.js";
import {inject} from "@vercel/analytics";

let navState = new stateContext();

inject();

(function () {

	document.addEventListener("DOMContentLoaded", init);

	// github pages 404 work-around
	function manipulateHref() {
		// exclude from production
		if (import.meta.env.DEV) {
			console.warn("dev mode");

			let route = location.href;

			if(route.includes("geef=")) {
				const subject = route.split("geef=")[1].split("&")[0].toLowerCase();
				route = "avontuur/" + subject;
			}
			else if (window.location.pathname.includes(".php")) {
				route = "";
			}
			else if (window.location.pathname.length > 1)
				route = window.location.pathname.toLowerCase().replace("/", "")

			sessionStorage.redirect = route;
		}
	}

	function init() {
		manipulateHref();
		
		// TODO v7 ReThink, going to SessionStorage every time is slow!
		const redirect = sessionStorage.redirect;
		delete sessionStorage.redirect;
		
		let route = "home";
		if (redirect && redirect !== location.href) {
			route = redirect;
			//history.replaceState(null, null, redirect);
		}
		navState.initState(route);
	}
})();