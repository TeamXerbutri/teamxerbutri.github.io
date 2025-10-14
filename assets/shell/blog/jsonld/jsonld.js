import {lang} from "../../../language.js";
import {apiBasePath} from "../../../navigator.js";

const fetchLd = async (category, route) => {
	const response = await fetch(`${apiBasePath()}/${category}/${route}/${route}.${lang()}.jsonld`);
	return await response.json();
}

export const loadJsonLd = async (category, route) => {
	const jsonLd = await fetchLd(category, route);
	document.getElementById("jsonld").innerHTML = JSON.stringify(jsonLd);
}