// <div class="tile">
//     <a href="avontuur/">
//         <img class="te" />    
//         <h3 class="te"></h3>
//         <h2 class="te"></h2>
//     </a>
// </div>

function createBlogObject(BlogObject, i) {
	let div = document.createElement('div');
	div.classList.add('tile');
	div.classList.add(BlogObject.category);

	let link = document.createElement('a');
	link.href = createLink(BlogObject);
	link.title = BlogObject.description;

	let image = document.createElement('img');
	const source = "data/".concat(BlogObject.category, "/", BlogObject.abbreviation, "/", BlogObject.abbreviation);
	image.src = source.concat(".jpg");
	image.alt = BlogObject.realname;
	image.classList.add('te')
	image.id = BlogObject.abbreviation;

	let picture = document.createElement('picture');
	if (i > 3) {
		let small = document.createElement('source');
		small.media = "(max-width:756px)";
		small.srcset = source.concat("s.jpg");
		small.id = BlogObject.abbreviation.concat("s");
		picture.appendChild(small);
	}
	let large = document.createElement('source');
	large.media = "(min-width:756px)";
	large.srcset = source.concat(".jpg");
	
	picture.appendChild(large);
	picture.appendChild(image);

	link.appendChild(picture);

	let objectDescription = document.createElement('h3');
	objectDescription.classList.add('te');
	objectDescription.innerText = createObjectDescription(BlogObject.category, BlogObject.realname, 'nl');

	link.appendChild(objectDescription);

	let name = document.createElement('h2');
	name.classList.add('te');
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

function createObjectDescription(category, realname, language) {
	let firstline = "";
	if (category === "xerbutri") {
		firstline = realname;
	} else {
		firstline = getCategoryName(category, language)
	}
	return firstline;
}

function getCategoryName(category, language) {
	switch (language) {
		case 'nl':
			return getCategoryNameNl(category);
		default:
			return "Not Found"
	}
}

function getCategoryNameNl(category) {
	switch (category) {
		case 'gebouw':
			return "Verlaten Gebouwen";
		case 'spoor':
			return "Spoorlijnen";
		case 'tunnel':
			return "Tunnels";
		case 'brug':
			return "Bruggen";
		default:
			return "Not Found"
	}
}

export {createBlogObject};