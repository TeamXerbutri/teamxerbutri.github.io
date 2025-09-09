import {ApiBasePath} from "../shared/config.js";
export const loadCards = async (lang) => {
	const response = await fetch(`${ApiBasePath}/index.${lang}.json`);
	return await response.json();
}