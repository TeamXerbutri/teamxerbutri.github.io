import {loadBlog} from "./shell/blog/blog.js";

let current = "home";

export const getInitialPage = () => {
	// 1 The route is dependent on DOM via window.location
	
	if (window.location.pathname.length > 1) {
		const redirect = sessionStorage.redirect;
		delete sessionStorage.redirect;

		if (redirect && redirect !== location.href) {
			current = redirect;
		}
	}
}

export const currentPage = () => current;

export const setCurrentPage = (page) => {
	current = page;
}

// routing via pageEvents TODO detect back button or swiping.
export const registerPages = () => {
	window.pageEvents = {
		loadBlog,
	}
}