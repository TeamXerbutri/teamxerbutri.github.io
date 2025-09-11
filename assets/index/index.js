
import {modalHtml} from "../modal/modal.js";
import {backToTopHtml} from "../ye-old-code/shared/backtotop/backtotop.js";
import {loadCards} from "./card/cardFactory.js";
// the index is a component AND has components
export const loadIndex = (lang) => {

	let app = document.getElementById("js-app");
	app.classList.remove("blog");

	app.innerHTML = innerHtml;

	const htmlElement = document.querySelector("html");

	if(htmlElement.classList.contains("overflow-hidden"))
		htmlElement.classList.remove("overflow-hidden");
	
	loadCards(lang);
	
}

const Layout = (children) => `
${modalHtml}
${backToTopHtml("index", children)}
`;

// TODO children => how to set them up?
const children = `
	<div class="index__message-bar hide"></div>
	<div class="card-filter" role="toolbar"></div>
	<nav class="card-feed"></nav>
`;

const innerHtml = Layout(children)