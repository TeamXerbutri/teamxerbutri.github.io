import {ApiBasePath} from "../../../config.js";
import {translate} from "../../../translator.js";

const fetchBlogFacts = async (category, routeId) => {
	const response = await fetch(`${ApiBasePath}/${category}/${routeId}/blog.json`);
	return await response.json();
}

export const loadBlogFacts = async (category, routeId) => {
	const blogFacts = await fetchBlogFacts(category, routeId);

	//aside
	if (countProperties(blogFacts.facts) > 0) {
		let blogFactsHtml = "";
		
		Object.entries(blogFacts["facts"]).forEach(([key, value]) => {
			if (value === "") {
				return;
			}

			switch (key) {
				case "build":
				case "abandoned":
				case "demolished":
				case "reused":
				case "length":
				case "height":
				case "line":
					const translation = translate(`facts.${key}`);
					blogFactsHtml += `<li>${translation}: <span class="fact">${value}</span> </li>`;
					break;
				case "visited":
					const translationVis = translate(`facts.${key}`);
					blogFactsHtml += `<li>${translationVis}: <span class="fact">${value.substring(0, 4)}</span> </li>`;
					break;
				case "rating":
					// TODO rating as svg
					const ratingKey = translate("facts.rating");
					blogFactsHtml += `<li>${ratingKey}: <span class="fact"><img src="../ui/pics/ri${value}.gif" alt="${value}" width="152" height="10" /></span></li>`;
					break;
				case "map":
					// TODO factsmap
					let mapKey = translate("facts.map");
					blogFactsHtml += `</br><li>${mapKey} </br><div class="omap" id="omap" data-map="${value}"></div> </li>`;
					break;
				default:
					break;
			}
		});
		
		document.querySelector(".blog__facts").innerHTML = `<ul>${blogFactsHtml}</ul>`;
	}
}

function countProperties(obj) {
	let count = 0;

	for (const prop in obj) {
		if (obj.hasOwnProperty(prop))
			++count;
	}

	return count;
}