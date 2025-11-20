import {currentPage} from "../../navigator.js";
import {hideItems, showItems} from "../togglhelper.js";
import {initShareMenu, loadShareMenu} from "../header/menu/menu.js";
import {fetchTranslations, translate} from "../../translator.js";
import {loadBlogContent} from "./content/content.js";
import {loadJsonLd} from "./jsonld/jsonld.js";
import {parallel} from "../../helpers.js";
import {loadBlogInfo} from "./info/info.js";

let isLoaded = false;

// should only contain logic for each call!
export const loadBlog = async () => {
	try {
		console.time("blog-loaded");
		hideItems(".header__index", "show_inline-block");
		showItems(".header__blog", "show_inline-block");
		hideItems(".index", "show");
		showItems(".blog", "show");
		document.querySelectorAll(".blog_hide").forEach(e=>e.hidden = true);

		let frame = document.getElementById("js-frame");
		frame.classList.add("frame__blog_size");

		const headerElem = document.querySelector("header");
		headerElem.classList.add("frame__blog_size");

		if (!isLoaded) {
			await init();
			isLoaded = true;
		}

		// blog loading async part. => fetch and load.
		await buildBlog();
		frame.scrollTop = 0;
		console.timeEnd("blog-loaded");
	} catch (err) {
		setBlogNotFound();
	}
};

const buildBlog = async () => {
	const pathParts = currentPage().split("-");
	const category = pathParts[0];
	const routeId = pathParts[1];

	if (routeId === "404") {
		setBlogNotFound();
		return;
	}

	await parallel(loadBlogContent(category, routeId), loadBlogInfo(category, routeId));
	loadShareMenu();
	
	await loadJsonLd(category, routeId);
}

const init = async () => {
	await fetchTranslations("blog");
	initShareMenu();
}

export const blogComponent = () => {
	return `
<div class="blog hide">
<div class="blog__title"></div>
<article>
<p class="blog__author-visit blog_ital blog_hide" hidden></p>
<p class="blog__intro"></p>
<aside class="blog__facts blog_hide" hidden></aside>
<section class="blog__content blog_hide" hidden></section>
<p class="blog__updated blog_ital blog_hide" hidden></p>
<section class="blog__sources blog_hide" hidden></section>
<section class="blog__gallery blog_hide" hidden></section>
</article>
<script id="jsonld" type="application/ld+json"></script>
</div>
`;
}

const setBlogNotFound = () => {
	const errorTitle = translate("errors.404.title");
	const errorDescription = translate("errors.404.content");
	document.title = "404 " + errorTitle + " - Xerbutri Urban Exploring";
	document.querySelector('meta[name="description"]').setAttribute("content", errorDescription);
	document.querySelector(".blog__title").innerHTML = `<h1>${errorTitle}</h1>`;
	document.querySelector(".blog__intro").innerHTML = `<p>${errorDescription}</p>`;
}