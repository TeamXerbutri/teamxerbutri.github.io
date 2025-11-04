import {DefaultLanguage, SupportedLanguages} from "./config.js";

let language = DefaultLanguage;

export const lang = () => {
	return language;
}

export const initLanguage = () => {
	language = getLanguage();
	try {
		localStorage.setItem("language", language);
	}
	catch (error) {
		console.error("Could not store language preference in localStorage:", error);
	}
	
	document.addEventListener("DOMContentLoaded", setLanguageInDom); // there is no need to wait for DOM. I just don't care.
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

const setLanguageInDom = () => {
	if (document.documentElement.lang !== language) {
		document.documentElement.lang = language;
	}
}

export const setLanguage = (languageCode) => {
	if (!languageCode)
		return;

	if (!SupportedLanguages.includes(languageCode))
		return;

	language = languageCode;
	try {
		localStorage.setItem("language", language);
	}
	catch (error) {
		console.error("Could not store language preference in localStorage:", error);
	}
	
	setLanguageInDom();
}


const getLanguage = () => {
	if (!hasLocalStorage()) {
		console.warn("Fallback to default language");
		return DefaultLanguage;
	}

	const storedLanguage = localStorage.getItem("language");

	if (storedLanguage && SupportedLanguages.includes(storedLanguage)) {
		return storedLanguage;
	}

	const browserLanguage = navigator.languages ? navigator.languages[0] : navigator.language;

	// default fallback to nl
	if (!browserLanguage) {
		console.warn("Fallback to default language");
		return DefaultLanguage;
	}

	const languageCode = browserLanguage.substring(0, 2).toLowerCase();

	if (!SupportedLanguages.includes(languageCode)) {
		console.warn("Fallback to default language");
		return DefaultLanguage;
	}

	return languageCode;
}