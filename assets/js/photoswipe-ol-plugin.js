import "../css/photoswipe-ol.css"

const defaultOptions = {
	captionContent: ".pswp-caption-content",
};

class PhotoswipeOpenLayersPlugin {
	constructor(lightbox, options) {
		this.lightbox = lightbox;
		this.options = {...defaultOptions, ...options};

		this.lightbox.on("init", () => {
			this.pswp = this.lightbox.pswp;
			this.initSheet();
		});

		this.lightbox.addFilter("uiElement", (element, data) => {
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
		this.lightbox.on("firstUpdate", () => {
			const closeEl = this.pswp.topBar.querySelector(".pswp__button--close");
			this.pswp.topBar.insertBefore(closeEl, this.pswp.topBar.firstChild);
		});
	}
	
	//TODO on windowresize, recalculate the sheet width
	initSheet() {
		const { pswp } = this;

		pswp.on("change", () => {
			
			// make sure caption is displayed after slides are switched TODO
			this.showCaption(this.pswp.currSlide);
		});

		pswp.on("calcSlideSize", (e) => this.onCalcSlideSize(e));

		pswp.on("slideDestroy", (e) => {
			if (e.slide.infoSheet) {
				if (e.slide.infoSheet.element) {
					e.slide.infoSheet.element.remove();
				}
				delete e.slide.infoSheet;
			}
		});

		// hide sheet if zoomed
		pswp.on("zoomPanUpdate", ({ slide }) => {
			if (pswp.opener.isOpen && slide.infoSheet) {
				if (slide.currZoomLevel > slide.zoomLevels.initial) {
					this.hideCaption(slide);
				} else {
					this.showCaption(slide);
				}

				// move caption on vertical drag
				if (slide.infoSheet.element) {
					let captionYOffset = 0;
					if (slide.currZoomLevel <= slide.zoomLevels.initial) {
						const shiftedAmount = slide.pan.y - slide.bounds.center.y;
						if (Math.abs(shiftedAmount) > 1) {
							captionYOffset = shiftedAmount;
						}
					}

					this.setCaptionYOffset(slide.infoSheet.element, captionYOffset);
				}

				this.adjustPanArea(slide, slide.currZoomLevel);
			}
		});

		pswp.on("beforeZoomTo", (e) => {
			this.adjustPanArea(pswp.currSlide, e.destZoomLevel);
		});

		// Stop default action of tap when tapping on the caption
		pswp.on("tapAction", (e) => {
			if (e.originalEvent.target.closest(".pswp__dynamic-caption")) {
				e.preventDefault();
			}
		});
	}

	adjustPanArea(slide, zoomLevel) {
		if (slide.infoSheet && slide.infoSheet.adjustedPanAreaSize) {
			if (zoomLevel > slide.zoomLevels.initial) {
				slide.panAreaSize.x = slide.infoSheet.originalPanAreaSize.x;
				slide.panAreaSize.y = slide.infoSheet.originalPanAreaSize.y;
			} else {
				// Restore panAreaSize after we zoom back to initial position
				slide.panAreaSize.x = slide.infoSheet.adjustedPanAreaSize.x;
				slide.panAreaSize.y = slide.infoSheet.adjustedPanAreaSize.y;
			}
		}
	}
	
	usePortraitLayout() {
		return window.innerHeight > window.innerWidth;
	}

	// useMobileLayout() {
	// 	const { mobileLayoutBreakpoint } = this.options;
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

	hideCaption(slide) {
		if (slide.infoSheet && !slide.infoSheet.hidden) {
			const sheetElement = slide.infoSheet.element;

			if (!sheetElement) {
				return;
			}

			slide.infoSheet.hidden = true;
			sheetElement.classList.add("pswp__sheet--faded"); 

			// Disable caption visibility with the delay, so it"s not interactable 
			if (slide.captionFadeTimeout) {
				clearTimeout(slide.captionFadeTimeout);
			}
			slide.captionFadeTimeout = setTimeout(() => {
				sheetElement.style.visibility = "hidden";
				delete slide.captionFadeTimeout;
			}, 400);
		}
	}

	setCaptionYOffset(el, y) {
		el.style.transform = `translateY(${y}px)`;
	}

	showCaption(slide) {
		if (slide.infoSheet && slide.infoSheet.hidden) {
			const sheetElement = slide.infoSheet.element;

			if (!sheetElement) {
				return;
			}

			slide.infoSheet.hidden = false;
			sheetElement.style.visibility = "visible";

			clearTimeout(slide.captionFadeTimeout);
			slide.captionFadeTimeout = setTimeout(() => {
				sheetElement.classList.remove("pswp__sheet--faded");
				delete slide.captionFadeTimeout;
			}, 50);
		}
	}

	// TODO Remove this, the position of the sheet is fixed
	// setCaptionPosition(sheetElement, x, y) {
	// 	
	// 	const isOnHorizontalEdge = (x <= this.options.horizontalEdgeThreshold);
	// 	sheetElement.classList[
	// 		isOnHorizontalEdge ? "add" : "remove"
	// 		]("pswp__dynamic-caption--on-hor-edge");
	//
	// 	sheetElement.style.left = x + "px";
	// 	sheetElement.style.top = y + "px";
	// }

	// setCaptionWidth(sheetElement, width) {
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

	setCaptionType(sheetElement, type) {
		const prevType = sheetElement.dataset.pswpCaptionType;
		if (type !== prevType) {
			sheetElement.classList.add("pswp__sheet--" + type);
			sheetElement.classList.remove("pswp__sheet--" + prevType);
			sheetElement.dataset.pswpCaptionType = type;
		}
	}

	updateCaptionPosition(slide) {
		if (!slide.infoSheet || !slide.infoSheet.type || !slide.infoSheet.element) {
			return;
		}

		if (slide.infoSheet.type === "mobile") { //TODO : mobile should use bottom sheet
			this.setCaptionType(
				slide.infoSheet.element,
				slide.infoSheet.type
			);

			slide.infoSheet.element.style.removeProperty("left");
			slide.infoSheet.element.style.removeProperty("top");
			// this.setCaptionWidth(slide.infoSheet.element, false);
			return;
		}

		const zoomLevel = slide.zoomLevels.initial;
		const imageWidth = Math.ceil(slide.width * zoomLevel);
		const imageHeight = Math.ceil(slide.height * zoomLevel);

		this.setCaptionType(slide.infoSheet.element, slide.infoSheet.type);
		if (slide.infoSheet.type === "side") {
			// this.setCaptionPosition(
			// 	slide.infoSheet.element,
			// 	slide.bounds.center.x + imageWidth,
			// 	slide.bounds.center.y
			// );
			// this.setCaptionWidth(slide.infoSheet.element, false);
			this.setSheetWidth(slide.infoSheet.element, false);
		} else if (slide.infoSheet.type === "bottom") {
			// this.setCaptionPosition(
			// 	slide.infoSheet.element,
			// 	slide.bounds.center.x,
			// 	slide.bounds.center.y + imageHeight
			// );
			// this.setCaptionWidth(slide.infoSheet.element, imageWidth);
			this.setSheetWidth(slide.infoSheet.element, imageWidth);
		}
	}

	onCalcSlideSize(e) {
		const { slide } = e;
		let captionSize;
		let usePortraitLayout = this.usePortraitLayout();
		

		if (!slide.infoSheet) {
			slide.infoSheet = {
				element: undefined,
				type: false,
				hidden: false
			};

			const captionHTML = this.getCaptionHTML(slide);

			if (!captionHTML) {
				return;
			}

			slide.infoSheet.element = document.createElement("div");
			slide.infoSheet.element.className = "pswp__sheet pswp__hide-on-close";
			
			let captionContainer = document.createElement("div");
			captionContainer.className = "pswp__sheet-caption";
			captionContainer.innerHTML = captionHTML;
			slide.infoSheet.element.appendChild(captionContainer);
			
			let mapContainer = document.createElement("div");
			mapContainer.className = "pswp__sheet-map";
			mapContainer.id = "galnavmap";
			
			slide.infoSheet.element.appendChild(mapContainer);
			
			this.pswp.dispatch("infoSheetUpdateHTML", {
				sheetElement: slide.infoSheet.element,
				slide
			});

			slide.holderElement.appendChild(slide.infoSheet.element);
		}

		if (!slide.infoSheet.element) {
			return;
		}

		this.storeOriginalPanAreaSize(slide);

		slide.bounds.update(slide.zoomLevels.initial);

		slide.infoSheet.type = usePortraitLayout ? "bottom" : "side";

		const imageWidth = Math.ceil(slide.width * slide.zoomLevels.initial);
		const imageHeight = Math.ceil(slide.height * slide.zoomLevels.initial);

		this.setCaptionType(
			slide.infoSheet.element,
			slide.infoSheet.type
		);

		// sideSheet
		if (!usePortraitLayout) {
			//this.setCaptionWidth(slide.infoSheet.element, false);
			this.setSheetWidth(slide.infoSheet.element, false);
			captionSize = this.measureCaptionSize(slide.infoSheet.element, e.slide);

			const captionWidth = captionSize.x;

			const horizontalEnding = imageWidth + slide.bounds.center.x;
			const horizontalLeftover = (slide.panAreaSize.x - horizontalEnding);

			if (horizontalLeftover <= captionWidth) {
				slide.panAreaSize.x -= captionWidth;
				this.recalculateZoomLevelAndBounds(slide);
			} else {
				// do nothing, caption will fit aside without any adjustments
			}
		}
		// bottomSheet
		if (usePortraitLayout) {
			this.setCaptionWidth(
				slide.infoSheet.element,
				useMobileVersion ? this.pswp.viewportSize.x : imageWidth
			);

			captionSize = this.measureCaptionSize(slide.infoSheet.element, e.slide);
			const captionHeight = captionSize.y;

			if (this.options.verticallyCenterImage) {
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

					const maxPositionX = slide.panAreaSize.x * this.options.mobileCaptionOverlapRatio / 2;

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

		this.storeAdjustedPanAreaSize(slide);
		this.updateCaptionPosition(slide);
	}

	measureCaptionSize(sheetElement, slide) {
		const rect = sheetElement.getBoundingClientRect();
		const event = this.pswp.dispatch("infoSheetMeasureSize", {
			sheetElement,
			slide,
			captionSize: {
				x: rect.width,
				y: rect.height
			}
		});
		return event.captionSize;
	}

	recalculateZoomLevelAndBounds(slide) {
		slide.zoomLevels.update(slide.width, slide.height, slide.panAreaSize);
		slide.bounds.update(slide.zoomLevels.initial);
	}

	

	
	// This part is OK!!
	storeAdjustedPanAreaSize(slide) {
		if (slide.infoSheet) {
			if (!slide.infoSheet.adjustedPanAreaSize) {
				slide.infoSheet.adjustedPanAreaSize = {};
			}
			slide.infoSheet.adjustedPanAreaSize.x = slide.panAreaSize.x;
			slide.infoSheet.adjustedPanAreaSize.y = slide.panAreaSize.y;
		}
	}
	
	storeOriginalPanAreaSize(slide) {
		if (slide.infoSheet) {
			if (!slide.infoSheet.originalPanAreaSize) {
				slide.infoSheet.originalPanAreaSize = {};
			}
			slide.infoSheet.originalPanAreaSize.x = slide.panAreaSize.x;
			slide.infoSheet.originalPanAreaSize.y = slide.panAreaSize.y;
		}
	}

	getCaptionHTML(slide) {
		if (typeof this.options.captionContent === "function") {
			return this.options.captionContent.call(this, slide);
		}

		const currSlideElement = slide.data.element;
		let captionHTML = "";
		if (currSlideElement) {
			const hiddenCaption = currSlideElement.querySelector(this.options.captionContent);
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