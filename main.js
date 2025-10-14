import "./style.css"
import {domLoaded} from "./assets/program.js";
import {inject} from "@vercel/analytics";
import {initLanguage} from "./assets/language.js";

inject();
console.time("index");
console.time("index-loaded");
initLanguage();

(function () {
	
	document.addEventListener("DOMContentLoaded", init);

	// github pages 404 work-around
	function manipulateHref() {
		// exclude from production
				
		if (import.meta.env.DEV) {
			console.time("manipulateHref");
			console.warn("dev mode");

			//TODO: or hash? or query param? or is this slash?
			if (window.location.pathname.length <= 1) {
				return;
			}

			let route = location.href;

			if(route.includes("geef=")) {
				const subject = route.split("geef=")[1].split("&")[0].toLowerCase();
				route = "avontuur/" + subject;
			}
			else if (window.location.pathname.includes(".php")) {
				route = "";
			}
			else if (window.location.pathname.includes("spoorkrtbenelux.gif")) {
				route = "map";
			}
			else if (window.location.pathname.length > 1)
				route = window.location.pathname.toLowerCase().replace("/", "");

			sessionStorage.redirect = route;
		}
		console.timeEnd("manipulateHref");
	}

	function init() {
		manipulateHref();
		
		domLoaded();
	}
})();