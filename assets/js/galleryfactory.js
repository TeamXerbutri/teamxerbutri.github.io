function createLink(item, category, routeId, gallery) {
	let link = document.createElement("a");

	// largest size
	let sizes = item.sizes;
	let heights = sizes.map((size) => size.height);
	let tallest = Math.max(...heights);
	let tallestIndex = heights.indexOf(tallest);
	let largest = sizes[tallestIndex];

	// smallest
	let smallest = Math.min(...heights);
	let smallestIndex = heights.indexOf(smallest);
	let smallestSize = sizes[smallestIndex];

	link.href = "../data/".concat(category, "/", routeId, "/", routeId, item.name, "-", largest.width, "x", largest.height, ".jpg");
	link.title = ""; //TODO later, add a title to the image
	link.target = "_blank";

	link.setAttribute("data-pswp-width", largest.width);
	link.setAttribute("data-pswp-height", largest.height);
	link.setAttribute("data-pswp-srcset", sizes.map((size) => "../data/".concat(category, "/", routeId, "/", routeId, item.name, "-", size.width, "x", size.height, ".jpg ", size.width, "w"),).join(", "));

	let image = document.createElement("img");
	image.src = "../data/".concat(category, "/", routeId, "/", routeId, item.name, "-", smallestSize.width, "x", smallestSize.height, ".jpg");
	image.alt = ""; //TODO add a title to the image

	link.appendChild(image);
	return link;
}

function createGallery(items, category, routeId, gallery){
	items.forEach((item) => {
		const link = createLink(item, category, routeId, gallery);
		gallery.appendChild(link);
	});
	return gallery;
}

function createGalleryWithCaptions(items, captions, category, routeId, gallery){
	items.forEach((item) => {
		let itemDiv = document.createElement("div");
		itemDiv.classList.add("pswp-gallery__item");
		
		const link = createLink(item, category, routeId, gallery);
		itemDiv.appendChild(link);
		
		if(captions[item.name]) {
			let captionDiv = document.createElement("div");
			captionDiv.classList.add("pswp-caption-content");

			captionDiv.innerText = captions[item.name];
			itemDiv.appendChild(captionDiv);
		}
		gallery.appendChild(itemDiv);
	});
	return gallery;
}


export { createGallery, createGalleryWithCaptions };