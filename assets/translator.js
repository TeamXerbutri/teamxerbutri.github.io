import {ApiBasePath} from "./config.js";
import {lang} from "./language.js";

let translations = {};

const addTranslations = (newTranslations) => {
	translations = {...translations, ...newTranslations};

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

export const translateAll = () => {

	document.querySelectorAll("[data-i18n]").forEach(replace);
}

const replace = (element) => {
	const text = element.dataset.i18n.split('.').reduce((obj, i) => obj[i], translations);

	if (!text)
		return;

	switch (element.tagName) {
		case "BUTTON":
			element.title = text;
			return;
		case "A":
			addTranslationToElement(element, text);
			return;
		case "DIV":
			if (element.getAttribute("role") === "button") {
				addTranslationToElement(element, text);
				return;
			}
			element.innerHTML = text;
			break;
		default:
			element.innerHTML = text;
			break;
	}
}

const addTranslationToElement = (element, text) => {
	if (!element.dataset.i18n.endsWith("link")) {
		element.title = text;
		return;
	}
	// if a dataset ends with link, it has link text and title

	const title = element.dataset.i18n.split('.')[0].concat(".title").split('.').reduce((obj, i) => obj[i], translations);
	if (title) {
		element.title = title;
	}
	element.innerHTML = text;
}