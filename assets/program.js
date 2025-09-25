// This is my first try

import {setLanguageInDom} from "./language.js"
import {initTouchFix} from "./fix/touch.js";
import {initNavigator} from "./navigator.js";

export const domLoaded = () => {

	initNavigator();

	setLanguageInDom();

	initTouchFix();


	// js-app
	// - map (hides shell)
	// - shell v
	//   -- header
	//   -- welcome v
	//   -- message-bar v
	//   -- back-to-top v
	//       --- index (partially ready)
	//       --- article
}
