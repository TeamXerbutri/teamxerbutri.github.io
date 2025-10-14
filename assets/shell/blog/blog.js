import {currentPage} from "../../navigator.js";
import {hideItems, showItems} from "../togglhelper.js";
import {initShareMenu} from "../header/menu/menu.js";
import {fetchTranslations} from "../../translator.js";
import {loadBlogFacts} from "./facts/facts.js";
import {loadBlogContent} from "./content/content.js";
import {loadGallery} from "./gallery/gallery.js";
import {loadJsonLd} from "./jsonld/jsonld.js";
import {parallel} from "../../helpers.js";

let isLoaded = false;

// should only contain logic for each call!
export const loadBlog = async () => {
	console.time("blog-loaded");
	hideItems(".header__index", "show_inline-block");
	showItems(".header__blog", "show_inline-block");
	hideItems(".index", "show");
	showItems(".blog", "show");

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
};

const buildBlog = async () => {
	const pathParts = currentPage().split("-");
	const category = pathParts[0];
	const routeId = pathParts[1];
	await parallel(loadBlogContent(category, routeId), loadBlogFacts(category, routeId));
	
	// TODO translateAll?
	await loadGallery(category, routeId);
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