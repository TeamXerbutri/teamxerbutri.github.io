import {createBlogObject} from "./objectfactory"
import {uiState} from "./uistate"

uiState.hasFilter = {bridge:false, building:false, rail:false, tunnel:false};

let getObjects = fetch("data/index.".concat(appState.language, ".json")).then((response) => response.json());

// UI state Business logic for filtering
function setDisplayFilter(className, display){
	let categories = document.getElementsByClassName(className);
	let i;

	for(i=0; i< categories.length; i++){
		categories[i].style.display = display;
	}
}

// Builds the objects
function objectFactory(subjects){
	const objectContainer = document.getElementById('oc');
	for(let i in subjects){
		let displayObject = createBlogObject(subjects[i]);
		objectContainer.appendChild(displayObject);
	}
}
function filterObjects(){
	if(uiState.hasFilter.bridge){
		setDisplayFilter('bridge', 'none');
	}
	if(uiState.hasFilter.building){
		setDisplayFilter('building', 'none');
	}
	if(uiState.hasFilter.rail){
		setDisplayFilter('rail', 'none');
	}
	if(uiState.hasFilter.tunnel){
		setDisplayFilter('tunnel', 'none');
	}
}

// TODO refactor from self invoking function to normal function called upon event. TODO, just load the html.
(function(){
	document.addEventListener('DOMContentLoaded', init);

	function init(){
		hidePrivacyModal();
		hideContactModal();
		hideBackToTop();
		document.addEventListener("click", hideMenu);
		document.addEventListener("click", hidePrivacyModal);
		document.addEventListener("click", hideContactModal);
		document.getElementById("menu").addEventListener("click", showMenu);
		document.getElementById("contact").addEventListener("click", showContactModal);
		document.getElementById("privacy").addEventListener("click", showPrivacyModal);

		// fetch the objects
		getObjects.then(
			function(value) {objectFactory(value.subjects);},
			function (error) {errorHandler(error)},
		)

		if(viewportWidth <=755){ initMobile}//When the page is loaded, call init
		if(viewportWidth >755){ initLarge}
	}

	//ToDo window.onresize() -> doe een resizing en wijzig op basis van UIstate

	function initMobile(){
		//var lastid= parseInt(document.getElementById('oc').lastChild.getAttribute("data-num"));
		let maxid = parseInt(document.getElementById('maxid').value);
		//ToDo, load based on size! Do a height calculation
		loadMore(lastid+1, 5, true);
		lastid = lastid+6;
		window.onscroll = function(ev) {
			if (lastid>=maxid){
				return;
			}
			let totalHeight = window.innerHeight + window.scrollY;
			if (totalHeight >= 0.9*document.body.offsetHeight) {
				let icons = 8;
				let nextlastid = lastid + icons;
				if(maxid<=nextlastid){
					icons = maxid-lastid;
				}
				loadMore(lastid+1, icons, true);
				lastid = lastid+icons+1;
			}
			if (window.scrollY >= 200) {
				showBackToTop();
			}
			else{
				hideBackToTop();
			}
		};
		//load the filtering
		const indexFilter = document.createElement("script");
		indexFilter.type = "text/javascript";
		indexFilter.src = "assets/js/indexfilter.js";
		document.body.appendChild(indexFilter);
		hideMenu();
	}

	function initLarge(){
		//var lastid= parseInt(document.getElementById('oc').lastChild.getAttribute("data-num"));//==1, maar ook flexibel zo.
		let maxid = parseInt(document.getElementById('maxid').value);
		let h = Math.round(window.innerHeight / 180) * 4 - 4;//h is bekend.
		loadMore(lastid+1, h, false);
		lastid = lastid+h+1;
		window.onscroll = function(ev) {
			//var lastid= parseInt(document.getElementById('oc').lastChild.getAttribute("data-num"));//hier gaat het mis bij snel scrollen.
			if (lastid>=maxid){
				return;
			}
			let totalHeight = window.innerHeight + window.scrollY;
			if (totalHeight >= 0.9*document.body.offsetHeight) {
				let icons = 8;
				let nextlastid = lastid+icons;
				if(maxid<=nextlastid){
					icons = maxid-lastid;
				}
				loadMore(lastid+1, icons, false);
				lastid = lastid+icons+1;//set new lastid in js instead of fetching from page
			}
			if (window.scrollY >= 200) {
				showBackToTop();
			}
			else{
				hideBackToTop();
			}
		};

		//load the filtering
		let indexFilter = document.createElement("script");
		indexFilter.type = "text/javascript";
		indexFilter.src = "assets/js/indexfilter.js";
		document.body.appendChild(indexFilter);
	}
})();