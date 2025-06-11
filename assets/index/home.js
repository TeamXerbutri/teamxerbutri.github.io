import {createCard} from "./card/cardfactory.js"
import {filter, initFilter} from "./card/filter/cardfilter.js";
import {initializeBackToTop, backToTopHtml} from "../shared/backtotop/backtotop.js";
import Translator from "../js/translator.js";
import {checkVersion} from "./version/version.js";
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
	<nav class="card-feed"></nav>
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
				let maxCards = rows * columns;

				if (subjects.length < maxCards) {
					maxCards = subjects.length;
				}

				const cardsToShow = subjects.splice(0, maxCards);

				app.addEventListener("scroll", function () {
					if (app.scrollTop + app.clientHeight >= app.scrollHeight) {
						let cardsToShow = subjects.splice(0, maxCards);
						if (cardsToShow.length > 0) {
							cardFactory(cardsToShow);
						}
					}
				})

				cardFactory(cardsToShow);
			},
			function (error) {
				console.error(error);
			}
		);

		// Builds the cards
		function cardFactory(subjects) {
			const cardContainer = document.querySelector(".card-feed");

			for (let i in subjects) {
				let displayCard = createCard(translator, subjects[i]);

				cardContainer.appendChild(displayCard);
			}
		}

		initFilter(translator);

		const filterElement = document.querySelector(".card-filter");
		filterElement.onclick = function () {
			cardFactory(subjects);
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

	