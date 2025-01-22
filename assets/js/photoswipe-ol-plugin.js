import "../css/photoswipe-ol.css"
import Map from "ol/Map";
import {useGeographic} from "ol/proj";
import {Icon, Stroke, Style} from "ol/style";
import {Tile as TileLayer, Vector as VectorLayer} from "ol/layer";
import OSM from "ol/source/OSM";
import View from "ol/View";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import {Select} from "ol/interaction";
import {click, pointerMove} from "ol/events/condition";

const defaultOptions = {
	captionContent: ".pswp-caption-content",
};

class PhotoswipeOpenLayersPlugin {

	type = "side"; // side by default

	constructor(lightbox, route, options) {
		this._lightbox = lightbox;
		this._options = {...defaultOptions, ...options};
		this.type = this.usePortraitLayout() ? "bottom" : "side";

		lightbox.on("init", () => {
			this.pswp = this._lightbox.pswp;
			this.initSheet();
		});

		lightbox.addFilter("uiElement", (element, data) => {
			if (data.name === "close") {
				// TODO set translation here, does not work this way because translator did not discover elements not being in DOM
				element.setAttribute("data-i18n", "gallery.back");

				element.classList.add("top-nav");
			}
			if (data.name === "zoom") {
				element.classList.add("top-nav");
			}
			return element;
		})

		// change the order
		lightbox.on("firstUpdate", () => {
			const closeEl = this.pswp.topBar.querySelector(".pswp__button--close");
			this.pswp.topBar.insertBefore(closeEl, this.pswp.topBar.firstChild);
		})

		lightbox.on("afterInit", () => {
			this.loadNavMap(route);
		})

		lightbox.on("uiRegister", function () {
			lightbox.pswp.ui.registerElement({
				name: "sheet",
				className: "pswp__sheet",
				appendTo: "wrapper",
				onInit: (el, pswp) => {
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
		const {pswp} = this;


		pswp.on("change", () => {
			// make sure caption is displayed after slides are switched
			this.showSheet(this.pswp.currSlide);
			this.loadCaption(this.pswp.currSlide);
		});

		pswp.on("calcSlideSize", (e) => this.onCalcSlideSize(e));
		
		pswp.on("slideDestroy", (e) => {
			if (e.infoSheetData) {
				delete e.infoSheetData;
			}
		});

		// hide sheet if zoomed
		pswp.on("zoomPanUpdate", ({ slide }) => {
			let infoSheet = document.querySelector(".pswp__sheet");
			if (pswp.opener.isOpen && slide.infoSheetData) {
				if (slide.currZoomLevel > slide.zoomLevels.initial) {
					this.hideSheet(slide);
				} else {
					this.showSheet(slide);
				}

				// move caption on vertical drag
				if (infoSheet) {
					let captionYOffset = 0;
					if (slide.currZoomLevel <= slide.zoomLevels.initial) {
						const shiftedAmount = slide.pan.y - slide.bounds.center.y;
						if (Math.abs(shiftedAmount) > 1) {
							captionYOffset = shiftedAmount;
						}
					}

					this.setCaptionYOffset(infoSheet, captionYOffset);
				}

				this.adjustPanArea(slide, slide.currZoomLevel);
			}
		});
		
		pswp.on("beforeZoomTo", (e) => {
			this.adjustPanArea(pswp.currSlide, e.destZoomLevel);
		});
		
		// Stop default action of tap when tapping on the sheet
		pswp.on("tapAction", (e) => {
			if (e.originalEvent.target.closest(".pswp__sheet")) {
				e.preventDefault();
			}
		});

		// Stop colliding actions on map
		pswp.on("pointerMove", (e) => {
			if (e.originalEvent.target.closest(".pswp__sheet-map")) {
				e.preventDefault();
			}
		});

		pswp.on("verticalDrag", (e) => {
			if(!e.originalEvent){
				e.preventDefault();
				return;
			}
			if (e.originalEvent.target.closest(".pswp__sheet-map")) {
				e.preventDefault();
			}
		});

		pswp.on("pinchClose", (e) => {
			if(!e.originalEvent){
				e.preventDefault();
				return;
			}
			if (e.originalEvent.target.closest(".pswp__sheet-map")) {
				e.preventDefault();
			}
		});
	}

	adjustPanArea(slide, zoomLevel) {
		if (slide.infoSheetData && slide.infoSheetData.adjustedPanAreaSize) {
			if (zoomLevel > slide.zoomLevels.initial) {
				slide.panAreaSize.x = slide.infoSheetData.originalPanAreaSize.x;
				slide.panAreaSize.y = slide.infoSheetData.originalPanAreaSize.y;
			} else {
				// Restore panAreaSize after we zoom back to initial position
				slide.panAreaSize.x = slide.infoSheetData.adjustedPanAreaSize.x;
				slide.panAreaSize.y = slide.infoSheetData.adjustedPanAreaSize.y;
			}
		}
	}

	hideSheet(slide) {
		let infoSheet = document.querySelector(".pswp__sheet");
		if (slide.infoSheetData && !slide.infoSheetData.hidden) {
			slide.infoSheetData.hidden = true;
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
		let infoSheet = document.querySelector(".pswp__sheet");
		if (slide.infoSheetData && slide.infoSheetData.hidden) {

			slide.infoSheetData.hidden = false;
			infoSheet.style.visibility = "visible";

			clearTimeout(slide.captionFadeTimeout);
			slide.captionFadeTimeout = setTimeout(() => {
				infoSheet.classList.remove("pswp__sheet--faded");
				delete slide.captionFadeTimeout;
			}, 50);
		}
	}

	updateSheetSize(slide, infoSheet) {
		if (!infoSheet) {
			console.error("No info sheet found, cannot reposition");
			return;
		}

		if (!this.type) {
			console.error("No type found, cannot reposition");
			return;
		}

		const zoomLevel = slide.zoomLevels.initial;
		
		const mapElement = document.getElementById("galnavmap");
		mapElement.style.removeProperty("height");
		this.setSheetType(infoSheet, this.type);
		if (this.type === "side") {
			// calculate map size
			let sheetSize = this.measureSheetSize(infoSheet, slide);
			const captionElement = document.querySelector(".pswp__sheet-caption");
			const captionSize = captionElement.getBoundingClientRect();
			const mapHeight = sheetSize.y - captionSize.height - 76;
			
			if(mapHeight < 260){
				mapElement.style.height = mapHeight + "px";
			}
		} else if (this.type === "bottom") {
			if(window.innerHeight>900){
				mapElement.style.height = "200px";
			}
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

	// The pre of using onCalcSlide is that it uses preloader. We NEED to store the stuff in slide, not in infoSheet
	onCalcSlideSize(e) {
		const {slide} = e;
		let sheetSize;
		let usePortraitLayout = this.usePortraitLayout();
		
		if(!slide.infoSheetData){
			slide.infoSheetData ={
				hidden: false
			}
		}
		
		let infoSheet = document.querySelector(".pswp__sheet");

		if (!infoSheet) {
			console.error("No info sheet element found on calculation of size");
			return;
		}

		this.setSheetType(infoSheet, this.type);

		this.storeOriginalPanAreaSize(slide);

		slide.bounds.update(slide.zoomLevels.initial);

		this.type = usePortraitLayout ? "bottom" : "side";

		const imageWidth = Math.ceil(slide.width * slide.zoomLevels.initial);
		const imageHeight = Math.ceil(slide.height * slide.zoomLevels.initial);

		// sideSheet
		if (!usePortraitLayout) {
			//TODO incorrect sheet size calculation, because I am not sure what the infoSheet contains at this moment!!
	
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
			let mapElement = document.getElementById("galnavmap");
			if(window.innerHeight>900){
				mapElement.style.height = "200px";
			}
			// use the correct caption for size measurements
			const captionHtml = this.getCaptionHtml(slide);
			const captionElement = infoSheet.querySelector(".pswp__sheet-caption");
			const prevCaption = captionElement.innerHTML;
			captionElement.innerHTML = captionHtml;
			sheetSize = this.measureSheetSize(infoSheet, e.slide);
			const captionHeight = sheetSize.y;
			captionElement.innerHTML = prevCaption;

			if (this._options.verticallyCenterImage) {
				slide.panAreaSize.y -= captionHeight;
				this.recalculateZoomLevelAndBounds(slide);
			} else {
				// Lift the image for sheet height 

				// vertical ending of the image
				const verticalEnding = imageHeight + slide.bounds.center.y;

				// height between bottom of the screen and ending of the image
				// (before any adjustments applied) 
				const verticalLeftover = slide.panAreaSize.y - verticalEnding;
				const initialPanAreaHeight = slide.panAreaSize.y;

				if (verticalLeftover <= captionHeight) {
					// lift the image to give more space for caption
					slide.panAreaSize.y -= Math.min((captionHeight - verticalLeftover) * 2, captionHeight);

					// we reduce viewport size, thus we need to update zoom level and pan bounds
					this.recalculateZoomLevelAndBounds(slide);

					const maxPositionX = slide.panAreaSize.x * this._options.mobileCaptionOverlapRatio / 2;

					// Do not reduce viewport height if too few space available
					if (usePortraitLayout
						&& slide.bounds.center.x > maxPositionX) {
						// Restore the default position
						slide.panAreaSize.y = initialPanAreaHeight;
						this.recalculateZoomLevelAndBounds(slide);
					}
				}
			}
		}

		this.storeAdjustedPanAreaSize(slide);
		this.updateSheetSize(slide, infoSheet);
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



	usePortraitLayout() {
		return window.innerHeight > window.innerWidth;
	}

	setSheetType(sheetElement, type) {
		const prevType = sheetElement.dataset.pswpSheetType;
		let mapElement = document.getElementById("galnavmap");
		if (type !== prevType) {
			mapElement.classList.add("pswp__sheet-map--" + type);
			mapElement.classList.remove("pswp__sheet-map--" + prevType);
			sheetElement.classList.add("pswp__sheet--" + type);
			sheetElement.classList.remove("pswp__sheet--" + prevType);
			sheetElement.dataset.pswpSheetType = type;
		}
	}

	loadNavMap(route) {
		let navMap;
		let featuresLoaded = false;
		useGeographic();

		// the styles
		const styles = {
			"picture": new Style({
				image: new Icon({
					opacity: 0.7,
					scale: 0.7,
					size: [52, 52],
					src: "../ui/pics/photomarker.png",
				}),
			}),
			"pictureselect": new Style({
				image: new Icon({
					opacity: 1,
					scale: 1,
					size: [52, 52],
					src: "../ui/pics/photomarker.png",
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
			zoom: 14
		});

		// map
		navMap = new Map({
			target: "galnavmap",
			layers: [raster],
			view: view,
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

		const photoVectorSource = new VectorSource({
			url: "../data/spoor/" + route + "/photos.json",
			format: new GeoJSON(),
		})

		const photoVector = new VectorLayer({
			source: photoVectorSource,
			style: function (feature) {
				return styles[feature.get("type")];
			}
		});

		railVector.getSource().on("featuresloadend", function (event) {
			event.features.forEach(function (feature) {
				feature.set("type", "rail");
			});
		});

		photoVector.getSource().on("featuresloadend", function (event) {
			const index = pswp.currSlide.index;

			event.features.forEach(function (feature) {
				feature.set("type", "picture");

				if (feature.get("Index") === index) {
					feature.set("type", "pictureselect");
					navMap.getView().setCenter(feature.getGeometry().getCoordinates());
				}
			});

			featuresLoaded = true;
		});

		navMap.addLayer(railVector);
		navMap.addLayer(photoVector);

		// select, selected and hover functionality

		const selectPointerMove = new Select({
			condition: pointerMove,
			layers: [photoVector],
			style: function (feature) {
				return styles["pictureselect"];
			},
		});
		navMap.addInteraction(selectPointerMove);


		navMap.on("pointermove", function (event) {
			if (event.dragging) {
				return;
			}
			const pixel = navMap.getEventPixel(event.originalEvent);
			photoVector.getFeatures(pixel).then(function (features) {
				const feature = features.length ? features[0] : undefined;

				navMap.getViewport().style.cursor = feature ? "pointer" : "";
			});
		});

		const selectClick = new Select({
			condition: click,
			style: function (feature) {
				return styles[feature.get("type")];
			}
		});
		navMap.addInteraction(selectClick);
		const clickedFeatures = selectClick.getFeatures();

		clickedFeatures.on("add", function (event) {
			const feature = event.element;
			
			if(feature.get("type") === "rail"){
				return;
			}
			
			feature.set("type", "pictureselect");
			pswp.goTo(feature.get("Index"));
		});
		clickedFeatures.on("remove", function (event) {
			const feature = event.element;
			
			if(feature.get("type") === "rail"){
				return;
			}
			
			feature.set("type", "picture");
		});

		this.pswp.on("change", () => {

			// reset styling
			const index = pswp.currSlide.index;

			photoVectorSource.forEachFeature(feature => {

				if (!featuresLoaded) {
					console.warn("No features loaded on photoSwipe change event fired");
					return;
				}

				if (feature)
					feature.set("type", "picture");

				if (feature && feature.get("Index") === index) {
					feature.set("type", "pictureselect");
					navMap.getView().setCenter(feature.getGeometry().getCoordinates());
				}
			});
			this.updateSheetSize(pswp.currSlide, document.querySelector(".pswp__sheet"));
		});
	}

	storeAdjustedPanAreaSize(slide) {
		if (slide.infoSheetData) {
			if (!slide.infoSheetData.adjustedPanAreaSize) {
				slide.infoSheetData.adjustedPanAreaSize = {};
			}
			slide.infoSheetData.adjustedPanAreaSize.x = slide.panAreaSize.x;
			slide.infoSheetData.adjustedPanAreaSize.y = slide.panAreaSize.y;
		}
	}

	storeOriginalPanAreaSize(slide) {
		if (slide.infoSheetData) {
			if (!slide.infoSheetData.originalPanAreaSize) {
				slide.infoSheetData.originalPanAreaSize = {};
			}
			slide.infoSheetData.originalPanAreaSize.x = slide.panAreaSize.x;
			slide.infoSheetData.originalPanAreaSize.y = slide.panAreaSize.y;
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