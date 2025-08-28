import PhotoSwipeLightbox from "photoswipe/lightbox";
import PhotoSwipeDynamicCaption from "photoswipe-dynamic-caption-plugin";
import "./gallery.css"
import "photoswipe/style.css";
import PhotoswipeMatDesignPlugin from "./photoswipe-mat-design-plugin.js";
import {leftArrow, nextArrow, prevArrow, zoomIn} from "../../shared/icons/icons.js";
import PhotoswipeOpenLayersPlugin from "./photoswipe-ol-plugin.js";
import {createGallery, createGalleryWithCaptions} from "./galleryfactory.js";


function buildGallery(translator, jsonHelper, value, routeId){
	jsonHelper.fetchBlogImages(value, routeId).then(
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

			// if there are captions // TODO What blogs have captions?
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

				let galleryPswp = createGallery(items, value, routeId, gallery);
				gallerySection.appendChild(galleryPswp);
				lightbox.init();
			});
		}
	).catch((error) => {
		console.error(`An error occured in getting the translated blog items: ${error}`);
	});
}

export {buildGallery};