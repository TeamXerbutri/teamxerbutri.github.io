// This is my first try

import {lang, setLanguageInDom} from "./language.js"
import {DefaultLanguage} from "./config.js";
import {loadBlog} from "./blog/blog.js";
import {loadIndex} from "./index/index.js";
import {isTouchDevice} from "./fix/touch.js";

let language = DefaultLanguage;
let isTouch = false;

// language is persisted in localStorage, independent of DOM
export const initLanguage = () => {
	language = lang();
}

const initTouchFix = () => {
	isTouch = isTouchDevice();
}


export const domLoaded = () => {
	
	// 1 The route is dependent on DOM via window.location
	let route = "home";
	if (window.location.pathname.length > 1) {
		const redirect = sessionStorage.redirect;
		delete sessionStorage.redirect;
		
		if (redirect && redirect !== location.href) {
			route = redirect;
		}
	}
		
	setLanguageInDom(language)
	
	// routing via pageEvents TODO detect back button or swiping.
	window.pageEvents = {
		loadBlog,
	}
	
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
	
	// TODO load the shell or the map, next load sub-components dependent on route. I do need some way to know the route, and how to go back. These need to be page events.
	switch (route) {
		case "home":
			loadIndex(language);
			break;
		default:
			loadIndex(language);
			break;
	}
	
	console.timeEnd("index");
}
