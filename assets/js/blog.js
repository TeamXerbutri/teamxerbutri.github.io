import {uiState} from "./uistate.js";
import {hideBackToTop, hideMenu, showBackToTop, showMenu, showMenuItem} from "./header.js";
import txLogo from "../images/tx.gif"
import Translator from "./translator.js";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import PhotoSwipeDynamicCaption from "photoswipe-dynamic-caption-plugin";
import "photoswipe/style.css";
import {createGallery, createGalleryWithCaptions} from "./galleryfactory.js";

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
// 	<script src="../data/{{@categorie}}/{{@map}}/items.js"></script>
// <!check if="{{@categorieid == 3 }}"><true>
// 	<script src="../data/{{@categorie}}/{{@map}}/longlatarray.js"></script>
// 	<script src="../ui/js/reportage.js"></script>
// </true>
// </check>

// 	<!check if="{{@categorieid == 3 }}"><true>
// 	<div id="map" class="map"></div>
// </true></check>


function setShare() {
	const uri = location.href;
	const urienc = encodeURIComponent(uri);
	const fburi = "https://www.facebook.com/sharer/sharer.php?u=" + urienc;
	const wauri = "whatsapp://send?text=" + urienc;
	let fbElem = document.getElementById("sharefb");
	let waElem = document.getElementById("sharewa");
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

	document.querySelector("#app").innerHTML = `
		<article id="blog">
		<div id="article-title"></div>
		<p id="article-visited" class="authordate"></p>
		<p id="article-intro"></p>
		<aside id="article-aside"></aside>
		<section id="article-content"></section>
		<p id="article-updated" class="authordate"></p>
		<section id="article-sources"></section>
		<section id="article-gallery"></section>
		</article>
		<a id="back-to-top" href="#blog">^</a>
		<script id="jsonld" type="application/ld+json"></script>
		`
	translator.load().then(() => {
		setTranslatedContent();
	}).catch((error) => {
		console.error(`An error occured in getting the translations: ${error}`);
	});

	// init header
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

	let routeId = window.location.href.split("/").pop();

	function setTranslatedContent() {
		translator.getBlogDataById(routeId).then(
			(value) => {
				
				
				translator.fetchBlogLanguageContent(value, routeId).then(
					(blogContent) => {
						document.title = blogContent.shortname + " - Xerbutri Urban Exploring";
						document.querySelector('meta[name="description"]').setAttribute("content", blogContent.description);
						document.getElementById("article-title").innerHTML = `<h1>${blogContent.title}</h1>`;
						// intro
						document.getElementById("article-intro").innerHTML = blogContent.intro;

						// adventure and history
						if (blogContent.adventure !== undefined && blogContent.adventure !== "") {
							const adventureTitle = translator.translate("adventure");

							document.getElementById("article-content").innerHTML += `<h3>${adventureTitle}</h3>`;
							document.getElementById("article-content").innerHTML += blogContent.adventure;
						}

						if (blogContent.history !== undefined && blogContent.history !== "") {
							let historyTitle = translator.translate("history");

							document.getElementById("article-content").innerHTML += `<h3>${historyTitle}</h3>`;
							document.getElementById("article-content").innerHTML += blogContent.history;
						}

						const year = blogContent.created.split("-")[0];
						const month = blogContent.created.split("-")[1];

						let monthBlog = translator.translate(`month.${month}`);

						document.getElementById("article-visited").innerHTML = `${blogContent.author} -  ${monthBlog} ${year}`;
						
						let updatedSplit = blogContent.updated.split("-");

						document.getElementById("article-updated").innerHTML = translator.translate("article.lastupdate") + translator.localDate(updatedSplit[2], updatedSplit[1], updatedSplit[0]);
					},
				).catch((error) => {
					console.error(`An error occured in getting the translated blog content: ${error}`);
				});

				translator.fetchBlogFacts(value, routeId).then(
					(blogFacts) => {
						
						//aside
						if (countProperties(blogFacts.facts) > 0) {
							document.getElementById("article-aside").innerHTML += `<ul>`;
							Object.entries(blogFacts["facts"]).forEach(([key, value]) => {
								if (value === "") {
									return;
								}

								switch (key) {
									case "build":
									case "abandoned":
									case "demolished":
									case "reused":
									case "length":
									case "height":
									case "line":
										const translation = translator.translate(`facts.${key}`);
										document.getElementById("article-aside").innerHTML += `<li>${translation}: <span class="fact">${value}</span> </li>`;
										break;
									case "visited":
										const translationVis = translator.translate(`facts.${key}`);
										document.getElementById("article-aside").innerHTML += `<li>${translationVis}: <span class="fact">${value.substring(0,4)}</span> </li>`;
										break;
									case "rating":
										const ratingKey = translator.translate("facts.rating");
										document.getElementById("article-aside").innerHTML += `<li>${ratingKey}: <span class="fact"><img src="../ui/pics/ri${value}.gif" alt="${value}" width="152" height="10" /></span></li>`;
										break;
									case "map":
										let mapKey = translator.translate("facts.map");
										document.getElementById("article-aside").innerHTML += `<li>${mapKey} </br><div class="omap" id="omap" data-map="${value}"></div> </li>`;
										break;
									default:
										break;
								}
							});
							document.getElementById("article-aside").innerHTML += `</ul>`;
						}
						if (countProperties(blogFacts.facts) <= 0) {
							document.getElementById("article-aside").style.display = "none";
						}

						if (blogFacts.sources.length > 0) {
							let sourceTitle = translator.translate("sources.title");
							let sourceDescription = translator.translate("sources.description");

							document.getElementById("article-sources").innerHTML += `<h3>${sourceTitle}</h3>`;
							document.getElementById("article-sources").innerHTML += `<p>${sourceDescription}</p>`;
							let sourceList = "";
							blogFacts.sources.forEach(function (source) {

								let visitedOnDateArray = source.date.split("-");
								let visitedOn = translator.translate("sources.visited") + translator.localDate(visitedOnDateArray[2], visitedOnDateArray[1], visitedOnDateArray[0]);

								sourceList += `<li> <a href="${source.url}" title="${source.title}" target="_blank">${source.title}</a> <i>${visitedOn}</i></li>`;
							});
							document.getElementById("article-sources").innerHTML += `<ol>${sourceList}</ol>`;
						}
					},
				).catch((error) => {
					console.error(`An error occured in getting the translated blog facts: ${error}`);
				});

				translator.fetchBlogJsonLd(value, routeId).then(
					(jsonld) => {
						document.getElementById("jsonld").innerHTML = JSON.stringify(jsonld);
					}
				).catch((error) => { console.error(`An error occured in getting the JSON-LD: ${error}`); });
				
				translator.fetchBlogImages(value, routeId).then(
				 (items) => {
					 //gallery
					 let gallerySection = document.getElementById("article-gallery");
					 let galleryTitle = translator.translate("gallery.title");

					 let galleryDescription = translator.translate("gallery.description");

					 let gallery = document.createElement("div");
					 gallery.classList.add("gallery");
					 gallery.id = "gallery--responsive-images";

					 let title = document.createElement("h3");
					 title.innerText = galleryTitle;
					 gallerySection.appendChild(title);

					 let description = document.createElement("p");
					 description.innerText = galleryDescription;
					 gallerySection.appendChild(description);
					 
					 // if there are captions
					 translator.fetchBlogCaptions(value, routeId).then(
						 (captions) =>{
							 console.log("Has captions")
							 
							 let galleryCaptions = createGalleryWithCaptions(items, captions.captions, value, routeId, gallery);
							 gallerySection.appendChild(galleryCaptions);

							 const smallScreenPadding = {
								 top: 0, bottom: 0, left: 0, right: 0
							 };
							 const largeScreenPadding = {
								 top: 30, bottom: 30, left: 0, right: 0
							 };
														 
							 const lightbox = new PhotoSwipeLightbox({
								 gallery: "#gallery--responsive-images",
								 children: ".pswp-gallery__item",
								 bgOpacity: 0.95,
								 // optionaly adjust viewport
								 paddingFn: (viewportSize) => {
									 return viewportSize.x < 700 ? smallScreenPadding : largeScreenPadding
								 },
								 pswpModule: () => import("photoswipe")
							 });

							 const captionPlugin = new PhotoSwipeDynamicCaption(lightbox, {
								 mobileLayoutBreakpoint: 700,
								 type: "auto",
								 mobileCaptionOverlapRatio: 1,
							 });
							 lightbox.init();
						 }).catch(() => {
							 // no captions. Create gallery without captions
						 const lightbox = new PhotoSwipeLightbox({
							 gallery: "#gallery--responsive-images",
							 children: "a",
							 bgOpacity: 0.90,
							 pswpModule: () => import("photoswipe")
						 });
						 let galleryPswp = createGallery(items, value, routeId, gallery);
						 gallerySection.appendChild(galleryPswp);
						 lightbox.init();
					 });
				 }
				).catch((error) => {
					console.error(`An error occured in getting the translated blog items: ${error}`);
				});
			}
		).catch((error) => {
			console.error(`An error occured in getting the translated blog data: ${error}`);
		});
		
		

		
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
	document.getElementById("contact").addEventListener("click", function () {
		showMenuItem("contactpanel")
	});
	document.getElementById("privacy").addEventListener("click", function () {
		showMenuItem("privacypanel")
	});

	window.onscroll = function (ev) {
		if (window.scrollY >= 200) {
			showBackToTop();
		} else {
			hideBackToTop();
		}
	}
}