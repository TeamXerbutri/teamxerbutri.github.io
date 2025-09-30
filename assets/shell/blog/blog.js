import {lang} from "../../language.js";
import {currentPage} from "../../navigator.js";
import {hideItems, showItems} from "../togglhelper.js";
import {initShareMenu} from "../header/menu/menu.js";
import {fetchTranslations} from "../../translator.js";
import {loadBlogFacts} from "./facts/facts.js";
import {loadBlogContent} from "./content/content.js";

let isLoaded = false;
export const loadBlog = () => {
	console.time("blog-loaded");
	hideItems(".header__index", "show_inline-block");
	showItems(".header__blog", "show_inline-block");
	hideItems(".index", "show");
	showItems(".blog", "show");

	let frame = document.getElementById("js-frame");
	frame.classList.add("frame__blog_size");
	
	const headerElem = document.querySelector("header");
	
	headerElem.classList.add("frame__blog_size")
	

	if (!isLoaded) {
		init()
		isLoaded = true;
	}
	
	// document title
	// blog loading async part. => fetch and load.
	const pathParts = currentPage().split("-");
	const category = pathParts[0];
	const routeId = pathParts[1];
	buildBlog(category, routeId);
	
	console.warn(currentPage() + " is not yet implemented for " + lang());
	console.timeEnd("blog-loaded");
};


const buildBlog = async (category, routeId) => {
	// first
	await fetchTranslations("blog");
	
	// second, in parallel
	await loadBlogContent(category, routeId);
	await loadBlogFacts(category, routeId);
}



const init = () => {
	initShareMenu();
}

export const blogComponent = () => {
	return `
<div class="blog hide">
<div class="blog__title"></div>
<article>
<p class="blog__author-visit blog_ital"></p>
<p class="blog__intro"></p>
<aside class="blog__facts"></aside>
<section class="blog__content"></section>
<p class="blog__updated blog_ital"></p>
<section class="blog__sources"></section>
<section class="blog__gallery"></section>
</article>
<script id="jsonld" type="application/ld+json"></script>
</div>
`;
}