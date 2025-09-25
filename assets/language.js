import {DefaultLanguage, SupportedLanguages} from "./config.js";

let language = DefaultLanguage;

export const lang = () => {
	return language;
}

export const initLanguage = () => {
	language = getLanguage();
	localStorage.setItem("language", language);
}


const hasLocalStorage = () => {
	try {
		const testKey = "test";
		localStorage.setItem(testKey, "1");
		localStorage.removeItem(testKey);
		return true;
	} catch (error) {
		return false;
	}
}

export const setLanguageInDom = () => {
	if (document.documentElement.lang !== language) {
		document.documentElement.lang = language;
	}
}

export const setLanguage = (lang) => {
	if(!lang)
		return;
	
	if (!SupportedLanguages.includes(lang)) 
		return;
	
	language = lang;
	localStorage.setItem("language", language);
	setLanguageInDom();
}


const getLanguage = () =>{
	if(!hasLocalStorage()) {
		return DefaultLanguage;
	}

	const storedLanguage = localStorage.getItem("language");

	if (storedLanguage) {
		return storedLanguage;
	}

	const browserLanguage = navigator.languages ? navigator.languages[0] : navigator.language;

	// default fallback to nl
	if (!browserLanguage) {
		console.warn("Fallback to default language");
		return DefaultLanguage;
	}

	let lang = browserLanguage.substring(0, 2).toLowerCase();

	if (!SupportedLanguages.includes(lang)) {
		return DefaultLanguage;
	}

	return lang;
}