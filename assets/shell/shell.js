import {modalComponent} from "./modal/modal.js";
import {backToTopComponent, initializeBackToTop} from "./backtotop/backtotop.js";
import {indexComponent, loadIndex} from "./index/index.js";
import {messageBarComponent} from "./messagebar/messagebar.js";
import {checkVersion} from "./version/version.js";

let isLoaded = false;

export const loadShell = () => {
	// init
	if (!isLoaded) {
		init();
		
		return;
	}

	let shell = document.querySelector(".shell");
	shell.classList.remove("hide");
	shell.classList.add("show");
}
// TODO: there is a async component-part and a sync-part.
const init = () => {

	let frame = document.getElementById("js-frame");
	
	// TODO for now just paint the index.
	const children = indexComponent();
	frame.innerHTML = shellComponent(children);
	
	// async.
	loadIndex();
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