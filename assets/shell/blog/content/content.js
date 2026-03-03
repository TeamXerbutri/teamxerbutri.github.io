import {localDate, translate} from "../../../translator.js";
import {lang} from "../../../language.js";
import {apiBasePath} from "../../../config.js";
import {get} from "../../../helpers.js";

const fetchBlogContent = async (category, routeId) => {
	try {
		const response = await get(`${apiBasePath()}/${category}/${routeId}/blog.${lang()}.json`);
		return await response.json();
	} catch (error) {
		console.error(`Error fetching blog content for ${routeId} in category ${category}: ${error}`);
		return {};
	}
}

export const loadBlogContent = async (category, routeId) => {
	const blogContent = await fetchBlogContent(category, routeId);
	document.title = blogContent.shortname + " - Xerbutri Urban Exploring";
	document.querySelector('meta[name="description"]').setAttribute("content", blogContent.description);
	document.querySelector(".blog__title").innerHTML = `<h1>${blogContent.title}</h1>`;
	// intro
	document.querySelector(".blog__intro").innerHTML = blogContent.intro;

	// adventure and history
	let articleContent = document.querySelector(".blog__content");
	let contentHtml = "";
	
	if (blogContent.adventure !== undefined && blogContent.adventure !== "") {
		articleContent.hidden = false;
		contentHtml += `<h2>${translate("adventure")}</h2> ${blogContent.adventure}`;
	}

	if (blogContent.history !== undefined && blogContent.history !== "") {
		articleContent.hidden = false;
		contentHtml += `<h2>${translate("history")}</h2> ${blogContent.history}`;
	}
	articleContent.innerHTML = contentHtml;

	const year = blogContent.created.split("-")[0];
	const month = blogContent.created.split("-")[1];
	let monthBlog = translate(`month.${month}`);

	let authorVisited = document.querySelector(".blog__author-visit");
	authorVisited.hidden = false;
	authorVisited.innerHTML = `${blogContent.author} -  ${monthBlog} ${year}`;

	let updatedSplit = blogContent.updated.split("-");

	let blogUpdated = document.querySelector(".blog__updated");
	blogUpdated.hidden = false;
	blogUpdated.innerHTML = translate("article.lastupdate") + localDate(updatedSplit[2], updatedSplit[1], updatedSplit[0]);
}