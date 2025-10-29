import {modalComponent} from "./modal/modal.js";
import {backToTopComponent, initializeBackToTop} from "./backtotop/backtotop.js";
import {indexComponent, loadIndex} from "./index/index.js";
import {messageBarComponent} from "./messagebar/messagebar.js";
import {checkVersion} from "./version/version.js";
import {blogComponent, loadBlog} from "./blog/blog.js";
import {currentPage} from "../navigator.js";
import {headerComponent, initHeader} from "./header/header.js";
import {initMenu} from "./header/menu/menu.js";
import {fetchTranslations, translateAll} from "../translator.js";

let isLoaded = false;

export const loadShell = () => {
	// init
	if (!isLoaded) {
		init();
	}
	
	document.querySelector("html").classList.remove("overflow-hidden");
	document.querySelector("header").classList.remove("hide");
	
	if(currentPage()==="home"){
		loadIndex();
	}
	else{
		loadBlog();
	}

	document.querySelector(".shell").hidden = false;
}

// TODO: there is a async component-part and a sync-part.
// one-time initialization of the component
const init = () => {

	let frame = document.getElementById("js-frame");
	
	frame.innerHTML = shellComponent(children());

	const headerElem = document.querySelector("header");
	headerElem.innerHTML = headerComponent;
		
	// initialize the component functionality
	initializeBackToTop()
	initHeader();
	
	initMenu();
	
	checkVersion();
	// TODO translateAll called twice
	fetchTranslations("shell").then(() => {
	translateAll()});
	
	isLoaded = true;
}

const shellComponent = (children) => `
${modalComponent}
${messageBarComponent}
${backToTopComponent(children)}
`;

const children = () => `
${indexComponent()}
${blogComponent()}
	`;


	