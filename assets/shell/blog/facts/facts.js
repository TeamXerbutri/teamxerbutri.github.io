import {localDate, translate} from "../../../translator.js";
import {loadFactsMap} from "./map/factmap.js";
import {ratingIcon} from "../../../shared/icons/icons.js";
import {apiBasePath} from "../../../config.js";
import {get} from "../../../helpers.js";

const fetchBlogFacts = async (category, routeId) => {
	try {
		const response = await get(`${apiBasePath()}/${category}/${routeId}/blog.json`);
		return await response.json();
	} catch (error) {
		console.error(`Error fetching blog facts for ${routeId}: ${error}`);
		return {facts: {}, sources: []};
	}
}

export const loadBlogFacts = async (category, routeId) => {
	const blogFacts = await fetchBlogFacts(category, routeId);

	let blogFactsElement = document.querySelector(".blog__facts");

	//aside
	if (countProperties(blogFacts.facts) > 0) {
		let blogFactsHtml = "";
		let hasMap = false;
		
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
					const ratingKey = translate("facts.rating");
					blogFactsHtml += `<li>${ratingKey}: <span class="fact rating">${ratingIcon.repeat(value)}</span></li>`;
					break;
				case "map":
					hasMap = true;
					let mapKey = translate("facts.map");
					blogFactsHtml += `</br><li>${mapKey} </br><div class="facts__map" id="js-factsmap" data-map="${value}"></div> </li>`;
					break;
				default:
					break;
			}
		});
		
		blogFactsElement.hidden = false;
		blogFactsElement.innerHTML = `<ul>${blogFactsHtml}</ul>`;
		
		if (hasMap)
			loadFactsMap(routeId);
		
	}
	else
		blogFactsElement.hidden = true;

	let articleSources = document.querySelector(".blog__sources");
	articleSources.innerHTML = "";
	if (blogFacts.sources.length > 0) {
		articleSources.hidden = false;
		let sourceTitle = translate("sources.title");
		let sourceDescription = translate("sources.description");
		
		articleSources.innerHTML += `<h2>${sourceTitle}</h2>`;
		articleSources.innerHTML += `<p>${sourceDescription}</p>`;
		let sourceList = "";
		blogFacts.sources.forEach(function (source) {

			let visitedOnDateArray = source.date.split("-");
			let visitedOn = translate("sources.visited") + localDate(visitedOnDateArray[2], visitedOnDateArray[1], visitedOnDateArray[0]);

			sourceList += `<li> <a href="${source.url}" title="${source.title}" target="_blank">${source.title}</a> <i>${visitedOn}</i></li>`;
		});
		articleSources.innerHTML += `<ol>${sourceList}</ol>`;
	}
	else
		articleSources.hidden = true;
}

function countProperties(obj) {
	let count = 0;

	for (const prop in obj) {
		if (obj.hasOwnProperty(prop))
			++count;
	}

	return count;
}