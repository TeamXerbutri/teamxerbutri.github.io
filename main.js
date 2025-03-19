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

			let route = location.href;

			if(route.includes("geef=")) {
				const subject = route.split("geef=")[1].split("&")[0].toLowerCase();
				route = "/avontuur/" + subject;
			}
			else if (window.location.pathname.includes(".php")) {
				route = "/";
			}
			else if (window.location.pathname.length > 1)
				route = "/" + window.location.pathname.toLowerCase().replace("/", "")

			sessionStorage.redirect = route;
		}

		(function () {
			const redirect = sessionStorage.redirect;
			delete sessionStorage.redirect;
			if (redirect && redirect !== location.href) {
				history.replaceState(null, null, redirect); // TODO check if this is the correct way to do this I might want pushState
			}
		})();
	}

	function init() {
		// load image
		document.getElementById("tx").src = `${txLogo}`;

		manipulateHref();

		navState.initState();
	}
})();