import {lazyLoadCards, loadCards, onFilter} from "./card/card.js";
import {cardFilterComponent, loadCardFilter} from "./cardfilter/cardfilter.js";
import {hideItems, showItems} from "../togglhelper.js";
import {fetchTranslations, translate, translateAll} from "../../translator.js";

let isLoaded = false;

export const reloadIndex = () => {
	document.querySelector(".card-feed").innerHTML = "";
	loadCards();
}

// the index is a component AND has components
export const loadIndex = () => {
	let frame = document.getElementById("js-frame");
	frame.classList.remove("frame__blog_size");

	const headerElem = document.querySelector("header");
	headerElem.classList.remove("frame__blog_size")

	if (!isLoaded) {
		init().then(() => {
			isLoaded = true;
			console.timeEnd("index-loaded");
		});
	}

	hideItems(".header__blog", "show_inline-block");
	showItems(".header__index", "show_inline-block");
	hideItems(".blog", "show");
	showItems(".index", "show");
	
	if (isLoaded) 
		setMetaData();
	
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
	
	// the second step is loading the child-component Cards 
	await loadCards();
	lazyLoadCards();

	// The third step is the filter. This is somewhat dependent on the cards
	loadCardFilter();

	const filterElement = document.querySelector(".card-filter");
	filterElement.onclick = function () {
		onFilter();
	}
	
	fetchTranslations("index").then(() => {
		setMetaData();
		translateAll();
	});
}

const setMetaData = () => {
	document.title = translate("metadata.title");
	document.querySelector('meta[name="description"]').setAttribute("content", translate("metadata.content"));
}

export const indexComponent = () => Layout(children)