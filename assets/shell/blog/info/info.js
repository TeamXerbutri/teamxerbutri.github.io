import {loadGallery} from "./gallery/gallery.js";
import {apiBasePath} from "../../../config.js";
import {get} from "../../../helpers.js";
import {loadBlogFacts} from "./facts/facts.js";
import {loadBlogSources} from "./sources/sources.js";

const fetchBlogInfo = async (category, routeId) => {
	try {
		const response = await get(`${apiBasePath()}/${category}/${routeId}/blog.json`);
		return await response.json();
	} catch (error) {
		console.error(`Error fetching blog facts for ${routeId}: ${error}`);
		return {facts: {}, sources: [], gallerytype: "none", hasfacts: false};
	}
}

export const loadBlogInfo = async (category, routeId) => {
	const blogInfo = await fetchBlogInfo(category, routeId);
	
	loadBlogFacts(blogInfo, routeId);
	loadBlogSources(blogInfo);
	await loadGallery(category, routeId, blogInfo.gallerytype);
}


