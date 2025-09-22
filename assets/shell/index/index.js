import {loadCards} from "./card/card.js";
import {cardFilterComponent, loadCardFilter} from "./cardfilter/cardfilter.js";

// the index is a component AND has components
export const loadIndex = () => {

	// the first step is adding the main components to the DOM
	let frame = document.getElementById("js-frame");
	frame.classList.remove("blog");

	// TODO: This is incorrect if the index was loaded at some time. => introduce an isLoaded, and hide/show
	

	const htmlElement = document.querySelector("html");

	if(htmlElement.classList.contains("overflow-hidden"))
		htmlElement.classList.remove("overflow-hidden");
	
	// the second step is loading the child-component Cards 
	loadCards(); // TODO, lazy loading
	
	// The third step is the filter. This is dependent on the cards
	loadCardFilter();
}
const Layout = (children) => `
<div class="index show">
${children}
</div>
`;


const children = `
	${cardFilterComponent}
	<nav class="card-feed"></nav>
`;

export const indexComponent = () => Layout(children)