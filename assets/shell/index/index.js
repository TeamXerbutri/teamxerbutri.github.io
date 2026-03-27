import {lazyLoadCards, loadCards, onFilter} from "./card/card.js";
import {cardFilterComponent, loadCardFilter} from "./cardfilter/cardfilter.js";
import {hideItems, showItems} from "../togglhelper.js";
import {fetchTranslations, translate, translateAll} from "../../translator.js";

let isLoaded = false;

// component
export const indexComponent = () => Layout(children)

// load the component => logic for every call of the component
export const loadIndex = () => {
	let frame = document.getElementById("js-frame");
	frame.classList.remove("frame__blog_size");

	const headerElem = document.querySelector("header");
	headerElem.classList.remove("frame__blog_size")

	if (!isLoaded) {
		init().then(() => {
			isLoaded = true;
		});
	}

	hideItems(".header__blog", "show_inline-block");
	showItems(".header__index", "show_inline-block");
	hideItems(".blog", "show");
	showItems(".index", "show");
	hideItems(".search-popover", "show_inline-block");
	
	if (isLoaded) 
		setMetaData();

	frame.scrollTop = 0;
}

export const reloadCards = () => {
	document.querySelector(".card-feed").innerHTML = "";
	loadCards();
}

// one-time initialization of the component
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

const Layout = (children) => `
<div class="index hide">
${children}
</div>
`;

const children = `
	${cardFilterComponent}
	<nav class="card-feed"></nav>
`;

const setMetaData = () => {
	document.title = translate("metadata.title");
	document.querySelector('meta[name="description"]').setAttribute("content", translate("metadata.content"));
}

