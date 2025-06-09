import {createBlogObject} from "./objectfactory.js"
import {filter, initFilter} from "./indexfilter.js";
import {initializeBackToTop, backToTopHtml} from "../backtotop/backtotop.js";
import {dotsMenu, txLogo} from "./icons.js";
import Translator from "./translator.js";
import {initializeMenu} from "./headermenu.js";
import {checkVersion} from "../version/version.js";

// Initializes the home page
export function initHome() {
	let translator = new Translator();

	// Load app
	let app = document.getElementById("app");
	app.classList.remove("blog");

	app.innerHTML = `
<div id="tx-panel-dismiss" class="tx-backdrop hide"></div>
<div id="top">
	<div id="message-bar"></div>
	<div id="tx-filter" role="toolbar"></div>
	<div id="tile-wrapper" role="feed">
    </div>
</div>
${backToTopHtml}`

	let subjects;

	const header = `<div class="tx-logo">${txLogo}</div><h1>Team Xerbutri</h1>
	<nav role="navigation">
		<ul class="main-menu">
			<li class="dropdown"><a href="javascript:void(0);" role="button" id="menu-button" class="top-nav" data-i18n="navigation.menu">${dotsMenu}</a>
			<ul class="sub-menu mat-menu" id="menu">
			</ul>
			</li>
		</ul>
	</nav>
		</div>
		<div id="contact-panel" class="panel hide">
			<h2 data-i18n="contact.link">Contact</h2>
			<p data-i18n="contact.content">Contact</p>
		</div>
		<div id="privacy-panel" class="panel hide">
			<h2 data-i18n="privacy.link">Privacy</h2>
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
	initializeMenu("");
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

				let cardHeight = 177;
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

				app.addEventListener("scroll", function () {
					if (app.scrollTop + app.clientHeight >= app.scrollHeight) {
						let objectsToShow = subjects.splice(0, maxObjects);
						if (objectsToShow.length > 0) {
							objectFactory(objectsToShow);
						}
					}
				})

				objectFactory(objectsToShow);
			},
			function (error) {
				console.error(error);
			}
		);

		// Builds the objects
		function objectFactory(subjects) {
			const objectContainer = document.getElementById("tile-wrapper");

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
			filter();
		}

		checkVersion(translator);

		document
			.querySelector('meta[name="description"]')
			.setAttribute("content", translator.translate("metadata.content"));
		document.title = translator.translate("metadata.title");
	}
}

	