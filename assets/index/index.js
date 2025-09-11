import {modalComponent} from "../modal/modal.js";
import {backToTopComponent, initializeBackToTop} from "../backtotop/backtotop.js";
import {loadCards} from "./card/card.js";
import {cardFilterComponent} from "./cardfilter/cardfilter.js";
// the index is a component AND has components
export const loadIndex = (lang) => {

	// the first step is adding the main components to the DOM
	let app = document.getElementById("js-app");
	app.classList.remove("blog");

	app.innerHTML = indexComponent;

	const htmlElement = document.querySelector("html");

	if(htmlElement.classList.contains("overflow-hidden"))
		htmlElement.classList.remove("overflow-hidden");
	
	// the second step is loading the child-component Cards 
	loadCards(lang); // TODO, lazy loading
	
	// The third step is the filter. This is dependent on the cards
	cardFilterComponent(lang);
	// initialize the component functionality
	initializeBackToTop()
	
	// TODO, the filter, message bar and header
}

const Layout = (children) => `
${modalComponent}
${backToTopComponent("index", children)}
`;

// TODO children => how to set them up?
const children = `
	<div class="index__message-bar hide"></div>
	<div class="card-filter" role="toolbar"></div>
	<nav class="card-feed"></nav>
`;

const indexComponent = Layout(children)