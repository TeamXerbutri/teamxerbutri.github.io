﻿import {createBlogObject} from "./objectfactory.js"
import {initFilter} from "./indexfilter.js";
import {hideBackToTop, showBackToTop} from "./backtotop.js";
import {dotsMenu} from "./icons.js";
import Translator from "./translator.js";
import {initializeMenu} from "./headermenu.js";

// Initializes the home page
export function initHome() {
	let translator = new Translator();

	// Load app

	document.querySelector("#app").innerHTML = `
<div id="oi">
	<div id="tx-filter"></div>
	<div id="oc">
    </div>
</div>
<a id="back-to-top" class="fab" href="#oi">^</a>`

	let subjects;
	
	const header = `<h1 id="header_index">Team Xerbutri</h1>
		<div class="menu-blog dropdown">
		<button class="drop-btn top-nav menu-blog-btn" data-i18n="navigation.menu">${dotsMenu}</button>
			<ul class="menu-blog-content mat-menu" id="menu-blog">
				<li><a href="map" class="mat-menu-item" data-i18n="maps.link">Kaart</a></li>
				<li><a href="avontuur/txatx" class="mat-menu-item" data-i18n="abouttx.link">Over TX</a></li>
				<li><a href="avontuur/txaue" class="mat-menu-item" data-i18n="aboutue.link">Over UE</a></li>
				<li id="contact" class="mat-menu-item" data-i18n="contact.link">Contact</li>
				<li id="privacy" class="mat-menu-item" data-i18n="privacy.link">Privacy</li>
			</ul>
		</div>
		<div id="contactpanel">
			<p data-i18n="contact.content">Contact</p>
		</div>
		<div id="privacypanel">
			<p data-i18n="privacy.content">Privacy</p>
		</div>`

	const headerElem = document.getElementById("header");
	if (headerElem.classList.contains("blog")) {
		headerElem.classList.remove("blog");
		headerElem.innerHTML = header
	}
	if (headerElem.classList.contains("map-header")) {
		headerElem.classList.remove("map-header");
		headerElem.innerHTML = header
	}

	if (!headerElem.classList.contains("home")) {
		headerElem.classList.add("home")
		headerElem.innerHTML = header
	}

	const htmlElement = document.querySelector("html");
	if (htmlElement.classList.contains("map-html")) {
		htmlElement.classList.remove("map-html");
	}

	hideBackToTop();

	translator.load().then(() => {
		setTranslatedContent();
	}).catch((error) => {
		console.error(`An error occured in getting the translations: ${error}`);
	});

	// UI stuff

	initializeMenu();

	window.onscroll = function (ev) {
		if (window.scrollY >= 200) {
			showBackToTop();
		} else {
			hideBackToTop();
		}
	}

	function setTranslatedContent() {

		translator.addMenuOptions();
		// fetch the objects
		translator.fetchHomeData().then(
			function (value) {
				subjects = value;
				// First load.
				const viewWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
				
				let columns = 4;
				if (viewWidth < 500) {
					columns = 2;
				}
				
				let cardHeight =  177;
				if (viewWidth < 765) {
					cardHeight = 123;
				}
				if (viewWidth > 1350) {
					cardHeight = 233;
				}
				
				const viewHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
				
				const rows = Math.ceil(viewHeight / cardHeight);
				let maxObjects = rows * columns;
				
				if (subjects.length < maxObjects) {
					maxObjects = subjects.length;
				}
				
				// I want the first maxObjects to be shown and instantly deleted from the list
				const objectsToShow = subjects.splice(0, maxObjects);
				
				// On scroll I want to load more objects
				window.onscroll = function (ev) {
					objectFactory(subjects);
					subjects = [];
				}
								
				objectFactory(objectsToShow);
			},
			function (error) {
				console.error(error);
			}
		);

		// Builds the objects
		function objectFactory(subjects) {
			const objectContainer = document.getElementById("oc");
						
			for (let i in subjects) {
				let displayObject = createBlogObject(translator, subjects[i]);

				objectContainer.appendChild(displayObject);
			}
		}

		initFilter(translator);
		const filterElement = document.getElementById("tx-filter");

		filterElement.onclick = function () {
			objectFactory(subjects);
			subjects = [];
		}

		//TODO Set the right language at some point
		document
			.querySelector('meta[name="description"]')
			.setAttribute("content", "Team Xerbutri explores abandoned buildings, railway tunnels and bridges. The website is about urban exploring, enjoy the pictures.");
		document.title = "Xerbutri Urban Exploring";
	}
}

	