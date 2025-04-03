import {createBlogObject} from "./objectfactory.js"
import {initFilter} from "./indexfilter.js";
import {initializeBackToTop} from "./backtotop.js";
import {dotsMenu} from "./icons.js";
import Translator from "./translator.js";
import {initializeMenu} from "./headermenu.js";
import {checkVersion} from "./version.js";

// Initializes the home page
export function initHome() {
	let translator = new Translator();
	
	// Load app
	
	let app = document.getElementById("app");

	app.innerHTML = `
<div id="oi">
	<div id="message-bar"></div>
	<div id="tx-filter"></div>
	<div id="oc">
    </div>
</div>
<a id="back-to-top" class="fab" href="#oi">^</a>`

	let subjects;
	
	const header = `<h1>Team Xerbutri</h1>
		<div class="menu-wrapper">
		<div class="menu dropdown">
		<button class="drop-btn top-nav menu-btn" data-i18n="navigation.menu">${dotsMenu}</button>
			<ul class="menu-content mat-menu" id="menu">
				<li><a href="map" class="mat-menu-item" data-i18n="maps.link">Kaart</a></li>
				<li><a href="avontuur/txatx" class="mat-menu-item" data-i18n="abouttx.link">Over TX</a></li>
				<li><a href="avontuur/txaue" class="mat-menu-item" data-i18n="aboutue.link">Over UE</a></li>
				<li id="contact" class="mat-menu-item" data-i18n="contact.link">Contact</li>
				<li id="privacy" class="mat-menu-item" data-i18n="privacy.link">Privacy</li>
			</ul>
		</div>
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
	
	translator.load().then(() => {
		setTranslatedContent();
	}).catch((error) => {
		console.error(`An error occured in getting the translations: ${error}`);
	});

	// UI stuff

	initializeMenu();
	initializeBackToTop();

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
				
				const objectsToShow = subjects.splice(0, maxObjects);
				
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
		
		checkVersion(translator);
		
		document
			.querySelector('meta[name="description"]')
			.setAttribute("content", translator.translate("metadata.content"));
		document.title = translator.translate("metadata.title");
	}
}

	