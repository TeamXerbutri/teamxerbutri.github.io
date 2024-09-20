import {uiState} from "./uistate.js";
import Map from "ol/Map";
import {hideBackToTop, showBackToTop} from "./header.js";
import Translator from "./translator.js";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import PhotoSwipeDynamicCaption from "photoswipe-dynamic-caption-plugin";
import "../css/mat/lightbox.css"
import "photoswipe/style.css";
import {createGallery, createGalleryWithCaptions} from "./galleryfactory.js";
import {useGeographic} from "ol/proj";
import {Icon, Stroke, Style} from "ol/style";
import {Tile as TileLayer} from "ol/layer";
import OSM from "ol/source/OSM";
import View from "ol/View";
import {Vector as VectorLayer} from "ol/layer";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import PhotoswipeMatDesignPlugin from "./photoswipe-mat-design-plugin.js";
import {dotsMenu, leftArrow, share, zoomIn, txLogo, nextArrow, prevArrow} from "./icons.js";
import PhotoswipeOpenLayersPlugin from "./photoswipe-ol-plugin.js";

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

function showItem(elementId) {
	document.addEventListener("click", function (evt) {
		hideItem(elementId, evt)
	});
	document.getElementById(elementId).style.display = "block";
}

function hideItem(elementId, evt) {
	let element = document.getElementById(elementId);
	if (element.style.display !== "none" && evt.target.parentNode.id !== "menu-blog") {
		document.removeEventListener("click", function (evt) {
			hideItem(elementId, evt)
		});
		element.style.display = "none";
	}
}

let omap;

function loadFactsMap(route) {

	useGeographic();

	// the styles
	const styles = {
		"bridge": new Style({
			image: new Icon({
				opacity: 0.9,
				scale: 0.9,
				size: [52, 52],
				src: "ui/pics/bridgemarker.png",
			}),
		}),
		"tunnel": new Style({
			image: new Icon({
				opacity: 0.9,
				scale: 0.9,
				size: [52, 52],
				src: "ui/pics/tunnelmarker.png",
			}),
		}),
		"building": new Style({
			image: new Icon({
				opacity: 0.9,
				scale: 0.9,
				size: [52, 52],
				src: "ui/pics/buildingmarker.png",
			}),
		}),
		"redLine": new Style({
			stroke: new Stroke({
				width: 7, color: "rgba(255, 0, 0, 1)",
			}),
			zIndex: 2,
		}),
		"whiteDash": new Style({
			stroke: new Stroke({
				width: 5, color: "rgba(255, 255, 255, 1)",
				lineDash: [16, 28]
			}),
			zIndex: 3
		}),
	}
	styles["rail"] = [styles["redLine"], styles["whiteDash"]];

	// raster (the base map or background)

	const raster = new TileLayer({
		source: new OSM({
			projection: "EPSG:4326"
		})
	});

	const view = new View({
		projection: "EPSG:3857",
		center: [6, 51.7],
		zoom: 8
	});
	// map
	omap = new Map({
		target: "omap",
		layers: [raster],
		view: view
	});

	const railVector = new VectorLayer({
		source: new VectorSource({
			url: "../data/spoor/"+route+"/geometry.json",
			format: new GeoJSON(),
		}),
		style: function (feature) {
			return styles[feature.get("type")];
		}
	});

	railVector.getSource().on("featuresloadend", function (event) {
		event.features.forEach(function (feature) {
			feature.set("type", "rail");
			let center = feature.getGeometry().getCoordinateAt(0.5);
			view.centerOn(center, omap.getSize(), [omap.getSize()[0] / 2, omap.getSize()[1] / 2]);
			view.fit(feature.getGeometry(), {padding: [50, 50, 50, 50]});
		});
	});

	omap.addLayer(railVector);
}

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

export function initBlog() {
	let translator = new Translator();
	uiState.hasShareModal = true;

	document.querySelector("#app").innerHTML = `
		<article id="blog">
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

	const htmlElement = document.querySelector("html");
	if (htmlElement.classList.contains("map-html")) {
		htmlElement.classList.remove("map-html");
	}

	// init header
	const header = `
		<div id="topbar">
		<a class="nav-back top-nav" href="../" data-i18n="navigation.back">${leftArrow}</a>
		<a class="nav-home top-nav" href="../" data-i18n="navigation.home">${txLogo}</a>
		<div class="share dropdown">
			<button class="drop-btn top-nav share-btn" data-i18n="navigation.share">${share}</button>
			<div class="share-content mat-menu">
				<a href="" class="mat-menu-item" target="_blank" id="sharefb">Facebook</a>
				<a href="" class="mat-menu-item" target="_blank" id="sharewa">Whatsapp</a>
			</div>
		</div>
		<div class="menu-blog dropdown">
			<button class="drop-btn top-nav menu-blog-btn" data-i18n="navigation.menu">${dotsMenu}</button>
			<div class="menu-blog-content mat-menu" id="menu-blog">
				<a href="../map" class="mat-menu-item" data-i18n="maps.link">Maps</a>
				<a href="../avontuur/txatx" class="mat-menu-item" data-i18n="abouttx.link">Over TX</a>
				<a href="../avontuur/txaue" class="mat-menu-item" data-i18n="aboutue.link">Over UE</a>
				<a id="contact" class="mat-menu-item" data-i18n="contact.link">Contact</a>
				<a id="privacy" class="mat-menu-item" data-i18n="privacy.link">Privacy</a>
			</div>
		</div>
		
		<div id="contactpanel">
			<p data-i18n="contact.content">Contact</p>
		</div>
		<div id="privacypanel">
			<p data-i18n="privacy.content">Privacy</p>
		</div>
		</div>
		<div id="article-title"></div>
		`
	const headerElem = document.getElementById("header");
	if (headerElem.classList.contains("home")) {
		headerElem.classList.remove("home");
		headerElem.innerHTML = header
	}
	if (headerElem.classList.contains("map-header")) {
		headerElem.classList.remove("map-header");
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
							let ul = document.createElement("ul");

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
										ul.innerHTML += `<li>${translation}: <span class="fact">${value}</span> </li>`;
										break;
									case "visited":
										const translationVis = translator.translate(`facts.${key}`);
										ul.innerHTML += `<li>${translationVis}: <span class="fact">${value.substring(0, 4)}</span> </li>`;
										break;
									case "rating":
										const ratingKey = translator.translate("facts.rating");
										ul.innerHTML += `<li>${ratingKey}: <span class="fact"><img src="../ui/pics/ri${value}.gif" alt="${value}" width="152" height="10" /></span></li>`;
										break;
									case "map":
										let mapKey = translator.translate("facts.map");
										ul.innerHTML += `</br><li>${mapKey} </br><div class="omap" id="omap" data-map="${value}"></div> </li>`;
										break;
									default:
										break;
								}
							});
							document.getElementById("article-aside").appendChild(ul);
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

						if (document.getElementById("omap")) {
							loadFactsMap(routeId);
						}
					},
				).catch((error) => {
					console.error(`An error occured in getting the translated blog facts: ${error}`);
				});

				translator.fetchBlogJsonLd(value, routeId).then(
					(jsonld) => {
						document.getElementById("jsonld").innerHTML = JSON.stringify(jsonld);
					}
				).catch((error) => {
					console.error(`An error occured in getting the JSON-LD: ${error}`);
				});

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
							(captions) => {
								
								//if any item has coordinates, create gallery with captions and openlayers map
								//TODO In the future, check if there is a photos.json file
								if (items.some(item => item.coordinate)) {
									
									let openLayersGallery = createGalleryWithCaptions(items, captions, value, routeId, gallery);
									gallerySection.appendChild(openLayersGallery);

									const smallScreenPadding = {
										top: 64, bottom: 0, left: 0, right: 0
									};
									const largeScreenPadding = {
										top: 64, bottom: 24, left: 52, right: 52
									};

									const lightbox = new PhotoSwipeLightbox({
										gallery: "#gallery--responsive-images",
										children: ".pswp-gallery__item",
										counter: false,
										bgOpacity: 1,
										closeSVG: leftArrow,
										zoomSVG: zoomIn,
										arrowNextSVG: nextArrow,
										arrowPrevSVG: prevArrow,
										// adjust viewport for design
										paddingFn: (viewportSize) => {
											return viewportSize.x < 700 ? smallScreenPadding : largeScreenPadding
										},
										pswpModule: () => import("photoswipe")
									});
									
									const olPlugin = new PhotoswipeOpenLayersPlugin(lightbox, routeId, {});
									lightbox.init();
								}
								else {
									// create gallery with captions
									let galleryCaptions = createGalleryWithCaptions(items, captions, value, routeId, gallery);
									gallerySection.appendChild(galleryCaptions);

									const smallScreenPadding = {
										top: 64, bottom: 0, left: 0, right: 0
									};
									const largeScreenPadding = {
										top: 64, bottom: 24, left: 52, right: 52
									};

									const lightbox = new PhotoSwipeLightbox({
										gallery: "#gallery--responsive-images",
										children: ".pswp-gallery__item",
										counter: false,
										bgOpacity: 1,
										closeSVG: leftArrow,
										zoomSVG: zoomIn,
										arrowNextSVG: nextArrow,
										arrowPrevSVG: prevArrow,
										// adjust viewport for design
										paddingFn: (viewportSize) => {
											return viewportSize.x < 700 ? smallScreenPadding : largeScreenPadding
										},
										pswpModule: () => import("photoswipe")
									});

									const matDesignPlugin = new PhotoswipeMatDesignPlugin(lightbox, {});

									const captionPlugin = new PhotoSwipeDynamicCaption(lightbox, {
										mobileLayoutBreakpoint: 700,
										type: "auto",
										mobileCaptionOverlapRatio: 1,
									});
									lightbox.init();
								}
							}).catch(() => {

							// no captions. Create gallery without captions
							const smallScreenPadding = {
								top: 64, bottom: 0, left: 0, right: 0
							};
							const largeScreenPadding = {
								top: 64, bottom: 24, left: 0, right: 0
							};
							const lightbox = new PhotoSwipeLightbox({
								gallery: "#gallery--responsive-images",
								children: "a",
								counter: false,
								bgOpacity: 1,
								closeSVG: leftArrow,
								zoomSVG: zoomIn,
								arrowNextSVG: nextArrow,
								arrowPrevSVG: prevArrow,
								paddingFn: (viewportSize) => {
									return viewportSize.x < 700 ? smallScreenPadding : largeScreenPadding
								},
								pswpModule: () => import("photoswipe")
							});
							
							const matDesignPlugin = new PhotoswipeMatDesignPlugin(lightbox, {});
							
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
	hideBackToTop();
	document.getElementById("contact").addEventListener("click", function () {
		showItem("contactpanel")
	});
	document.getElementById("privacy").addEventListener("click", function () {
		showItem("privacypanel")
	});

	window.onscroll = function (ev) {
		if (window.scrollY >= 200) {
			showBackToTop();
		} else {
			hideBackToTop();
			headerElem.classList.remove("header-scroll");
		}
		if (window.scrollY >= 1) {
			headerElem.classList.add("header-scroll");
		}
	}
}