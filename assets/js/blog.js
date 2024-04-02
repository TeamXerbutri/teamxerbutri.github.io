import {uiState} from "./uistate.js";
import {hideBackToTop, hideMenu, showBackToTop, showMenu, showMenuItem} from "./header.js";
import {appState} from "./appstate.js";
import txLogo from "../images/tx.gif"
import {getBlogDataById} from "./blogdata.js"
import Translator from "./translator.js";

uiState.hasMenu = true;
uiState.hasContactModal = false;
uiState.hasPrivacyModal = false;
uiState.hasShareModal = false;
uiState.hasBackToTop = false;

function countProperties(obj) {
	let count = 0;

	for (const prop in obj) {
		if (obj.hasOwnProperty(prop))
			++count;
	}

	return count;
}

//TODO need to translate FFF to JS
// 	<script src="../picz/{{@categorie}}/{{@map}}/items.js"></script>
// <script src='../ui/js/photoswipe.min.js'></script>
// <script src='../ui/js/photoswipe-ui-default.min.js'></script>
// <!check if="{{@categorieid == 3 }}"><true>
// 	<script src="../picz/{{@categorie}}/{{@map}}/longlatarray.js"></script>
// 	<script src="../ui/js/reportage.js"></script>
// </true>
// 	<false>
// 		<script  src="../ui/js/gallery.js"></script>
// 		<script type="application/ld+json">
// 			<include href="{{@jsonld}}"/>
// 		</script>
// 	</false>
// </check>

// 	<!check if="{{@categorieid == 3 }}"><true>
// 	<div id="map" class="map"></div>
// </true></check>
// <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
// 	<div class="pswp__bg"></div>
// 	<div class="pswp__scroll-wrap">
// 		<div class="pswp__container">
// 			<div class="pswp__item"></div>
// 			<div class="pswp__item"></div>
// 			<div class="pswp__item"></div>
// 		</div>
// 		<div class="pswp__ui pswp__ui--hidden">
// 			<div class="pswp__top-bar">
// 				<div class="pswp__counter"></div>
// 				<button class="pswp__button pswp__button--close" title="Sluiten (Esc)"></button>
// 				<button class="pswp__button pswp__button--share" title="Delen"></button>
// 				<button class="pswp__button pswp__button--fs" title="Volledig scherm"></button>
// 				<button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>
// 				<div class="pswp__preloader">
// 					<div class="pswp__preloader__icn">
// 						<div class="pswp__preloader__cut">
// 							<div class="pswp__preloader__donut"></div>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 			<div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
// 				<div class="pswp__share-tooltip"></div>
// 			</div>
// 			<button class="pswp__button pswp__button--arrow--left" title="Vorige (linkerpijl)">
// 			</button>
// 			<button class="pswp__button pswp__button--arrow--right" title="Volgende (rechterpijl)">
// 			</button>
// 			<div class="pswp__caption">
// 				<div class="pswp__caption__center"></div>
// 			</div>
// 		</div>
// 	</div>
// </div>


function setShare() {
	const uri = location.href;
	const urienc = encodeURIComponent(uri);
	const fburi = "https://www.facebook.com/sharer/sharer.php?u=" + urienc;
	const wauri = "whatsapp://send?text=" + urienc;
	let fbElem = document.getElementById('sharefb');
	let waElem = document.getElementById('sharewa');
	fbElem.href = fburi;
	waElem.href = wauri;
}

function showShare() {
	let share = document.getElementById("sharepanel");
	let shareitems = share.getElementsByTagName("a");
	for (let i = 0; i < shareitems.length; i += 1) {
		const element = shareitems[i];
		element.style.display = "block"
	}
	share.style.width = "116px";
	share.style.height = "91px";
	window.setTimeout(setShareActive, 1000)
}

function setShareActive() {
	uiState.hasShareModal = true
}

function hideShare() {
	if (uiState.hasShareModal) {
		const share = document.getElementById("sharepanel");
		const shareitems = share.getElementsByTagName("a");
		for (let i = 0; i < shareitems.length; i += 1) {
			const element = shareitems[i];
			element.style.display = "none"
		}
		share.style.width = "44px";
		share.style.height = "44px";
		uiState.hasShareModal = false
	}
}

export function initBlog() {
	let translator = new Translator();
	uiState.hasShareModal = true;

	document.querySelector('#app').innerHTML = `
		<article id="blog">
		<div id="article-title"></div>
		<p id="article-created" class="authordate"></p>
		<p id="article-intro"></p>
		<aside id="article-aside"></aside>
		<section id="article-content"></section>
		<p id="article-updated" class="authordate"></p>
		<section id="article-sources"></section>
		<section id="article-gallery"></section>
		</article>
		<a id="back-to-top" href="#blog">^</a>
		`
	translator.load().then(() => {
		setTranslatedContent();
	}).catch((error) => {
		console.error(`An error occured in getting the translations: ${error}`);
	});

	const header = `<a href="../" title="Team Xerbutri Overzichts pagina"><img alt="Team Xerbutri Logo" id="tx" src="${txLogo}"></a>
		<h1 class="logo">Team Xerbutri</h1>
		<div id="sharepanel">
			<a href="" target="_blank" id="sharefb">Facebook</a>
			<a href="" target="_blank" id="sharewa">Whatsapp</a>
		</div>
		<div class="blogmenu" id="menu">
			<a href="../map" data-i18n="maps.link">Maps</a>
			<a href="../avontuur/txatx" data-i18n="abouttx.link">Over TX</a>
			<a href="../avontuur/txaue" data-i18n="aboutue.link">Over UE</a>
			<a id="contact" data-i18n="contact.link">Contact</a>
			<a id="privacy" data-i18n="privacy.link">Privacy</a>
		</div>
		<a class="overview" href="../" data-i18n="back.link">X</a>
		<div id="contactpanel">
			<p data-i18n="contact.content">Contact</p>
		</div>
		<div id="privacypanel">
			<p data-i18n="privacy.content">Privacy</p>
		</div>`
	const headerElem = document.getElementById("header");
	if (headerElem.classList.contains("home")) {
		headerElem.classList.remove("home");
		headerElem.classList.add("blog")
		headerElem.innerHTML = header
	}
	if (!headerElem.classList.contains("blog")) {
		headerElem.classList.add("blog")
		headerElem.innerHTML = header
	}
	function errorHandler(error) {
		console.error(error);
	}
	
	let abbreviation = window.location.href.split("/").pop();
	function setTranslatedContent() {
		

		//TODO refactor to translator
		function getMonthTranslation(month, monthBlog) {
			// Get month translation
			if (appState.language === "nl") {
				switch (month) {
					case "01":
						monthBlog = "januari";
						break;
					case "02":
						monthBlog = "februari";
						break;
					case "03":
						monthBlog = "maart";
						break;
					case "04":
						monthBlog = "april";
						break;
					case "05":
						monthBlog = "mei";
						break;
					case "06":
						monthBlog = "juni";
						break;
					case "07":
						monthBlog = "juli";
						break;
					case "08":
						monthBlog = "augustus";
						break;
					case "09":
						monthBlog = "september";
						break;
					case "10":
						monthBlog = "oktober";
						break;
					case "11":
						monthBlog = "november";
						break;
					case "12":
						monthBlog = "december";
						break;
				}
				if (appState.language === "en") {
					switch (month) {
						case "01":
							monthBlog = "January";
							break;
						case "02":
							monthBlog = "February";
							break;
						case "03":
							monthBlog = "March";
							break;
						case "04":
							monthBlog = "April";
							break;
						case "05":
							monthBlog = "May";
							break;
						case "06":
							monthBlog = "June";
							break;
						case "07":
							monthBlog = "July";
							break;
						case "08":
							monthBlog = "August";
							break;
						case "09":
							monthBlog = "September";
							break;
						case "10":
							monthBlog = "October";
							break;
						case "11":
							monthBlog = "November";
							break;
						case "12":
							monthBlog = "December";
							break;
					}
					if (appState.language === "fr") {
						switch (month) {
							case "01":
								monthBlog = "janvier";
								break;
							case "02":
								monthBlog = "février";
								break;
							case "03":
								monthBlog = "mars";
								break;
							case "04":
								monthBlog = "avril";
								break;
							case "05":
								monthBlog = "mai";
								break;
							case "06":
								monthBlog = "juin";
								break;
							case "07":
								monthBlog = "juillet";
								break;
							case "08":
								monthBlog = "août";
								break;
							case "09":
								monthBlog = "septembre";
								break;
							case "10":
								monthBlog = "octobre";
								break;
							case "11":
								monthBlog = "novembre";
								break;
							case "12":
								monthBlog = "décembre";
								break;
						}
					}
					if (appState.language === "de") {
						switch (month) {
							case "01":
								monthBlog = "Januar";
								break;
							case "02":
								monthBlog = "Februar";
								break;
							case "03":
								monthBlog = "März";
								break;
							case "04":
								monthBlog = "April";
								break;
							case "05":
								monthBlog = "Mai";
								break;
							case "06":
								monthBlog = "Juni";
								break;
							case "07":
								monthBlog = "Juli";
								break;
							case "08":
								monthBlog = "August";
								break;
							case "09":
								monthBlog = "September";
								break;
							case "10":
								monthBlog = "Oktober";
								break;
							case "11":
								monthBlog = "November";
								break;
							case "12":
								monthBlog = "Dezember";
								break;
						}
					}
				}
			}
			return monthBlog;
		}

		getBlogDataById(abbreviation).then(
			function (value) {
				document.title = value.shortname + " - Xerbutri Urban Exploring";
				document.querySelector('meta[name="description"]').setAttribute("content", value.description);
				document.getElementById("article-title").innerHTML = `<h1>${value.shortname}</h1>`;

				const getBlogLanguageContent = fetch("../../data/".concat(value.category, "/", abbreviation, "/blog.", appState.language, ".json")).then((response) => response.json());
				getBlogLanguageContent.then(
					function (blogContent) {
						// intro
						document.getElementById("article-intro").innerHTML = blogContent.intro;

						// adventure and history
						if (blogContent.adventure !== undefined && blogContent.adventure !== "") {
							let adventureTitle = "";
							switch (appState.language) {
								case "nl":
									adventureTitle = "Avontuur";
									break;
								case "en":
									adventureTitle = "Adventure";
									break;
								case "fr":
									adventureTitle = "Aventure";
									break;
								case "de":
									adventureTitle = "Abenteuer";
									break;
							}
							document.getElementById("article-content").innerHTML += `<h3>${adventureTitle}</h3>`;
							document.getElementById("article-content").innerHTML += blogContent.adventure;
						}

						if (blogContent.history !== undefined && blogContent.history !== "") {
							let historyTitle = "";
							switch (appState.language) {
								case "nl":
									historyTitle = "Historie";
									break;
								case "en":
									historyTitle = "History";
									break;
								case "fr":
									historyTitle = "Histoire";
									break;
								case "de":
									historyTitle = "Geschichte";
									break;
							}
							document.getElementById("article-content").innerHTML += `<h3>${historyTitle}</h3>`;
							document.getElementById("article-content").innerHTML += blogContent.history;
						}

						if (blogContent.other !== undefined && blogContent.other !== "") {
							document.getElementById("article-content").innerHTML += blogContent.other;
						}
					},
					errorHandler
				);

				const getBlogFacts = fetch("../../data/".concat(value.category, "/", abbreviation, "/blog.json")).then((response) => response.json());

				getBlogFacts.then(
					function (blogFacts) {
						const year = blogFacts["created"].split("-")[0];
						const month = blogFacts["created"].split("-")[1];
						let monthBlog = "";

						monthBlog = getMonthTranslation(month, monthBlog);

						document.getElementById("article-created").innerHTML = `${blogFacts.author} -  ${monthBlog} ${year}`;

						let updatedSplit = blogFacts["updated"].split("-");
						const monthUpdated = updatedSplit[1];
						let monthBlogUpdated = "";
						monthBlogUpdated = getMonthTranslation(monthUpdated, monthBlogUpdated);

						let updatedBlog = "";
						if (appState.language === "nl") {
							updatedBlog = "Artikel voor het laatst bijgewerkt " + updatedSplit[2] + " " + monthBlogUpdated + " " + updatedSplit[0];
						}
						if (appState.language === "en") {
							updatedBlog = "Article last updated " + monthBlogUpdated + " " + updatedSplit[2] + ", " + updatedSplit[0];
						}
						if (appState.language === "fr") {
							updatedBlog = "Article mis à jour pour la dernière fois " + updatedSplit[2] + " " + monthBlogUpdated + " " + updatedSplit[0];
						}
						if (appState.language === "de") {
							updatedBlog = "Artikel zuletzt aktualisiert " + updatedSplit[2] + " " + monthBlogUpdated + " " + updatedSplit[0];
						}

						document.getElementById("article-updated").innerHTML = updatedBlog;

						//aside
						if (countProperties(blogFacts.facts) > 0) {
							document.getElementById("article-aside").innerHTML += `<ul>`;
							Object.entries(blogFacts.facts).forEach(([key, value]) => {
								if (key === "Rating") {
									document.getElementById("article-aside").innerHTML += `<li>${key}: <span class="fact"><img src="../ui/pics/ri${value}.gif" alt="${value}" width="152" height="10" /></span></li>`;
								}

								// Get fact translations
								if (key === "Build") {
									let buildKey = "";
									switch (appState.language) {
										case "nl":
											buildKey = "Bouwjaar";
											break;
										case "en":
											buildKey = "Built";
											break;
										case "fr":
											buildKey = "Construit";
											break;
										case "de":
											buildKey = "Gebaut";
											break;
									}
									document.getElementById("article-aside").innerHTML += `<li>${buildKey}: <span class="fact">${value}</span> </li>`;
								}

								if (key === "Abandoned") {
									let abandonedKey = "";
									switch (appState.language) {
										case "nl":
											abandonedKey = "Verlaten";
											break;
										case "en":
											abandonedKey = "Abandoned";
											break;
										case "fr":
											abandonedKey = "Abandonné";
											break;
										case "de":
											abandonedKey = "Verlassen";
											break;
									}
									document.getElementById("article-aside").innerHTML += `<li>${abandonedKey}: <span class="fact">${value}</span> </li>`;
								}

								if (key === "Visited") {
									let visitedKey = "";
									switch (appState.language) {
										case "nl":
											visitedKey = "Bezocht";
											break;
										case "en":
											visitedKey = "Visited";
											break;
										case "fr":
											visitedKey = "Visitée";
											break;
										case "de":
											visitedKey = "Besucht";
											break;
									}
									document.getElementById("article-aside").innerHTML += `<li>${visitedKey}: <span class="fact">${value}</span> </li>`;
								}

								if (key === "Demolished") {
									let demolishKey = "";
									switch (appState.language) {
										case "nl":
											demolishKey = "Gesloopt";
											break;
										case "en":
											demolishKey = "Demolished";
											break;
										case "fr":
											demolishKey = "Démoli";
											break;
										case "de":
											demolishKey = "Abgerissen";
											break;
									}
									document.getElementById("article-aside").innerHTML += `<li>${demolishKey}: <span class="fact">${value}</span> </li>`;
								}

								if (key === "Reused") {
									let reuseKey = "";
									switch (appState.language) {
										case "nl":
											reuseKey = "Hergebruikt";
											break;
										case "en":
											reuseKey = "Reused";
											break;
										case "fr":
											reuseKey = "Réutilisé";
											break;
										case "de":
											reuseKey = "Wiederverwendet";
											break;
									}
									document.getElementById("article-aside").innerHTML += `<li>${reuseKey}: <span class="fact">${value}</span> </li>`;
								}

								if (key === "Length") {
									let lengthKey = "";
									switch (appState.language) {
										case "nl":
											lengthKey = "Lengte";
											break;
										case "en":
											lengthKey = "Length";
											break;
										case "fr":
											lengthKey = "Longueur";
											break;
										case "de":
											lengthKey = "Länge";
											break;
									}
									document.getElementById("article-aside").innerHTML += `<li>${lengthKey}: <span class="fact">${value}</span> </li>`;
								}

								if (key === "Line") {
									let lineKey = "";
									switch (appState.language) {
										case "nl":
											lineKey = "Lijn nummer";
											break;
										case "en":
											lineKey = "Line number";
											break;
										case "fr":
											lineKey = "Ligne";
											break;
										case "de":
											lineKey = "Streckennummer";
											break;
									}
									document.getElementById("article-aside").innerHTML += `<li>${lineKey}: <span class="fact">${value}</span> </li>`;
								}
								if (key === "Map") {
									let mapKey = "";
									switch (appState.language) {
										case "nl":
											mapKey = "Overzichtskaart";
											break;
										case "en":
											mapKey = "Map";
											break;
										case "fr":
											mapKey = "Carte";
											break;
										case "de":
											mapKey = "Karte";
											break;
									}
									document.getElementById("article-aside").innerHTML += `<li>${mapKey} </br><div class="omap" id="omap" data-map="${value}"></div> </li>`;
								}
							});
							document.getElementById("article-aside").innerHTML += `</ul>`;
						}

						if (blogFacts.sources.length > 0) {
							let sourceTitle = "";
							let sourceDescription = "";
							if (appState.language === "nl") {
								sourceTitle = "Bronnen";
								sourceDescription = "Voor het artikel is gebruikt gemaakt van de volgende bronnen: ";
							}
							if (appState.language === "en") {
								sourceTitle = "Sources";
								sourceDescription = "The following sources were used for this article: ";
							}
							if (appState.language === "fr") {
								sourceTitle = "Sources";
								sourceDescription = "Les sources suivantes ont été utilisées pour cet article: ";
							}
							if (appState.language === "de") {
								sourceTitle = "Quellen";
								sourceDescription = "Für diesen Artikel wurden folgende Quellen verwendet: ";
							}

							document.getElementById("article-sources").innerHTML += `<h3>${sourceTitle}</h3>`;
							document.getElementById("article-sources").innerHTML += `<p>${sourceDescription}</p>`;
							let sourceList = "";
							blogFacts.sources.forEach(function (source) {

								let visitedOn = "";
								let visitedOnDateArray = source.date.split("-");
								let visitedMonthSource = "";
								let visitedOnMonth = getMonthTranslation(visitedOnDateArray[1], visitedMonthSource);
								if (appState.language === "nl") {
									visitedOn = "Bezocht op " + visitedOnDateArray[2] + " " + visitedOnMonth + " " + visitedOnDateArray[0];
								}

								sourceList += `<li> <a href="${source.url}" title="${source.title}" target="_blank">${source.title}</a> <i>${visitedOn}</i></li>`;
							});
							document.getElementById("article-sources").innerHTML += `<ol>${sourceList}</ol>`;
						}
					},
					errorHandler
				);
			}, errorHandler
		);

		//gallery

		let galleryTitle = "";
		if (appState.language === "nl") {
			galleryTitle = "Galerij";
		}
		if (appState.language === "en") {
			galleryTitle = "Gallery";
		}
		if (appState.language === "fr") {
			galleryTitle = "Galerie";
		}
		if (appState.language === "de") {
			galleryTitle = "Galerie";
		}

		let galleryDescription = "";
		if (appState.language === "nl") {
			galleryDescription = "Klik op de foto om naar de galerij te gaan";
		}
		if (appState.language === "en") {
			galleryDescription = "Click the picture to go to the gallery";
		}
		if (appState.language === "fr") {
			galleryDescription = "Cliquez sur l'image pour accéder à la galerie";
		}
		if (appState.language === "de") {
			galleryDescription = "Klicken Sie auf das Bild, um zur Galerie zu gelangen";
		}

		document.getElementById("article-gallery").innerHTML = `<h3>${galleryTitle}</h3> <p>${galleryDescription}</p>`;
		
		//TODO set a correct translated description
		document
			.querySelector('meta[name="description"]')
			.setAttribute("content", "Team Xerbutri explores abandoned buildings, railway tunnels and bridges. The website is about urban exploring, enjoy the pictures.");
		document.title = "Xerbutri Urban Exploring";
	}
	
	setShare();
	hideMenu();
	hideShare();
	hideBackToTop();
	document.addEventListener("click", hideMenu);
	document.addEventListener("click", hideShare);
	document.getElementById("menu").addEventListener("click", showMenu);
	document.getElementById("sharepanel").addEventListener("click", showShare);
	document.getElementById("contact").addEventListener("click", function(){showMenuItem("contactpanel")});

	if (window.scrollY >= 200) {
		 //TODO the scroll to top does not show
		showBackToTop();
	} else {
		hideBackToTop();
	}
	
}