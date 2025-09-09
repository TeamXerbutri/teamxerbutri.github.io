// This is my first try

import {lang} from "./language.js"

export const initProgram = () => {
	console.time("initProgram");
	// 1 TODO I need the route from session storage
	let route = "home";
	if (window.location.pathname.length > 1) {
		const redirect = sessionStorage.redirect;
		delete sessionStorage.redirect;
		
		if (redirect && redirect !== location.href) {
			route = redirect;
		}
	}
	

	// TODO at the same time, I can get the language
	const language = lang();
	console.log(language);
	// TODO IF I have the language AND I have the route, next step.
	console.timeEnd("initProgram");
}
