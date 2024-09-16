//import {counterIndicator} from "photoswipe";

const defaultOptions = {};

class PhotoswipeMatDesignPlugin {
	constructor(lightbox, options) {
		this.lightbox = lightbox;
		this.options = { ...defaultOptions, ...options };
		
		this.lightbox.on('init', () => {
			this.pswp = this.lightbox.pswp;
			
			//this.initMatDesign();
		});
		
		this.lightbox.addFilter('uiElement', (element, data) => {
			if(data.name === 'close') {
				// is not going to work
				data.order = 0;
				data.html.inner = '<path d="M29 43l-3 3-16-16 16-16 3 3-13 13 13 13z" id="pswp__icn-close"/>'
				// TODO set translation here, does not work this way because translator did not discover elements not being in DOM
				element.setAttribute('data-i18n', 'gallery.back');
				
				element.classList.add('top-nav');
				
			}
			if(data.name === 'zoom') {
				element.classList.add('top-nav');
			}
			
			
			if(data.name === 'preloader') {
				data.order = 1;
			}
			this.lightbox.pswp.ui.uiElementsData.sort();
			return element;
		})
		this.lightbox.on('uiRegister', function() {

			//console.log(lightbox.pswp.topBar);
			
		});

		// add new counter to the bottom //TODO add alternative screenreadable text
		this.lightbox.on('uiRegister', function() {
			lightbox.pswp.ui.registerElement({
				name: 'indicator',
				className: 'pswp__indicator',
				appendTo: 'wrapper',
				onInit: (el, pswp) => {
					const total = pswp.getNumItems();
					let index = pswp.currIndex + 1;
								
					let indicator = document.createElement('p');
					indicator.className = 'pswp__indicator__text';
					indicator.innerText = index + ' / ' + total;
				
					el.appendChild(indicator);

					pswp.on('change', (a,) => {
						index = pswp.currIndex + 1;
						indicator.innerText = index + ' / ' + total;
					});
				}
			});
		});
		
	}
	
	initMatDesign() {
		const { pswp } = this;
		
	}

	
	
}



export default PhotoswipeMatDesignPlugin;
