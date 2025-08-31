import PhotoSwipeLightbox from "photoswipe/lightbox";
import PhotoSwipeDynamicCaption from "photoswipe-dynamic-caption-plugin";
import "./gallery.css"
import "photoswipe/style.css";
import PhotoswipeMatDesignPlugin from "./photoswipe-mat-design-plugin.js";
import {leftArrow, nextArrow, prevArrow, zoomIn} from "../../shared/icons/icons.js";
import PhotoswipeOpenLayersPlugin from "./photoswipe-ol-plugin.js";
import {createCldGallery, createGallery, createGalleryWithCaptions} from "./galleryfactory.js";

// cloudinary gallery
function buildCldGallery(translator, jsonHelper, category, routeId){
	jsonHelper.fetchBlogImages(category, routeId).then(
		(items) => {
			//gallery
			let gallerySection = document.querySelector(".blog__gallery");
			let galleryTitle = translator.translate("gallery.title");

			let galleryDescription = translator.translate("gallery.description");

			let gallery = document.createElement("div");
			gallery.classList.add("gallery");
			gallery.id = "gallery__responsive-images";

			let title = document.createElement("h2");
			title.innerText = galleryTitle;
			gallerySection.appendChild(title);

			let description = document.createElement("p");
			description.innerText = galleryDescription;
			gallerySection.appendChild(description);

			
				// no captions. Create gallery without captions
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

				let galleryPswp = createCldGallery(items, category, routeId, gallery);
				gallerySection.appendChild(galleryPswp);
				lightbox.init();
		}
	).catch((error) => {
		console.error(`An error occured in getting the translated blog items: ${error}`);
	});
}

export {buildCldGallery};