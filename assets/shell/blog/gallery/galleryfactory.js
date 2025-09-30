import {ImageBasePath} from "../../../config.js";
import {translate} from "../../../translator.js";

// export const createLink = (item, category, routeId) => {
// 	// largest size
// 	const sizes = item.sizes;
// 	const heights = sizes.map((size) => size.height);
// 	const tallest = Math.max(...heights);
// 	const tallestIndex = heights.indexOf(tallest);
// 	const largest = sizes[tallestIndex];
//
// 	// smallest size
// 	const lowest = Math.min(...heights);
// 	const smallestIndex = heights.indexOf(lowest);
// 	const smallest = sizes[smallestIndex];
//	
// 	const link = createImageLink(category, routeId, item, largest);
// 	const title = "";
// 	const sourceSet = createPswpSrcSet(sizes, category, routeId, item);
// 	const src = createImageLink(category, routeId, item, smallest);
//	
// 	return template(link, title, largest, sourceSet, src);
// }

// const template = (link, title, largest, sourceSet, src) => {
// 	return `
// 	<a href="${link}" title="${title}" target="_blank" data-pswp-width="${largest.width}" data-pswp-height="${largest.height}" data-pswp-srcset="${sourceSet}"><img src="${src}" alt="${title}"></a>`;
// }

const createImageLink = (category, routeId, item, size) => {
	return `${ImageBasePath}/${category}/${routeId}/${routeId}${item.name}-${size.width}x${size.height}.jpg`
}

const createPswpSrcSet = (sizes, category, routeId, item ) =>{
	return sizes.map((size) => createImageLink(category, routeId, item, size).concat(" ", size.width, "w"),).join(", ");
}

export const createLink = (item, category, routeId) => {
	let link = document.createElement("a");
	// largest size
	const sizes = item.sizes;
	const heights = sizes.map((size) => size.height);
	const tallest = Math.max(...heights);
	const tallestIndex = heights.indexOf(tallest);
	const largest = sizes[tallestIndex];

	// smallest size
	const lowest = Math.min(...heights);
	const smallestIndex = heights.indexOf(lowest);
	const smallest = sizes[smallestIndex];

	link.href = createImageLink(category, routeId, item, largest);
	link.title = "";
	link.target = "_blank";
	
	link.setAttribute("data-pswp-width", largest.width);
	link.setAttribute("data-pswp-height", largest.height);
	link.setAttribute("data-pswp-srcset", createPswpSrcSet(sizes, category, routeId, item));
	link.innerHTML = `<img src="${createImageLink(category, routeId, item, smallest)}" alt="${link.title}">`
	
	return link;
}

export const galleryComponent = () =>{
	//gallery
	let gallerySection = document.querySelector(".blog__gallery");
	gallerySection.innerHTML = `<h2>${translate("gallery.title")}</h2><p>${translate("gallery.description")}</p>`;
	
	return gallerySection;
}