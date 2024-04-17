function createGallery(items, category, routeId, gallery){
	
	items.forEach((item) => {
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
		
		link.href = "https://teamxerbutri.github.io/data/".concat(category, "/", routeId, "/", routeId, item.name, "-", largest.width, "x", largest.height, ".jpg");
		link.title = ""; //TODO later, add a title to the image
		link.target = "_blank";
				
		link.setAttribute("data-pswp-width", largest.width);
		link.setAttribute("data-pswp-height", largest.height);
		link.setAttribute("data-pswp-srcset", sizes.map((size) => "https://teamxerbutri.github.io/data/".concat(category, "/", routeId, "/", routeId, item.name, "-", size.width,  "x", size.height, ".jpg ", size.width, "w"),).join(", "));
		
		let image = document.createElement("img");
		image.src = "https://teamxerbutri.github.io/data/".concat(category, "/", routeId, "/", routeId, item.name, "-", smallestSize.width,  "x", smallestSize.height, ".jpg");
		image.alt = ""; //TODO add a title to the image
		
		link.appendChild(image);
		gallery.appendChild(link);
	});
	return gallery;
}

export { createGallery };