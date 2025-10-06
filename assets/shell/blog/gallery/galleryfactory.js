import {ImageBasePath} from "../../../config.js";

const createImageLink = (category, routeId, item, size) => {
	return `${ImageBasePath}/${category}/${routeId}/${routeId}${item.name}-${size.width}x${size.height}.jpg`
}

const createPswpSrcSet = (sizes, category, routeId, item ) =>{
	return sizes.map((size) => createImageLink(category, routeId, item, size).concat(" ", size.width, "w"),).join(", ");
}

export const createLink = (item, category, routeId) => {
	// let linkWrapper = document.createElement("div");
	// linkWrapper.classList.add("gallery__item");
	
	let link = document.createElement("a");
	link.classList.add("gallery__item");
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

	// linkWrapper.appendChild(link);
	// return linkWrapper;
	return link;
}