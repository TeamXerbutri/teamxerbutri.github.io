import {setLanguageInDom} from "./language.js"
import {initTouchFix} from "./fix/touch.js";
import {initNavigator} from "./navigator.js";

export const domLoaded = () => {
	initNavigator();
	setLanguageInDom();
	initTouchFix();
}
