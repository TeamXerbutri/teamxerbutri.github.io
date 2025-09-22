// This is my first try

import {setLanguageInDom} from "./language.js"
import {initTouchFix} from "./fix/touch.js";
import { initNavigator} from "./navigator.js";

export const domLoaded = () => {

	initNavigator();
	
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
}
