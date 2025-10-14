import {ApiBasePath} from "../../../config.js";
import {lang} from "../../../language.js";

const fetchLd = async (category, route) => {
	const response = await fetch(`${ApiBasePath}/${category}/${route}/${route}.${lang()}.jsonld`);
	return await response.json();
}

export const loadJsonLd = async (category, route) => {
	const jsonLd = await fetchLd(category, route);
	document.getElementById("jsonld").innerHTML = JSON.stringify(jsonLd);
}