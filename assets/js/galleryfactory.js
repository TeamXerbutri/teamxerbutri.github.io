function createGallery(items, category, abbreviation, translator){
	// TODO add the photo's here
	// I need the href of the largest image, with the width and height for data-pswp- size 
	// I need the available srcset for the srcset attribute
	// imageName -[{width- height}].
	
	//<a href="https://cdn.photoswipe.com/photoswipe-demo-images/photos/srcset-test/3-1500x1500.png" data-pswp-width="1500" data-pswp-height="1500" data-pswp-srcset="https://cdn.photoswipe.com/photoswipe-demo-images/photos/srcset-test/3-600x600.png 600w, https://cdn.photoswipe.com/photoswipe-demo-images/photos/srcset-test/3-1200x1200.png 1200w, https://cdn.photoswipe.com/photoswipe-demo-images/photos/srcset-test/3-1500x1500.png 1500w" target="_blank">
	//     <img src="https://cdn.photoswipe.com/photoswipe-demo-images/photos/srcset-test/3-300x300.png" alt="">
	//   </a>
	let gallerySection = document.getElementById("article-gallery");
	let galleryTitle = translator.translate("gallery.title");

	let galleryDescription = translator.translate("gallery.description");
	
	let gallery = document.createElement("div");
	gallery.classList.add("gallery");
	gallery.id = "gallery--responsive-images";
	
	let title = document.createElement("h3");
	title.innerText = galleryTitle;
	gallerySection.appendChild(title);
	
	let description = document.createElement("p");
	description.innerText = galleryDescription;
	gallerySection.appendChild(description);
	
	items.forEach((item) => {
		let link = document.createElement("a");

		// ToDo sizes
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
		
		link.href = "https://teamxerbutri.github.io/data/".concat(category, "/", abbreviation, "/", abbreviation, item.name, "-", largest.width, "x", largest.height, ".jpg");
		link.title = ""; //TODO later, add a title to the image
		link.target = "_blank";
				
		link.setAttribute("data-pswp-width", largest.width);
		link.setAttribute("data-pswp-height", largest.height);
		link.setAttribute("data-pswp-srcset", sizes.map((size) => "https://teamxerbutri.github.io/data/".concat(category, "/", abbreviation, "/", abbreviation, item.name, "-", size.width,  "x", size.height, ".jpg ", size.width, "w"),).join(", "));
		
		let image = document.createElement("img");
		image.src = "https://teamxerbutri.github.io/data/".concat(category, "/", abbreviation, "/", abbreviation, item.name, "-", smallestSize.width,  "x", smallestSize.height, ".jpg");
		image.alt = ""; //TODO add a title to the image
		
		link.appendChild(image);
		gallery.appendChild(link);
	});
	return gallery;
}

export { createGallery };