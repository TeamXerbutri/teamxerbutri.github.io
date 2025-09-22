import {modalComponent} from "./modal/modal.js";
import {backToTopComponent, initializeBackToTop} from "./backtotop/backtotop.js";
import {indexComponent, loadIndex} from "./index/index.js";
import {messageBarComponent} from "./messagebar/messagebar.js";
import {checkVersion} from "./version/version.js";
import {blogComponent, loadBlog} from "./blog/blog.js";
import {currentPage} from "../navigator.js";

let isLoaded = false;

export const loadShell = () => {
	// init
	if (!isLoaded) {
		init();
	}
	
	if(currentPage()==="home"){
		loadIndex();
	}
	else{
		loadBlog();
	}

	let shell = document.querySelector(".shell");
	shell.classList.remove("hide");
	shell.classList.add("show");
}
// TODO: there is a async component-part and a sync-part.
const init = () => {

	let frame = document.getElementById("js-frame");
	
	frame.innerHTML = shellComponent(children());
		
	// initialize the component functionality
	initializeBackToTop()
	
	checkVersion();
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
	