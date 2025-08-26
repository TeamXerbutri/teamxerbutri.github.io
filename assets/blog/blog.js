import Map from "ol/Map";
import {initializeBackToTop, backToTopHtml} from "../shared/backtotop/backtotop.js";
import Translator from "../js/translator.js";
import JsonHelper from "./jsonhelper.js";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import PhotoSwipeDynamicCaption from "photoswipe-dynamic-caption-plugin";
import "./gallery/gallery.css"
import "photoswipe/style.css";
import {createGallery, createGalleryWithCaptions} from "./gallery/galleryfactory.js";
import {useGeographic} from "ol/proj";
import {Icon, Stroke, Style} from "ol/style";
import {Tile as TileLayer, Vector as VectorLayer} from "ol/layer";
import OSM from "ol/source/OSM";
import View from "ol/View";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import PhotoswipeMatDesignPlugin from "./photoswipe-mat-design-plugin.js";
import {leftArrow, nextArrow, prevArrow, zoomIn} from "../shared/icons/icons.js";
import PhotoswipeOpenLayersPlugin from "./photoswipe-ol-plugin.js";
import { initializeBlogHeader} from "../shared/header/header.js";
import handleNotFound from "./notfound/notfound.js";

function countProperties(obj) {
	let count = 0;

	for (const prop in obj) {
		if (obj.hasOwnProperty(prop))
			++count;
	}

	return count;
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
			url: "../data/spoor/" + route + "/geometry.json",
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

export function initBlog() {
	let translator = new Translator();
	let jsonHelper = new JsonHelper();

	let app = document.getElementById("js-app");
	app.innerHTML = `
		<div class="modal__dismiss backdrop hide"></div>
		<div class="blog__title"></div>
		<article id="href-top">
		<p class="blog__author-visit blog_ital"></p>
		<p class="blog__intro"></p>
		<aside class="blog__facts"></aside>
		<section class="blog__content"></section>
		<p class="blog__updated blog_ital"></p>
		<section class="blog__sources"></section>
		<section id="article-gallery"></section>
		</article>
		${backToTopHtml}
		<script id="jsonld" type="application/ld+json"></script>
		`
	app.classList.add('blog');

	translator.load().then(() => {
		setTranslatedContent();
	}).catch((error) => {
		console.error(`An error occured in getting the translations: ${error}`);
	});

	const htmlElement = document.querySelector("html");
	
	if (htmlElement.classList.contains("overflow-hidden")) 
		htmlElement.classList.remove("overflow-hidden");
	
	initializeBlogHeader();

	let url = window.location.href;
	if (window.location.hash.length > 1) {
		// everything before the hash
		url = window.location.href.split("#")[0];
	}

	let routeId = url.split("/").pop().toLowerCase();
	
	function setTranslatedContent() {
		function constructBlog(value) {

			translator.fetchBlogLanguageContent(value, routeId).then(
				(blogContent) => {
					document.title = blogContent.shortname + " - Xerbutri Urban Exploring";
					document.querySelector('meta[name="description"]').setAttribute("content", blogContent.description);
					document.querySelector(".blog__title").innerHTML = `<h1>${blogContent.title}</h1>`;
					// intro
					document.querySelector(".blog__intro").innerHTML = blogContent.intro;

					// adventure and history
					let articleContent = document.querySelector(".blog__content");
					if (blogContent.adventure !== undefined && blogContent.adventure !== "") {
						const adventureTitle = translator.translate("adventure");

						articleContent.innerHTML += `<h2>${adventureTitle}</h2>`;
						articleContent.innerHTML += blogContent.adventure;
					}

					if (blogContent.history !== undefined && blogContent.history !== "") {
						let historyTitle = translator.translate("history");

						articleContent.innerHTML += `<h2>${historyTitle}</h2>`;
						articleContent.innerHTML += blogContent.history;
					}

					const year = blogContent.created.split("-")[0];
					const month = blogContent.created.split("-")[1];

					let monthBlog = translator.translate(`month.${month}`);

					document.querySelector(".blog__author-visit").innerHTML = `${blogContent.author} -  ${monthBlog} ${year}`;

					let updatedSplit = blogContent.updated.split("-");

					document.querySelector(".blog__updated").innerHTML = translator.translate("article.lastupdate") + translator.localDate(updatedSplit[2], updatedSplit[1], updatedSplit[0]);
				},
			).catch((error) => {
				console.error(`An error occured in getting the translated blog content: ${error}`);
			});

			jsonHelper.fetchBlogFacts(value, routeId).then(
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
						document.querySelector(".blog__facts").appendChild(ul);
					}
					if (countProperties(blogFacts.facts) <= 0) {
						document.querySelector(".blog__facts").style.display = "none";
					}

					if (blogFacts.sources.length > 0) {
						let sourceTitle = translator.translate("sources.title");
						let sourceDescription = translator.translate("sources.description");
						let articleSources = document.querySelector(".blog__sources");

						articleSources.innerHTML += `<h2>${sourceTitle}</h2>`;
						articleSources.innerHTML += `<p>${sourceDescription}</p>`;
						let sourceList = "";
						blogFacts.sources.forEach(function (source) {

							let visitedOnDateArray = source.date.split("-");
							let visitedOn = translator.translate("sources.visited") + translator.localDate(visitedOnDateArray[2], visitedOnDateArray[1], visitedOnDateArray[0]);

							sourceList += `<li> <a href="${source.url}" title="${source.title}" target="_blank">${source.title}</a> <i>${visitedOn}</i></li>`;
						});
						articleSources.innerHTML += `<ol>${sourceList}</ol>`;
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

			jsonHelper.fetchBlogImages(value, routeId).then(
				(items) => {
					//gallery
					let gallerySection = document.getElementById("article-gallery");
					let galleryTitle = translator.translate("gallery.title");

					let galleryDescription = translator.translate("gallery.description");

					let gallery = document.createElement("div");
					gallery.classList.add("gallery");
					gallery.id = "gallery--responsive-images";

					let title = document.createElement("h2");
					title.innerText = galleryTitle;
					gallerySection.appendChild(title);

					let description = document.createElement("p");
					description.innerText = galleryDescription;
					gallerySection.appendChild(description);

					// if there are captions
					translator.fetchBlogCaptions(value, routeId).then(
						(captions) => {

							//if the object has coordinates, create gallery with captions and openlayers map
							jsonHelper.fetchBlogPhotos(value, routeId).then(
								(photos) => {
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
								}).catch(() => {

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
							});
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

		translator.getBlogDataById(routeId).then(
			(value) => {

				if (!value) {
					handleNotFound(translator, jsonHelper, routeId)
					return;
				}
				
				constructBlog(value);
			}
		).catch((error) => {
			console.error(`An error occured in getting the translated blog data ${error}`);
		});
	}

	initializeBackToTop();
}