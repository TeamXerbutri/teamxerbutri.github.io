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
	
	
	const headerElem = document.querySelector("header");

	if (headerElem.classList.contains("hide"))
		headerElem.classList.remove("hide");

	if (!headerElem.classList.contains("blog"))
		headerElem.classList.add("blog")
	initShareMenu();
	
	console.warn(currentPage() + " is not yet implemented for " + lang());
};

export const blogComponent = () => {
	return `
<div class="blog hide"></div>
`;
}