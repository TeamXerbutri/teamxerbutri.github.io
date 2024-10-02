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
			window.location.href = '/#' + window.location.pathname.toLowerCase().replace('/', '')
			
			console.log(window.location);
			// avontuur
			if(window.location.href.includes('geef=')) {
				// extract route
				const last = window.location.href.split('geef=')[1].split("&")[0].toLowerCase();
				console.log('last', last);
				//window.location.href = 'avontuur/' + last;
				history.pushState({page: 1}, "", 'avontuur/' + last);
				return;
			}
			
		}
		
		// TODO routing table? I need solution for:
		// - vier/xerbutri.php
		// - vier/bruggen.php or verlaten or whatever
		// - old links like vier/verdwenen/info.php?geef=StM&lang=1 need a table old=>new
		// 
		
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