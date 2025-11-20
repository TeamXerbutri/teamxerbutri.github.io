import "./gallery.css"
import "photoswipe/style.css";
import "./captions.css"
import PhotoSwipeLightbox from "photoswipe/lightbox";
import {leftArrow, nextArrow, prevArrow, zoomIn} from "../../../../shared/icons/icons.js";
import PhotoswipeMatDesignPlugin from "./photoswipe-mat-design-plugin.js";
import {createLink} from "./galleryfactory.js";
import {translate} from "../../../../translator.js";
import PhotoswipeOpenLayersPlugin from "./photoswipe-ol-plugin.js";
import PhotoSwipeDynamicCaption from "photoswipe-dynamic-caption-plugin";
import {apiBasePath} from "../../../../config.js";
import {get} from "../../../../helpers.js";
import {lang} from "../../../../language.js";

// I will reload the gallery each time.

let categoryCache = "";
let routeIdCache = "";
let galleryTypeCache = "none";

export const loadGallery = async (category, routeId, galleryType) => {
	categoryCache = category;
	routeIdCache = routeId.toLowerCase();
	galleryTypeCache = galleryType.toLowerCase();
	const app = document.getElementById("js-app");
	app.removeEventListener("scroll", onScrollCreateGallery, true);
	
	if (document.querySelector("article").scrollHeight < app.clientHeight) {
		await createGallery(category, routeId, galleryType);
	}
	else{
	 	app.addEventListener("scroll", onScrollCreateGallery, true);
	}
}

const onScrollCreateGallery = async () => {
	const app = document.getElementById("js-app");
	if (app.scrollTop + app.clientHeight >= app.scrollHeight-200){
		app.removeEventListener("scroll", onScrollCreateGallery, true);
		await createGallery(categoryCache, routeIdCache, galleryTypeCache);
	}
}

const createGallery = async (category, routeId, type) => {
	let gallerySection = document.querySelector(".blog__gallery");
	
	if (type === galleryTypes.none){
		gallerySection.hidden = true;
		return;
	}

	gallerySection.hidden = false;
	gallerySection.innerHTML = `<h2>${translate("gallery.title")}</h2><p>${translate("gallery.description")}</p>`;
	let gallery = document.createElement("div");
	gallery.classList.add("gallery");
	gallery.id = "js-gallery";
	
	switch (type) {
		case galleryTypes.none:
			break;
		case galleryTypes.images:
			const items = await fetchImages(category, routeId);
			items.forEach((item) => {
				const link = createLink(item, category, routeId);
				gallery.appendChild(link);
			});
			break;
		case galleryTypes.map:
			const pf = await paraFetch(category, routeId);
			pf.items.forEach((item) => {
				const link = createLink(item, category, routeId);
				if(pf.captions[item.name]) {
					let captionDiv = document.createElement("div");
					captionDiv.classList.add("pswp-caption-content");
					const caption = decodeHtml(pf.captions[item.name]);
					link.title = caption
					captionDiv.innerText = caption;
					link.appendChild(captionDiv);
				}

				gallery.appendChild(link);
			});
			break;
		default: {
			console.error(`Unknown gallery type: ${type}`);
			break;
		}
	}
	gallerySection.appendChild(gallery);
	createGalleryComponent(type, routeId);
}

const galleryTypes = {
	none: "none",
	images: "images",
	map: "map"
};

const createGalleryComponent = (type, routeId) => {

	const smallScreenPadding = {
		top: 64, bottom: 0, left: 0, right: 0
	};
	let largeScreenPadding = {
		top: 64, bottom: 24, left: 0, right: 0
	};
	if(type === galleryTypes.map || type === galleryTypes.captions)
	largeScreenPadding = {
		top: 64, bottom: 24, left: 52, right: 52
	};

	const lightbox = createLightBox(smallScreenPadding, largeScreenPadding);
	
	switch (type) {
		case galleryTypes.none:
		case galleryTypes.images:
			break;
		case galleryTypes.captions:
			const captionPlugin = new PhotoSwipeDynamicCaption(lightbox, {
				mobileLayoutBreakpoint: 700,
				type: "auto",
				mobileCaptionOverlapRatio: 1,
			});
			break;
		case galleryTypes.map:
			const olPlugin = new PhotoswipeOpenLayersPlugin(lightbox, routeId, {});
			break;
		default: {
			console.error(`Unknown gallery type: ${type}`);
			break;
		}
	}
	
	lightbox.init();
}

const fetchImages = async (category, routeId) => {
	try {
		const response = await get(`${apiBasePath()}/${category}/${routeId}/images.json`);
		return response.json();
	} catch (error) {
		console.error(`Error fetching images for ${category}/${routeId}:`, error);
		return [];
	}
	
}

const fetchCaptions = async (category, routeId) => {
	try {
		const response = await get(`${apiBasePath()}/${category}/${routeId}/captions.${lang()}.json`);
		return response.json();
	} catch (error) {
		console.error(`Error fetching captions for ${category}/${routeId}:`, error);
		return {};
	}
}

const paraFetch = async (category, routeId) => {
	return {
		items: await fetchImages(category, routeId),
		captions: await fetchCaptions(category, routeId)
	}
}

const createLightBox = (smallScreenPadding, largeScreenPadding) => {
	const lightbox = new PhotoSwipeLightbox({
		gallery: "#js-gallery",
		children: ".gallery__item",
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
	return lightbox;
}

function decodeHtml(html) {
	let txt = document.createElement("textarea");
	txt.innerHTML = html;
	return txt.value;
}