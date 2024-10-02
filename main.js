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

			// avontuur => I need this stuff IN the 404!  
			if(window.location.href.includes("geef=")) {
				// extract route
				const last = window.location.href.split("geef=")[1].split("&")[0].toLowerCase();
				console.log("last", last);

				window.location.href = "/#avontuur/" + last;
			}
			else if (window.location.pathname.includes(".php")) {
				// all other routes go to home.
				window.location.href = "/";
			}
			
			// mimmick redirecting behaviour of github pages. It strips off the query AND any hash
			else if (window.location.pathname.length > 1) 
				window.location.href = "/#" + window.location.pathname.toLowerCase().replace("/", "")
			
		
			
			
		}
		
		// TODO routing table? I need solution for:
		// - vier/xerbutri.php
		// - vier/bruggen.php or verlaten or whatever
		// - old links like vier/verdwenen/info.php?geef=StM&lang=1 need a table old=>new
		// 

		if (window.location.hash.length > 1) {
			const path = window.location.hash.replace("#", "")
			history.pushState({page: 1}, "", "/" + path)
		}
	}

	function init() {
		// load image
		document.getElementById("tx").src = `${txLogo}`;

		manipulateHref();

		navState.initState();
	}
})();