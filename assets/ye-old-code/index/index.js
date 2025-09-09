// TODO build the index here. This should replace home.js
// TODO inspired by the Jim-nielsen.com blog on templating in Javascript (2021-12-13)

// have a pattern with files that return strings.

// instead of this:
import {backToTopHtml} from "../shared/backtotop/backtotop.js";
import {modalHtml} from "../shared/modal/modal.js";
import {initializeHomeHeader} from "../shared/header/header.js";



// app.innerHTML = `
// 
// <div id="href-top" class="index">
// 	<div class="index__message-bar hide"></div>
// 	<div class="card-filter" role="toolbar"></div>
// 	<nav class="card-feed"></nav>
// </div>
// ${backToTopHtml}`

// have something like

// so you have like, index == modal/back to top and children =>  indexMessageBar/cardFilter/cardFeed

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

// TODO function init with:

const init = (translator) => {
	let app = document.getElementById("js-app");
	app.classList.remove("blog");

	app.innerHTML = innerHtml;

	const htmlElement = document.querySelector("html");

	if(htmlElement.classList.contains("overflow-hidden"))
		htmlElement.classList.remove("overflow-hidden");

	initializeHomeHeader();
	// TODO: Think about the order of initializing and loading.
	// 1. Set the language for setting up the cards.
	// 2. Get the props for loading the parts of the page. Please lazy load!
	// When to upload the NLJson / see the nl.json as props? So TODO => use the nl.json as props!
	// DO NOT USE TRANSLATOR for fetch!
	// TODO Move this (initiating translator) to main!!
	translator.load().then(() => {
		setTranslatedContent();
	}).catch((error) => {
		// TODO => show error page!
		console.error(`An error occured in getting the translations: ${error}`);
	});
	
	
}