import {localDate, translate} from "../../../../translator.js";

export const loadBlogSources = (blogInfo) => {
	let articleSources = document.querySelector(".blog__sources");
	articleSources.innerHTML = "";
	if (blogInfo.sources.length <= 0) {
		articleSources.hidden = true;
		return;
	}
	articleSources.hidden = false;
	let sourceTitle = translate("sources.title");
	let sourceDescription = translate("sources.description");

	articleSources.innerHTML += `<h2>${sourceTitle}</h2>`;
	articleSources.innerHTML += `<p>${sourceDescription}</p>`;
	let sourceList = "";
	blogInfo.sources.forEach(function (source) {

		let visitedOnDateArray = source.date.split("-");
		let visitedOn = translate("sources.visited") + localDate(visitedOnDateArray[2], visitedOnDateArray[1], visitedOnDateArray[0]);

		sourceList += `<li> <a href="${source.url}" title="${source.title}" target="_blank">${source.title}</a> <i>${visitedOn}</i></li>`;
	});
	articleSources.innerHTML += `<ol>${sourceList}</ol>`;
}