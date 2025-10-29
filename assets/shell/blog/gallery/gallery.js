import "./gallery.css"
import "photoswipe/style.css";
import "./captions.css"
import {lang} from "../../../language.js";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import {leftArrow, nextArrow, prevArrow, zoomIn} from "../../../shared/icons/icons.js";
import PhotoswipeMatDesignPlugin from "./photoswipe-mat-design-plugin.js";
import {createLink} from "./galleryfactory.js";
import {translate} from "../../../translator.js";
import PhotoswipeOpenLayersPlugin from "./photoswipe-ol-plugin.js";
import PhotoSwipeDynamicCaption from "photoswipe-dynamic-caption-plugin";
import {apiBasePath} from "../../../config.js";

// I will reload the gallery each time.

let categoryCache = "";
let routeIdCache = "";

export const loadGallery = async (category, routeId) => {
	categoryCache = category;
	routeIdCache = routeId.toLowerCase();
	const app = document.getElementById("js-app");
	app.removeEventListener("scroll", onScrollCreateGallery, true);
	
	if (document.querySelector("article").scrollHeight < app.clientHeight) {
		await createGallery(category, routeId);
	}
	else{
	 	app.addEventListener("scroll", onScrollCreateGallery, true);
	}
}

const onScrollCreateGallery = async () => {
	const app = document.getElementById("js-app");
	if (app.scrollTop + app.clientHeight >= app.scrollHeight-200){
		app.removeEventListener("scroll", onScrollCreateGallery, true);
		await createGallery(categoryCache, routeIdCache);
	}
}

const createGallery = async (category, routeId) => {
	const type = await getGalleryType(category, routeId);
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
		case galleryTypes.default:
			const items = await fetchImages(category, routeId);
			items.forEach((item) => {
				const link = createLink(item, category, routeId);
				gallery.appendChild(link);
			});
			break;
		case galleryTypes.captions:
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
	default: "default",
	captions: "captions",
	map: "map"
};

// TODO implement
const getGalleryType = async (category, routeId) => {
	
	if(category === "spoor")
		return galleryTypes.map;
	
	return galleryTypes.default;
}

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
		case galleryTypes.default:
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
	const response = await fetch(`${apiBasePath()}/${category}/${routeId}/images.json`);
	return response.json();
}

const fetchCaptions = async (category, routeId) => {
	const response = await fetch(`${apiBasePath()}/${category}/${routeId}/captions.${lang()}.json`);
	return response.json();
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