import {ApiBasePath} from "./config.js";
import {lang} from "./language.js";

let translations = {};

const addTranslations = (newTranslations) => {
	translations = { ...translations, ...newTranslations };
	
}

export const translate = (key) => {
	const text = key.split('.').reduce((obj, i) => obj[i], translations);
	return text || key;
}

export const fetchTranslations = async (key) => {
	const response = await fetch(`${ApiBasePath}/${lang()}.${key}.json`);
	let translations = await response.json();
	addTranslations(translations);
	return translations;
}