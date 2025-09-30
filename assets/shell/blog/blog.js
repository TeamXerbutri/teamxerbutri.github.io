import {lang} from "../../language.js";
import {currentPage} from "../../navigator.js";
import {hideItems, showItems} from "../togglhelper.js";
import {initShareMenu} from "../header/menu/menu.js";
import {fetchTranslations} from "../../translator.js";
import {loadBlogFacts} from "./facts/facts.js";
import {loadBlogContent} from "./content/content.js";
import {buildGallery} from "./gallery/gallery.js";

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
	buildBlog(category, routeId).then(() => {console.timeEnd("blog-loaded");});
	
	console.warn(currentPage() + " is not yet implemented for " + lang());
	
};


const buildBlog = async (category, routeId) => {
	// first
	await fetchTranslations("blog");
	
	// second, in parallel
	
	await parallel(loadBlogContent(category, routeId), loadBlogFacts(category, routeId))
	//await loadBlogContent(category, routeId);
	//await loadBlogFacts(category, routeId);
	
	// after the blogContent is loaded, build the gallery.
	// TODO, I do NOT want to have a new eventListener every time this is hit.
	// TODO translateAll?
	await buildGallery(category, routeId);
	// if(document.querySelector("article").scrollHeight < app.clientHeight) {
	//  buildGallery(translator, jsonHelper, category, routeId);
	// }
	// else{
	// 	app.addEventListener("scroll", createImageGallery, true);
	// }
}

const parallel = async (task1, task2) => {
	return {
		result1: await task1,
		result2: await task2
	}
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