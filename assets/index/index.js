import {modalComponent} from "../modal/modal.js";
import {backToTopComponent, initializeBackToTop} from "../backtotop/backtotop.js";
import {loadCards} from "./card/card.js";
import {cardFilterComponent} from "./cardfilter/cardfilter.js";
// the index is a component AND has components
export const loadIndex = (lang) => {

	// the first step is adding the main components to the DOM
	let frame = document.getElementById("js-frame");
	frame.classList.remove("blog");

	// TODO: This is incorrect if the index was loaded at some time. => introduce an isLoaded, and hide/show
	frame.innerHTML = indexComponent(lang);

	const htmlElement = document.querySelector("html");

	if(htmlElement.classList.contains("overflow-hidden"))
		htmlElement.classList.remove("overflow-hidden");
	
	// the second step is loading the child-component Cards 
	loadCards(lang); // TODO, lazy loading
	
	// The third step is the filter. This is dependent on the cards
	cardFilterComponent(lang);
	// initialize the component functionality
	initializeBackToTop(lang)
	
	// TODO, the message bar
}

const Layout = (lang, children) => `
${modalComponent}
${backToTopComponent("index", children)}
`;

const children = `
	<div class="index__message-bar hide"></div>
	<div class="card-filter" role="toolbar"></div>
	<nav class="card-feed"></nav>
`;

const indexComponent = (lang) => Layout(lang, children)