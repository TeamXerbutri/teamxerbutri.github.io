import {appState} from "./appstate.js";

function fetchBlogData() {
	return fetch("../../data/blogs.".concat(appState.language, ".json")).then((response) => response.json());
}

function fetchHomeData() {
	return fetch("data/index.".concat(appState.language, ".json")).then((response) => response.json());
}

export function getBlogDataById(id) {
	const blogs = fetchBlogData();
	return blogs.then((data) => {
		return data[id]
	});
}

export function getBlogData() {
	const blogs = fetchBlogData();
	return blogs.then((data) => data);
}

export function getHomeData() {
	const home = fetchHomeData();
	return home.then((data) => data);
}