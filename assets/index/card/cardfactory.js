function createCard(translator, BlogObject) {
	let card = document.createElement("a");
	card.classList.add("card");
	card.classList.add("show-ib");
	card.classList.add(BlogObject.category);
	card.href = createLink(BlogObject.routeid);
	card.title = BlogObject.description;

	let image = document.createElement("img");
	const source = "data/".concat(BlogObject.category, "/", BlogObject.routeid, "/", BlogObject.routeid);
	image.src = source.concat("m.jpg");
	image.alt = BlogObject.name;
	image.srcset = source.concat("m.jpg") + " 164w, " + source.concat("l.jpg") + " 237w, " + source.concat(".jpg") + " 310w";
	image.sizes = "(max-width: 756px) 164px, (max-width: 1350px) 237px, 310px";

	card.appendChild(image);

	let cardTag = document.createElement("div");
	cardTag.classList.add("card__card-tag");
	card.appendChild(cardTag);

	let cardTagCategory = document.createElement("span");
	cardTagCategory.classList.add("card-tag__category");
	if (BlogObject.category === "xerbutri") {
		cardTagCategory.setAttribute("data-i18nix", BlogObject.routeid.concat(".realname"));
	} else {
		cardTagCategory.setAttribute("data-i18n", `category.${BlogObject.category}`);
	}

	cardTagCategory.innerText = createCardTag(BlogObject.category, BlogObject.name, translator);

	cardTag.appendChild(cardTagCategory);

	let cardTagTitle = document.createElement("span");
	cardTagTitle.classList.add("card-tag__title");
	cardTagTitle.setAttribute("data-i18nix", BlogObject.routeid.concat(".shortname"));
	cardTagTitle.innerText = BlogObject.tilename;
	cardTag.appendChild(cardTagTitle);

	return card;
}

function createLink(routeid) {
	let url;
	if (routeid === "map") {
		url = "map";
	} else {
		url = "avontuur/".concat(routeid)
	}
	return url;
}

function createCardTag(category, name, translator) {

	if (category === "xerbutri")
		return name;

	if (category)
		return translator.translate(`category.${category}`);
	
	return "";
}


export {createCard};