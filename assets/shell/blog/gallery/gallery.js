import "./gallery.css"
import "photoswipe/style.css";
import {lang} from "../../../language.js";
import {ApiBasePath} from "../../../config.js";

let isLoaded = false;

// I can reload photoswipe every time, but that feels a bit heavy. 

export const loadGallery = async (category, routeId) => {
	if(!isLoaded){
		await init();
		isLoaded = true;
	}

	const type = await getGalleryType(category, routeId);

	const gallerySection = document.querySelector(".blog__gallery");
	
	if (type === galleryTypes.none){
		gallerySection.classList.add("hide");
		// TODO empty gallery
		return;
	}
	
	gallerySection.classList.remove("hide");
	
	let gallery = document.getElementById("js-gallery");

	// TODO remove all children of gallery

	// each time. This is the heavy part!
	// TODO, I do NOT want to have a new eventListener every time this is hit.
	// if(document.querySelector("article").scrollHeight < app.clientHeight) {
	//  buildGallery(translator, jsonHelper, category, routeId);
	// }
	// else{
	// 	app.addEventListener("scroll", createImageGallery, true);
	// }
	switch (type) {
		case galleryTypes.none:
			break;
		case galleryTypes.default:
			const items = await fetchImages(category, routeId);
			gallery = createDefaultGallery(items, category, routeId);
			break;
		case galleryTypes.captions:
			const pf = await paraFetch(category, routeId);
			//loadCaptionsGallery(pf.items, pf.captions, category, routeId);

			// TODO build captions gallery
			break;
		case galleryTypes.map:
			// TODO build openlayers gallery
			break;
		default: {
			console.error(`Unknown gallery type: ${type}`);
			break;
		}
	}
	createDefaultGalleryComponent();
	
	
	// ToDo decouple lightbox from input
// ToDo isLoaded for lightbox
// ToDo galleryType IS input for the lightbox. functionality depends on type.
}

const init = async () => {
	const gallerySection = document.querySelector(".blog__gallery");
	gallerySection.innerHTML = galleryComponent();
	let gallery = document.createElement("div");
	gallery.classList.add("gallery");
	gallery.id = "js-gallery";
	gallerySection.appendChild(gallery);
	
}


const galleryTypes = {
	none: "none",
	default: "default",
	captions: "captions",
	map: "map"
};

// TODO implement
const getGalleryType = async (category, routeId) => {
	
	return galleryTypes.default;
}


const createDefaultGallery = (items, category, routeId) => {
	let gallery = document.getElementById("js-gallery");
	items.forEach((item) => {

		const link = createLink(item, category, routeId);
		gallery.appendChild(link);
	});
	return gallery;
}

const createDefaultGalleryComponent = () => {
	

	
	
	// TODO move these!
	const smallScreenPadding = {
		top: 64, bottom: 0, left: 0, right: 0
	};
	const largeScreenPadding = {
		top: 64, bottom: 24, left: 0, right: 0
	};
	const lightbox = createLightBox(smallScreenPadding, largeScreenPadding);
	// TODO: This should only be called once!
	lightbox.init();
}

// const loadCaptionsGallery = (items, captions, category, routeId) => {
// 	// create gallery with captions
// 	let galleryCaptions = createGalleryWithCaptions(items, captions, value, routeId, gallery);
// 	gallerySection.appendChild(galleryCaptions);
//
// 	const smallScreenPadding = {
// 		top: 64, bottom: 0, left: 0, right: 0
// 	};
// 	const largeScreenPadding = {
// 		top: 64, bottom: 24, left: 52, right: 52
// 	};
//
// 	const lightbox = createLightBox(smallScreenPadding, largeScreenPadding);
//
//
// 	const captionPlugin = new PhotoSwipeDynamicCaption(lightbox, {
// 		mobileLayoutBreakpoint: 700,
// 		type: "auto",
// 		mobileCaptionOverlapRatio: 1,
// 	});
// 	lightbox.init();
// }

const fetchImages = async (category, routeId) => {
	const response = await fetch(`${ApiBasePath}/${category}/${routeId}/images.json`);
	return response.json();
}

const fetchCaptions = async (category, routeId) => {
	const response = await fetch(`${ApiBasePath}/${category}/${routeId}/captions.${lang()}.json`);
	return response.json();
}


const paraFetch = async (category, routeId) => {
	return {
		items: await fetchImages(category, routeId),
		captions: await fetchCaptions(category, routeId)
	}
}

const galleryComponent = () =>{
	return `<h2 data-i18n="gallery.title">${translate("gallery.title")}</h2><p data-i18n="gallery.description">${translate("gallery.description")}</p>`;
}

import PhotoSwipeLightbox from "photoswipe/lightbox";
import {leftArrow, nextArrow, prevArrow, zoomIn} from "../../icons/icons.js";
import PhotoswipeMatDesignPlugin from "./photoswipe-mat-design-plugin.js";
import {createLink} from "./galleryfactory.js";
import {translate} from "../../../translator.js";

const createLightBox = (smallScreenPadding, largeScreenPadding) => {
	const lightbox = new PhotoSwipeLightbox({
		gallery: "#gallery__responsive-images",
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
	return lightbox;
}