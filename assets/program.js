// This is my first try

import {lang, setLanguageInDom} from "./language.js"
import {DefaultLanguage} from "./config.js";
import {loadBlog} from "./blog/blog.js";
import {loadIndex} from "./index/index.js";

let language = DefaultLanguage;

// language is persisted in localStorage, independent of DOM
export const initLanguage = () => {
	language = lang();
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
	
	
	window.pageEvents = {
		loadBlog,
	}
	
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
