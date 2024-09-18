import "../css/photoswipe-ol.css"
import Map from "ol/Map";
import {useGeographic} from "ol/proj";
import {Icon, Stroke, Style} from "ol/style";
import {Tile as TileLayer, Vector as VectorLayer} from "ol/layer";
import OSM from "ol/source/OSM";
import View from "ol/View";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";

const defaultOptions = {
	captionContent: ".pswp-caption-content",
};

class PhotoswipeOpenLayersPlugin {
	
	type = "side"; // side by default
	hidden = false;
	constructor(lightbox, route, options) {
		this._lightbox = lightbox;
		this._options = {...defaultOptions, ...options};
		this.type = this.usePortraitLayout() ? "bottom" : "side";

		lightbox.on("init", () => {
			console.log('init');
			this.pswp = this._lightbox.pswp;
			this.initSheet();			
		});

		lightbox.on('afterInit', () => {
			console.log('afterInit (load map)');
			this.loadNavMap(route);
		});

		lightbox.addFilter("uiElement", (element, data) => {
			console.log("add Filter (topbar style)");
			if(data.name === "close") {
				// TODO set translation here, does not work this way because translator did not discover elements not being in DOM
				element.setAttribute("data-i18n", "gallery.back");

				element.classList.add("top-nav");
			}
			if(data.name === "zoom") {
				element.classList.add("top-nav");
			}
			return element;
		})

		// change the order
		lightbox.on("firstUpdate", () => {
			console.log("first update (reorder topbar)");
			const closeEl = this.pswp.topBar.querySelector(".pswp__button--close");
			this.pswp.topBar.insertBefore(closeEl, this.pswp.topBar.firstChild);

		});

		lightbox.on("uiRegister", function() {
			lightbox.pswp.ui.registerElement({
				name: "sheet",
				className: "pswp__sheet",
				appendTo: "wrapper",
				onInit: (el, pswp) => {
					console.log("registering UI sheet");
					let captionContainer = document.createElement("div");
					captionContainer.className = "pswp__sheet-caption";
					el.appendChild(captionContainer);

					// let mapContainer = document.getElementById("galnavmap");
					// mapContainer.style.display = "block";
					let mapContainer = document.createElement("div");
					mapContainer.className = "pswp__sheet-map";
					mapContainer.id = "galnavmap";
					el.appendChild(mapContainer);

					let indicatorContainer = document.createElement("div");
					indicatorContainer.className = "pswp__sheet-indicator";
					const total = pswp.getNumItems();
					let index = pswp.currIndex + 1;

					let indicator = document.createElement("p");
					indicator.className = "pswp__indicator__text";
					indicator.innerText = index + " / " + total;

					pswp.on("change", (a,) => {
						index = pswp.currIndex + 1;
						indicator.innerText = index + " / " + total;
					});

					indicatorContainer.appendChild(indicator);
					el.dataset.pswpSheetType = "default"; // TODO needs to be some value in order to set the correct type
					el.appendChild(indicatorContainer);
				}
			});
		});
	}
		
	//TODO on windowresize, recalculate the sheet width
	initSheet() {
		const { pswp } = this;
		
		
		
		pswp.on("change", () => {
			console.log("pswp change event ");			
			// make sure caption is displayed after slides are switched
			this.showSheet(this.pswp.currSlide);
			this.loadCaption(this.pswp.currSlide);
		});

		pswp.on("calcSlideSize", (e) => this.onCalcSlideSize(e));
		//
		// pswp.on("slideDestroy", (e) => {
		// 	if (e.this.infoSheet) {
		// 		if (e.this.infoSheet.element) {
		// 			e.this.infoSheet.element.remove();
		// 		}
		// 		delete e.this.infoSheet;
		// 	}
		// });
		//
		// // hide sheet if zoomed
		// pswp.on("zoomPanUpdate", ({ slide }) => {
		// 	if (pswp.opener.isOpen && this.infoSheet) {
		// 		if (slide.currZoomLevel > slide.zoomLevels.initial) {
		// 			this.hideSheet(slide);
		// 		} else {
		// 			this.showSheet(slide);
		// 		}
		//
		// 		// move caption on vertical drag
		// 		if (this.infoSheet.element) {
		// 			let captionYOffset = 0;
		// 			if (slide.currZoomLevel <= slide.zoomLevels.initial) {
		// 				const shiftedAmount = slide.pan.y - slide.bounds.center.y;
		// 				if (Math.abs(shiftedAmount) > 1) {
		// 					captionYOffset = shiftedAmount;
		// 				}
		// 			}
		//
		// 			this.setCaptionYOffset(this.infoSheet.element, captionYOffset);
		// 		}
		//
		// 		this.adjustPanArea(slide, slide.currZoomLevel);
		// 	}
		// });
		//
		// pswp.on("beforeZoomTo", (e) => {
		// 	this.adjustPanArea(pswp.currSlide, e.destZoomLevel);
		// });
		//
		// // Stop default action of tap when tapping on the caption
		// pswp.on("tapAction", (e) => {
		// 	if (e.originalEvent.target.closest(".pswp__dynamic-caption")) {
		// 		e.preventDefault();
		// 	}
		// });
	}

	adjustPanArea(slide, zoomLevel) {
		if (this.infoSheet && this.infoSheet.adjustedPanAreaSize) {
			if (zoomLevel > slide.zoomLevels.initial) {
				slide.panAreaSize.x = this.infoSheet.originalPanAreaSize.x;
				slide.panAreaSize.y = this.infoSheet.originalPanAreaSize.y;
			} else {
				// Restore panAreaSize after we zoom back to initial position
				slide.panAreaSize.x = this.infoSheet.adjustedPanAreaSize.x;
				slide.panAreaSize.y = this.infoSheet.adjustedPanAreaSize.y;
			}
		}
	}
	
	

	// useMobileLayout() {
	// 	const { mobileLayoutBreakpoint } = this._options;
	//
	// 	if (typeof mobileLayoutBreakpoint === "function") {
	// 		return mobileLayoutBreakpoint.call(this);
	// 	} else if (typeof mobileLayoutBreakpoint === "number") {
	// 		if (window.innerWidth < mobileLayoutBreakpoint) {
	// 			return true;
	// 		}
	// 	}
	//
	// 	return false;
	// }

	hideSheet(slide) {
		let infoSheet= document.querySelector(".pswp__sheet");
		if (infoSheet && !this.hidden) {
			this.hidden = true;
			infoSheet.classList.add("pswp__sheet--faded"); 

			// Disable caption visibility with the delay, so it"s not interactable 
			if (slide.captionFadeTimeout) {
				clearTimeout(slide.captionFadeTimeout);
			}
			slide.captionFadeTimeout = setTimeout(() => {
				infoSheet.style.visibility = "hidden";
				delete slide.captionFadeTimeout;
			}, 400);
		}
	}

	setCaptionYOffset(el, y) {
		el.style.transform = `translateY(${y}px)`;
	}

	showSheet(slide) {
		let infoSheet= document.querySelector(".pswp__sheet");
		if (infoSheet && this.hidden) {

			this.hidden = false;
			infoSheet.style.visibility = "visible";

			clearTimeout(slide.captionFadeTimeout);
			slide.captionFadeTimeout = setTimeout(() => {
				infoSheet.classList.remove("pswp__sheet--faded");
				delete slide.captionFadeTimeout;
			}, 50);
		}
	}

	// TODO Remove this, the position of the sheet is fixed
	// setCaptionPosition(sheetElement, x, y) {
	// 	
	// 	const isOnHorizontalEdge = (x <= this._options.horizontalEdgeThreshold);
	// 	sheetElement.classList[
	// 		isOnHorizontalEdge ? "add" : "remove"
	// 		]("pswp__dynamic-caption--on-hor-edge");
	//
	// 	sheetElement.style.left = x + "px";
	// 	sheetElement.style.top = y + "px";
	// }

	// setsheetWidth(sheetElement, width) {
	// 	if (!width) {
	// 		sheetElement.style.removeProperty("width");
	// 	} else {
	// 		sheetElement.style.width = width + "px";
	// 	}
	// }

	setSheetWidth(sheetElement, width) {
		if (!width) {
			sheetElement.style.removeProperty("width");
		} else {
			sheetElement.style.width = width + "px";
		}
	}



	updateSheetPosition(slide, infoSheet) {
		console.log("Updating position");
		
		if (!infoSheet ) {
			console.error("No info sheet found, cannot reposition");
			return;
		}

		if (!this.type ) {
			console.error("No type found, cannot reposition");
			return;
		}

		const zoomLevel = slide.zoomLevels.initial;
		const imageWidth = Math.ceil(slide.width * zoomLevel);
		const imageHeight = Math.ceil(slide.height * zoomLevel);

		this.setSheetType(infoSheet, this.type);
		if (this.type === "side") {
			// this.setCaptionPosition(
			// 	this.infoSheet.element,
			// 	slide.bounds.center.x + imageWidth,
			// 	slide.bounds.center.y
			// );
			// this.setSheetWidth(this.infoSheet.element, false);
			this.setSheetWidth(infoSheet, false);
		} else if (this.type === "bottom") {
			// this.setCaptionPosition(
			// 	this.infoSheet.element,
			// 	slide.bounds.center.x,
			// 	slide.bounds.center.y + imageHeight
			// );
			// this.setSheetWidth(this.infoSheet.element, imageWidth);
			this.setSheetWidth(infoSheet, imageWidth);
		}
	}

	loadCaption(slide) {
		let infoSheet = document.querySelector(".pswp__sheet");

		if (!infoSheet) {
			console.error("No info sheet element found on loading caption");
			return;
		}

		let captionElement = document.querySelector(".pswp__sheet-caption");
		let captionHtml = this.getCaptionHtml(slide);

		if (!captionHtml) {
			captionHtml = "";
		}
		captionElement.innerHTML = captionHtml;
	}
	
	onCalcSlideSize(e) {
		const { slide } = e;
		let sheetSize;
		let usePortraitLayout = this.usePortraitLayout();
	
		console.log("Calculating slide size");
		
		let infoSheet= document.querySelector(".pswp__sheet");
		
		if (!infoSheet) {
			console.error("No info sheet element found on calculation of size");
			return;
		}

		// let hasCaption = document.querySelector(".pswp__sheet-caption").innerHTML.length > 0;
		// if(!hasCaption){
		// 	console.log("Loading caption from slide calculating size");
		// 	this.loadCaption(slide);
		// }
		
		this.setSheetType(infoSheet, this.type);
		
		this.storeOriginalPanAreaSize(slide, infoSheet);

		slide.bounds.update(slide.zoomLevels.initial);

		this.type = usePortraitLayout ? "bottom" : "side";

		const imageWidth = Math.ceil(slide.width * slide.zoomLevels.initial);
		const imageHeight = Math.ceil(slide.height * slide.zoomLevels.initial);
		
		// sideSheet
		if (!usePortraitLayout) {
			
			this.setSheetWidth(infoSheet, false); // removes width inline style
			sheetSize = this.measureSheetSize(infoSheet, e.slide);
			
			// Move picture to middle of the available space
			const sheetWidth = sheetSize.x;

			const horizontalEnding = imageWidth + slide.bounds.center.x;
			const horizontalLeftover = (slide.panAreaSize.x - horizontalEnding);

			if (horizontalLeftover <= sheetWidth) {
				slide.panAreaSize.x -= sheetWidth;
				this.recalculateZoomLevelAndBounds(slide);
			} else {
				// do nothing, caption will fit aside without any adjustments
			}
		}
		// bottomSheet
		if (usePortraitLayout) {
			this.setsheetWidth(
				this.infoSheet.element,
				useMobileVersion ? this.pswp.viewportSize.x : imageWidth
			);

			sheetSize = this.measureSheetSize(this.infoSheet.element, e.slide);
			const captionHeight = sheetSize.y;

			if (this._options.verticallyCenterImage) {
				slide.panAreaSize.y -= captionHeight;
				this.recalculateZoomLevelAndBounds(slide);
			} else {
				// ToDo Lift the image [not] only by caption height, but also for map

				// vertical ending of the image
				const verticalEnding = imageHeight + slide.bounds.center.y;

				// height between bottom of the screen and ending of the image
				// (before any adjustments applied) 
				const verticalLeftover = slide.panAreaSize.y - verticalEnding;
				const initialPanAreaHeight = slide.panAreaSize.y;

				if (verticalLeftover <= captionHeight) {
					// lift up the image to give more space for caption
					slide.panAreaSize.y -= Math.min((captionHeight - verticalLeftover) * 2, captionHeight);

					// we reduce viewport size, thus we need to update zoom level and pan bounds
					this.recalculateZoomLevelAndBounds(slide);

					const maxPositionX = slide.panAreaSize.x * this._options.mobileCaptionOverlapRatio / 2;

					// Do not reduce viewport height if too few space available
					if (useMobileVersion
						&& slide.bounds.center.x > maxPositionX) {
						// Restore the default position
						slide.panAreaSize.y = initialPanAreaHeight;
						this.recalculateZoomLevelAndBounds(slide);
					}
				}
			}
		} 

		this.storeAdjustedPanAreaSize(slide, infoSheet);
		this.updateSheetPosition(slide, infoSheet);
	}

	measureSheetSize(sheetElement, slide) {
		const rect = sheetElement.getBoundingClientRect();
		const event = this.pswp.dispatch("infoSheetMeasureSize", {
			sheetElement,
			slide,
			sheetSize: {
				x: rect.width,
				y: rect.height
			}
		});
		return event.sheetSize;
	}

	recalculateZoomLevelAndBounds(slide) {
		slide.zoomLevels.update(slide.width, slide.height, slide.panAreaSize);
		slide.bounds.update(slide.zoomLevels.initial);
	}
	

	// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
	// This part is OK!!
	usePortraitLayout() {
		return window.innerHeight > window.innerWidth;
	}
	
	setSheetType(sheetElement, type) {
		console.log("Setting sheet type");
		const prevType = sheetElement.dataset.pswpSheetType;
		if(type !== prevType) {
			sheetElement.classList.add("pswp__sheet--" + type);
			sheetElement.classList.remove("pswp__sheet--" + prevType);
			sheetElement.dataset.pswpSheetType = type;
		}
	}
	
	loadNavMap(route) {
		let navMap;

		useGeographic();

		// the styles
		const styles = {
			"picture": new Style({
				image: new Icon({
					opacity: 0.9,
					scale: 0.9,
					size: [52, 52],
					src: "ui/pics/photomarker.png",
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
		navMap = new Map({
			target: "galnavmap",
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

		// TODO: focus on item
		railVector.getSource().on("featuresloadend", function (event) {
			event.features.forEach(function (feature) {
				feature.set("type", "rail");
				let center = feature.getGeometry().getCoordinateAt(0.5);
				view.centerOn(center, navMap.getSize(), [navMap.getSize()[0] / 2, navMap.getSize()[1] / 2]);
				view.fit(feature.getGeometry(), {padding: [50, 50, 50, 50]});
			});
		});

		navMap.addLayer(railVector);
	}
	
	storeAdjustedPanAreaSize(slide, infoSheet) {
		if (infoSheet) {
			if (!infoSheet.adjustedPanAreaSize) {
				infoSheet.adjustedPanAreaSize = {};
			}
			infoSheet.adjustedPanAreaSize.x = slide.panAreaSize.x;
			infoSheet.adjustedPanAreaSize.y = slide.panAreaSize.y;
		}
	}
	
	storeOriginalPanAreaSize(slide, infoSheet) {
		if (infoSheet) {
			if (!infoSheet.originalPanAreaSize) {
				infoSheet.originalPanAreaSize = {};
			}
			infoSheet.originalPanAreaSize.x = slide.panAreaSize.x;
			infoSheet.originalPanAreaSize.y = slide.panAreaSize.y;
		}
	}

	getCaptionHtml(slide) {
		if (typeof this._options.captionContent === "function") {
			return this._options.captionContent.call(this, slide);
		}

		const currSlideElement = slide.data.element;
		let captionHTML = "";
		if (currSlideElement) {
			const hiddenCaption = currSlideElement.querySelector(this._options.captionContent);
			if (hiddenCaption) {
				// get caption from element with class pswp-caption-content
				captionHTML = hiddenCaption.innerHTML;
			} else {
				const img = currSlideElement.querySelector("img");
				if (img) {
					// get caption from alt attribute
					captionHTML = img.getAttribute("alt");
				}
			}
		}
		return captionHTML;
	}
}



export default PhotoswipeOpenLayersPlugin;