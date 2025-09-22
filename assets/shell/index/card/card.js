import {ApiBasePath, ImageBasePath} from "../../../config.js";
import {tagComponent} from "./tag/tag.js";
import {lang} from "../../../language.js";
import {fetchTranslations} from "../../../translator.js";

const fetchCards = async () => {
	const response = await fetch(`${ApiBasePath}/index.${lang()}.json`);
	return await response.json();
}

export const loadCards = async () => {
	const translations = await fetchTranslations("card");
	const allCardsResponse = await fetchCards();
	const categoryTypes = await translations;
	const allCards = await allCardsResponse;
	appendCards(categoryTypes.category, allCards);
}

const appendCards = (categoryTypes, cards) => {
	const cardHtml = cards.map(c=> buildCard(categoryTypes, c)).join("");
	document.querySelector(".card-feed").innerHTML = cardHtml;
}

const buildCard = (categoryTypes, card) => {
	const cardTag = tagComponent(categoryTypes, card); 
	return template(card, cardTag);
}

const template = (props, children) => `
<div class="card show_inline-block ${props.category}" onclick="pageEvents.loadBlog('${createLink(props.category, props.routeid)}')" title="${props.description}">
<img src="${ImageBasePath}/${props.category}/${props.routeid}/${props.routeid}m.jpg" alt="${props.name}" srcset="${ImageBasePath}/${props.category}/${props.routeid}/${props.routeid}m.jpg 164w, ${ImageBasePath}/${props.category}/${props.routeid}/${props.routeid}l.jpg 237w, ${ImageBasePath}/${props.category}/${props.routeid}/${props.routeid}.jpg 310w" sizes="(max-width: 756px) 164px, (max-width: 1350px) 237px, 310px">${children}</div>`


function createLink(category, routeid) {
	let url;
	if (routeid === "map") {
		url = "map";
	} else {
		url = category.concat("-", routeid)
	}
	return url;
}