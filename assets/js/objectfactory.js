function createBlogObject(translator, BlogObject, i) {
	let link = document.createElement("a");
	link.classList.add("tile");
	link.classList.add(BlogObject.category);
	link.href = createLink(BlogObject);
	link.title = BlogObject.description;

	let image = document.createElement("img");
	const source = "data/".concat(BlogObject.category, "/", BlogObject.routeid, "/", BlogObject.routeid);
	image.src = source.concat(".jpg");
	image.alt = BlogObject.name;
	image.classList.add("te")
	image.id = BlogObject.routeid;

	let picture = document.createElement("picture");
	if (i > 3) {
		let small = document.createElement("source");
		small.media = "(max-width:756px)";
		small.srcset = source.concat("s.jpg");
		small.id = BlogObject.routeid.concat("s");
		picture.appendChild(small);
	}
	let large = document.createElement("source");
	large.media = "(min-width:756px)";
	large.srcset = source.concat(".jpg");

	picture.appendChild(large);
	picture.appendChild(image);

	link.appendChild(picture);

	let textWrapper = document.createElement("div");
	textWrapper.classList.add("tile-text-wrapper");
	link.appendChild(textWrapper);
	
	let objectDescription = document.createElement("h3");
	objectDescription.classList.add("te");
	if(BlogObject.category === "xerbutri"){
		objectDescription.setAttribute("data-i18nix", BlogObject.routeid.concat(".realname"));
	}
	else {
		objectDescription.setAttribute("data-i18n", `category.${BlogObject.category}`);
	}
	
	objectDescription.innerText = createObjectDescription(BlogObject.category, BlogObject.name, translator);

	textWrapper.appendChild(objectDescription);

	let name = document.createElement("h2");
	name.classList.add("te");
	name.setAttribute("data-i18nix", BlogObject.routeid.concat(".shortname"));
	name.innerText = BlogObject.tilename;
	textWrapper.appendChild(name);
	
	return link;
}

function createLink(BlogObject) {
	let url;
	if (BlogObject.routeid === "map") {
		url = "map";
	} else {
		url = "avontuur/".concat(BlogObject.routeid)
	}
	return url;
}

function createObjectDescription(category, realname, translator) {
	let firstLine = "";
	if (category === "xerbutri") {
		return realname;
	}
	if(category){
		firstLine = translator.translate(`category.${category}`);
	}
	return firstLine;
}



export {createBlogObject};