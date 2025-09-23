import {loadCards} from "./card/card.js";
import {cardFilterComponent, loadCardFilter} from "./cardfilter/cardfilter.js";
import {hideItems, showItems} from "../togglhelper.js";

let isLoaded = false;

// the index is a component AND has components
export const loadIndex = () => {

	// the first step is adding the main components to the DOM
	let frame = document.getElementById("js-frame");
	frame.classList.remove("blog");
	
	const htmlElement = document.querySelector("html");

	if(htmlElement.classList.contains("overflow-hidden"))
		htmlElement.classList.remove("overflow-hidden");
	
	if (!isLoaded) {
		init().then(()=>{
			isLoaded = true;
			console.timeEnd("index-loaded");
		});
	}

	hideItems(".header__blog", "show_inline-block");
	showItems(".header__index", "show_inline-block");
	hideItems(".blog", "show");
	showItems(".index", "show");
	
	console.timeEnd("index");
}
const Layout = (children) => `
<div class="index hide">
${children}
</div>
`;


const children = `
	${cardFilterComponent}
	<nav class="card-feed"></nav>
`;


const init = async () => {
		// TODO: improve by parallel.
		// the second step is loading the child-component Cards 
		await loadCards(); // TODO, lazy loading

		// The third step is the filter. This is dependent on the cards
		await loadCardFilter();
}

export const indexComponent = () => Layout(children)