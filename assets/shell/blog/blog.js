import {lang} from "../../language.js";
import {currentPage} from "../../navigator.js";

let isLoaded = false;
export const loadBlog = () => {
	console.warn(currentPage() + " is not yet implemented for " + lang());
};

export const blogComponent = () => {
	return `
<div class="blog hide"></div>
`;
}