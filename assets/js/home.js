import {createBlogObject} from "./objectfactory.js"
import {initFilter} from "./indexfilter.js";
import {
	hideBackToTop,
	showBackToTop,
	showMenu,
	hideMenu,
	showMenuItem, uiState
} from "./header.js";
import txLogo from "../images/tx.gif"
import Translator from "./translator.js";

// Initializes the home page
export function initHome() {
	let translator = new Translator();

	// Load app

	document.querySelector("#app").innerHTML = `
<div id="oi">
	<div id="oc">
    </div>
</div>
<a id="back-to-top" href="#oi">^</a>`
	
	const header = `<img alt="Team Xerbutri Logo" id="tx" src="${txLogo}">
		<h1 class="logo">Team Xerbutri</h1>

		<div class="menu" id="menu">
			<a href="map" data-i18n="maps.link">Maps</a>
			<a href="avontuur/txatx" data-i18n="abouttx.link">About TX</a>
			<a href="avontuur/txaue" data-i18n="aboutue.link">About UE</a>
			<a id="contact" data-i18n="contact.link">Contact</a>
			<a id="privacy" data-i18n="privacy.link">Privacy</a>
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
		headerElem.classList.add("home")
		headerElem.innerHTML = header
	}

	if (!headerElem.classList.contains("home")) {
		headerElem.classList.add("home")
		headerElem.innerHTML = header
	}
	
	hideBackToTop();

	function initViewportOptions() {
		let viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

		if (viewportWidth <= 755) {
			uiState.hasMenu = true;
			hideMenu();
			document.addEventListener("click", hideMenu);
			document.getElementById("menu").addEventListener("click", showMenu);
		}
	}

	translator.load().then(() => {
		setTranslatedContent();
	}).catch((error) => {
		console.error(`An error occured in getting the translations: ${error}`);
	});

	// UI stuff

	initViewportOptions();
	document.getElementById("contact").addEventListener("click", function () {
		showMenuItem("contactpanel")
	});
	document.getElementById("privacy").addEventListener("click", function () {
		showMenuItem("privacypanel")
	});

	onresize = (event) => {
		let viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

		if (viewportWidth <= 755) {
			initViewportOptions();
		}

		if (viewportWidth > 755) {
			uiState.hasMenu = false;
			let menu = document.getElementById("menu");
			menu.removeAttribute("style");
			let menuitems = menu.getElementsByTagName("a");

			for (let i = 0; i < menuitems.length; i++) {
				let element = menuitems[i];
				element.removeAttribute("style");
			}
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
				objectFactory(value.subjects);
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

	