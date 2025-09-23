import {lang} from "../../language.js";
import {currentPage} from "../../navigator.js";
import {hideItems, showItems} from "../togglhelper.js";
import {initShareMenu} from "../header/menu/menu.js";

let isLoaded = false;
export const loadBlog = () => {
	hideItems(".header__index", "show_inline-block");
	showItems(".header__blog", "show_inline-block");
	hideItems(".index", "show");
	showItems(".blog", "show");

	let frame = document.getElementById("js-frame");
	frame.classList.add("frame__blog_size");
	
	const headerElem = document.querySelector("header");
	
	headerElem.classList.add("frame__blog_size")
	initShareMenu();
	
	console.warn(currentPage() + " is not yet implemented for " + lang());
};

export const blogComponent = () => {
	return `
<div class="blog hide"></div>
`;
}