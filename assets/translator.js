import {lang} from "./language.js";
import {apiBasePath} from "./config.js";
import {get} from "./helpers.js";

let translations = {};

const addTranslations = (newTranslations) => {
	translations = {...translations, ...newTranslations};
}

export const translate = (key) => {
	const text = key.split('.').reduce((obj, segment) => obj?.[segment], translations);
	return text || key;
}

export const fetchTranslations = async (key) => {
	try {
		const response = await get(`${apiBasePath()}/${lang()}.${key}.json`);
		let result = await response.json();
		addTranslations(result);
		return result;
	} catch (error) {
				console.error(`Error fetching translations for ${key}:`, error);
		return null;
	}
}

export const translateAll = () => {
	document.querySelectorAll("[data-i18n]").forEach(replace);
}

export const reTranslateAll = () => {
	translations = {};
	fetchAllTranslations().then(() => {
		translateAll()
	})
}

const fetchAllTranslations = async () => {
	await fetchTranslations("shell");
	await fetchTranslations("index");
	await fetchTranslations("card");
	await fetchTranslations("blog");
}

const replace = (element) => {
	const text = element.dataset.i18n.split('.').reduce((obj, i) => obj?.[i], translations);

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
		case "INPUT":
			element.placeholder = text;
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
	const keys = element.dataset.i18n.split('.');
	let key = keys[0];

	if (keys.length > 1)
		key = key + "." + keys[1];

	const title = key.concat(".title").split('.').reduce((obj, segment) => obj?.[segment], translations);
	if (title) {
		element.title = title;
	}
	element.innerHTML = text;
}

export const localDate = (day, month, year) => {
	const monthFull = translate(`month.${month}`)
	if (lang() === "en") {
		return `${monthFull} ${day} ${year}`;
	}
	return `${day} ${monthFull} ${year}`;
}