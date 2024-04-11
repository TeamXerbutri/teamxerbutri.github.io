﻿// <div class="tile">
//     <a href="avontuur/">
//         <img class="te" />    
//         <h3 class="te"></h3>
//         <h2 class="te"></h2>
//     </a>
// </div>

function createBlogObject(translator, BlogObject, i) {
	let div = document.createElement("div");
	div.classList.add("tile");
	div.classList.add(BlogObject.category);

	let link = document.createElement("a");
	link.href = createLink(BlogObject);
	link.title = BlogObject.description;

	let image = document.createElement("img");
	const source = "data/".concat(BlogObject.category, "/", BlogObject.abbreviation, "/", BlogObject.abbreviation);
	image.src = source.concat(".jpg");
	image.alt = BlogObject.realname;
	image.classList.add("te")
	image.id = BlogObject.abbreviation;

	let picture = document.createElement("picture");
	if (i > 3) {
		let small = document.createElement("source");
		small.media = "(max-width:756px)";
		small.srcset = source.concat("s.jpg");
		small.id = BlogObject.abbreviation.concat("s");
		picture.appendChild(small);
	}
	let large = document.createElement("source");
	large.media = "(min-width:756px)";
	large.srcset = source.concat(".jpg");

	picture.appendChild(large);
	picture.appendChild(image);

	link.appendChild(picture);

	let objectDescription = document.createElement("h3");
	objectDescription.classList.add("te");
	if(BlogObject.category === "xerbutri"){
		objectDescription.setAttribute("data-i18nix", BlogObject.abbreviation.concat(".realname"));
	}
	else {
		objectDescription.setAttribute("data-i18n", `category.${BlogObject.category}`);
	}
	
	objectDescription.innerText = createObjectDescription(BlogObject.category, BlogObject.realname, translator);

	link.appendChild(objectDescription);

	let name = document.createElement("h2");
	name.classList.add("te");
	name.setAttribute("data-i18nix", BlogObject.abbreviation.concat(".shortname"));
	name.innerText = BlogObject.shortname;
	link.appendChild(name);

	div.appendChild(link);
	return div;
}

function createLink(BlogObject) {
	let link = "";
	if (BlogObject.abbreviation === "map") {
		link = "map";
	} else {
		link = "avontuur/".concat(BlogObject.abbreviation)
	}
	return link;
}

function createObjectDescription(category, realname, translator) {
	let firstline = "";
	if (category === "xerbutri") {
		return realname;
	}
	if(category){
		firstline = translator.translate(`category.${category}`);
	}
	return firstline;
}



export {createBlogObject};