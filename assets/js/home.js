import {createBlogObject} from "./objectfactory.js"
import {initFilter} from "./indexfilter.js";
import {hideBackToTop, showBackToTop } from "./backtotop.js";
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
<a id="back-to-top" href="#oi">^</a>`

	const header = `<h1>Team Xerbutri</h1>
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

	function initViewportOptions() {
		let viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

		if (viewportWidth <= 755) {
			// TODO Does nothing at the moment
		}
	}

	translator.load().then(() => {
		setTranslatedContent();
	}).catch((error) => {
		console.error(`An error occured in getting the translations: ${error}`);
	});

	// UI stuff

	initViewportOptions();
	initializeMenu();

	onresize = (event) => {
		let viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

		if (viewportWidth <= 755) {
			initViewportOptions();
		}

		if (viewportWidth > 755) {
			// TODO Does nothing at the moment
		}
	}

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
				objectFactory(value);
			},
			function (error) {
				console.error(error);
			}
		);

		// Builds the objects
		function objectFactory(subjects) {
			const objectContainer = document.getElementById("oc");
			for (let i in subjects) {
				let displayObject = createBlogObject(translator, subjects[i], i);

				objectContainer.appendChild(displayObject);
			}
		}

		initFilter(translator);

		//TODO Set the right language at some point
		document
			.querySelector('meta[name="description"]')
			.setAttribute("content", "Team Xerbutri explores abandoned buildings, railway tunnels and bridges. The website is about urban exploring, enjoy the pictures.");
		document.title = "Xerbutri Urban Exploring";
	}
}

	