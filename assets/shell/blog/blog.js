import {lang} from "../../language.js";
import {currentPage} from "../../navigator.js";
import {hideItems, showItems} from "../togglhelper.js";
import {initShareMenu} from "../header/menu/menu.js";

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
	
	console.warn(currentPage() + " is not yet implemented for " + lang());
	console.timeEnd("blog-loaded");
};

const init = () => {
	initShareMenu();
}

export const blogComponent = () => {
	return `
<div class="blog hide">
<div class="blog__title"></div>
<p class="blog__author-visit blog_ital"></p>
<p class="blog__intro"></p>
<aside class="blog__facts"></aside>
<section class="blog__content"></section>
<p class="blog__updated blog_ital"></p>
<section class="blog__sources"></section>
<section class="blog__gallery"></section>
<script id="jsonld" type="application/ld+json"></script>
</div>
`;
}