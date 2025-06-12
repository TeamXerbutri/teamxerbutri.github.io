import {createBlogObject} from "./objectfactory.js"
import {filter, initFilter} from "../index/card/filter/cardfilter.js";
import {initializeBackToTop, backToTopHtml} from "../shared/backtotop/backtotop.js";
import Translator from "./translator.js";
import {checkVersion} from "../index/version/version.js";
import {initializeHomeHeader} from "../shared/header/header.js";

// Initializes the home page
export function initHome() {
	let translator = new Translator();

	// Load app
	let app = document.getElementById("js-app");
	app.classList.remove("blog");

	app.innerHTML = `
<div id="tx-panel-dismiss" class="tx-backdrop hide"></div>
<div id="href-top" class="index">
	<div class="index__message-bar hide"></div>
	<div class="card-filter" role="toolbar"></div>
	<div id="tile-wrapper" role="feed"></div>
</div>
${backToTopHtml}`

	let subjects;

	const htmlElement = document.querySelector("html");
	
	if (htmlElement.classList.contains("map-html")) 
		htmlElement.classList.remove("map-html");
	
	initializeHomeHeader();
	
	translator.load().then(() => {
		setTranslatedContent();
	}).catch((error) => {
		console.error(`An error occured in getting the translations: ${error}`);
	});
	

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

		const filterElement = document.querySelector(".card-filter");
		filterElement.onclick = function () {
			objectFactory(subjects);
			subjects = [];
			filter();
		}

		checkVersion(translator);

		initializeBackToTop();
		
		document
			.querySelector('meta[name="description"]')
			.setAttribute("content", translator.translate("metadata.content"));
		document.title = translator.translate("metadata.title");
	}
}

	