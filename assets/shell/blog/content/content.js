import {localDate, translate} from "../../../translator.js";
import {lang} from "../../../language.js";
import {apiBasePath} from "../../../navigator.js";

const fetchBlogContent = async (category, routeId) => {
	const response = await fetch(`${apiBasePath()}/${category}/${routeId}/blog.${lang()}.json`);
	return await response.json();
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
		contentHtml += `<h2>${translate("adventure")}</h2> ${blogContent.adventure}`;
	}

	if (blogContent.history !== undefined && blogContent.history !== "") {
		contentHtml += `<h2>${translate("history")}</h2> ${blogContent.history}`;
	}
	articleContent.innerHTML = contentHtml;

	const year = blogContent.created.split("-")[0];
	const month = blogContent.created.split("-")[1];
	let monthBlog = translate(`month.${month}`);

	document.querySelector(".blog__author-visit").innerHTML = `${blogContent.author} -  ${monthBlog} ${year}`;

	let updatedSplit = blogContent.updated.split("-");

	document.querySelector(".blog__updated").innerHTML = translate("article.lastupdate") + localDate(updatedSplit[2], updatedSplit[1], updatedSplit[0]);
}