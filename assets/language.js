import {DefaultLanguage, SupportedLanguages} from "./config.js";

export const lang = () => {
	const lang = getLanguage();
	localStorage.setItem("language", lang);
	
	return lang;
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

export const setLanguageInDom = (lang) => {
	if (document.documentElement.lang !== lang) {
		document.documentElement.lang = lang;
	}
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