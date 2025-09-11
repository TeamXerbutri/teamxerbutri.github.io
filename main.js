import "./style.css"
import {domLoaded, initLanguage} from "./assets/program.js";
import {inject} from "@vercel/analytics";


inject();
console.time("index");
initLanguage();

(function () {

	// TODO: I can set the language BEFORE the DOM is loaded
	document.addEventListener("DOMContentLoaded", init);

	// github pages 404 work-around
	function manipulateHref() {
		// exclude from production
		console.time("manipulateHref");
		if (window.location.pathname.length <= 1) {
			return;
		}
				
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
		console.timeEnd("manipulateHref");
	}

	function init() {
		manipulateHref();
		
		domLoaded();
	}
})();