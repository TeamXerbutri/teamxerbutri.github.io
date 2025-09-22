// This is my first try

import {setLanguageInDom} from "./language.js"
import {initTouchFix} from "./fix/touch.js";
import {loadShell} from "./shell/shell.js";
import {currentPage, getInitialPage, registerPages} from "./navigator.js";

export const domLoaded = () => {
	
	getInitialPage();
	registerPages();
	
	setLanguageInDom();
	
	initTouchFix();
	
	// TODO For either blog OR index, back-to-top and header are shared. maps does not have a header and back-to-top => "onFirstLoad" or isLoaded?
	// js-app
	// - map (hides shell)
	// - shell
	//   -- header
	//   -- welcome
	//   -- message-bar
	//   -- back-to-top
	//       --- index
	//       --- article
	
	// TODO maybe move this to navigator.js
	switch (currentPage()) {
		case "map":
			loadShell();
			break;
		default:
			loadShell();
			break;
	}
	
	console.timeEnd("index");
}
