import {loadFactsMap} from "./map/factmap.js";
import {translate} from "../../../../translator.js";
import {ratingIcon} from "../../../../shared/icons/icons.js";

export const loadBlogFacts = (blogInfo, routeId) => {

	let blogFactsElement = document.querySelector(".blog__facts");

	if (!blogInfo.hasfacts)
	{
		blogFactsElement.hidden = true;
		return;
	}

	if (countProperties(blogInfo.facts) <= 0)
	{
		blogFactsElement.hidden = true;
		return;
	}

	let blogFactsHtml = "";
	let hasMap = false;

	Object.entries(blogInfo["facts"]).forEach(([key, value]) => {
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

function countProperties(obj) {
	let count = 0;

	for (const prop in obj) {
		if (obj.hasOwnProperty(prop))
			++count;
	}

	return count;
}