import {lang} from "../../../language.js";
import {apiBasePath} from "../../../config.js";
import {get} from "../../../helpers.js";

const fetchLd = async (category, route) => {
	try {
		const response = await get(`${apiBasePath()}/${category}/${route}/${route}.${lang()}.jsonld`);
		return await response.json();
	} catch (error) {
		console.error(`Error fetching JSON-LD for ${route}: ${error}`);
		return {};
	}
	
}

export const loadJsonLd = async (category, route) => {
	const jsonLd = await fetchLd(category, route);
	
	if (jsonLd) 
		document.getElementById("jsonld").innerHTML = JSON.stringify(jsonLd);
}