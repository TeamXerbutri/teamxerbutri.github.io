import {createLink, galleryComponent} from "./galleryfactory.js";
import {ApiBasePath} from "../../../config.js";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import {leftArrow, nextArrow, prevArrow, zoomIn} from "../../../ye-old-code/shared/icons/icons.js";
import PhotoswipeMatDesignPlugin from "../../../ye-old-code/blog/gallery/photoswipe-mat-design-plugin.js";

const createGallery = (items, category, routeId) => {
	let gallery = document.createElement("div");
	gallery.classList.add("gallery");
	gallery.id = "gallery__responsive-images";
	items.forEach((item) => {
		
		const link = createLink(item, category, routeId);
		gallery.appendChild(link);
	});
	return gallery;
}

const fetchImages = async (category, routeId) => {
	const response = await fetch(`${ApiBasePath}/${category}/${routeId}/images.json`);
	return response.json();
}

export const loadGallery = async (category, routeId) => {
	const gallerySection = galleryComponent();
	const items = await fetchImages(category, routeId);
	
	const smallScreenPadding = {
		top: 64, bottom: 0, left: 0, right: 0
	};
	const largeScreenPadding = {
		top: 64, bottom: 24, left: 0, right: 0
	};
	const lightbox = new PhotoSwipeLightbox({
		gallery: "#gallery__responsive-images",
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

	const gallery = createGallery(items, category, routeId);
	gallerySection.appendChild(gallery);
	lightbox.init();
}