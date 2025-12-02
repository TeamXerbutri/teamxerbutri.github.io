import {translate} from "../../../../translator.js";

const defaultOptions = {};

class PhotoswipeMatDesignPlugin {
	constructor(lightbox, options) {
		this.lightbox = lightbox;
		this.options = { ...defaultOptions, ...options };
		
		this.lightbox.on("init", () => {
			this.pswp = this.lightbox.pswp;
		});
		
		lightbox.addFilter("uiElement", (element, data) => {
			switch (data.name) {
				case "close":
					this.setTranslation(element, "gallery.back");
					element.classList.add("link_mat-app-bar");
					break;
				case "zoom":
					this.setTranslation(element, "gallery.zoom");
					element.classList.add("link_mat-app-bar");
					break;
				case "arrowPrev":
					this.setTranslation(element, "gallery.prev");
					break;
				case "arrowNext":
					this.setTranslation(element, "gallery.next");
					break;
				default:
					// leave element unchanged
			}
			return element;
		})

		// change the order
		lightbox.on("firstUpdate", () => {
			const closeEl = this.pswp.topBar.querySelector(".pswp__button--close");
			this.pswp.topBar.insertBefore(closeEl, this.pswp.topBar.firstChild);
		});
		
		// add new counter to the bottom //TODO add alternative screenreadable text
		lightbox.on("uiRegister", function() {
			lightbox.pswp.ui.registerElement({
				name: "indicator",
				className: "pswp__indicator",
				appendTo: "wrapper",
				onInit: (el, pswp) => {
					const total = pswp.getNumItems();
					let index = pswp.currIndex + 1;
								
					let indicator = document.createElement("p");
					indicator.className = "pswp__indicator__text";
					indicator.innerText = index + " / " + total;
				
					el.appendChild(indicator);

					pswp.on("change", (a,) => {
						index = pswp.currIndex + 1;
						indicator.innerText = index + " / " + total;
					});
				}
			});
		});
	}

	setTranslation(element, key) {
		element.setAttribute("data-i18n", key);
		element.title = translate(key);
	}
}

export default PhotoswipeMatDesignPlugin;
