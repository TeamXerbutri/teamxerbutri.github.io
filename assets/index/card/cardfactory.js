function createCard(translator, BlogObject) {
	let link = document.createElement("a");
	link.classList.add("card");
	link.classList.add("show-ib");
	link.classList.add(BlogObject.category);
	link.href = createLink(BlogObject);
	link.title = BlogObject.description;

	let image = document.createElement("img");
	const source = "data/".concat(BlogObject.category, "/", BlogObject.routeid, "/", BlogObject.routeid);
	image.src = source.concat("m.jpg");
	image.alt = BlogObject.name;
	image.srcset = source.concat("m.jpg") + " 164w, " + source.concat("l.jpg") + " 237w, " + source.concat(".jpg") + " 310w";
	image.sizes = "(max-width: 756px) 164px, (max-width: 1350px) 237px, 310px";

	link.appendChild(image);

	let textWrapper = document.createElement("div");
	textWrapper.classList.add("card__card-tag");
	link.appendChild(textWrapper);

	let objectDescription = document.createElement("span");
	objectDescription.classList.add("card-tag__category");
	if (BlogObject.category === "xerbutri") {
		objectDescription.setAttribute("data-i18nix", BlogObject.routeid.concat(".realname"));
	} else {
		objectDescription.setAttribute("data-i18n", `category.${BlogObject.category}`);
	}

	objectDescription.innerText = createObjectDescription(BlogObject.category, BlogObject.name, translator);

	textWrapper.appendChild(objectDescription);

	let name = document.createElement("span");
	name.classList.add("card-tag__title");
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
	if (category) {
		firstLine = translator.translate(`category.${category}`);
	}
	return firstLine;
}


export {createCard};