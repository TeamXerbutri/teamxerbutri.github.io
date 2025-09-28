import {ApiBasePath, ImageBasePath} from "../../../config.js";
import {tagComponent} from "./tag/tag.js";
import {lang} from "../../../language.js";
import {fetchTranslations} from "../../../translator.js";
import {filter} from "../cardfilter/cardfilter.js";

const fetchCards = async () => {
	const response = await fetch(`${ApiBasePath}/index.${lang()}.json`);
	return await response.json();
}

let allCards = [];
let categoryTypes = {};
let totalCards;

export const loadCards = async () => {
	const translations = await fetchTranslations("card");
	const allCardsResponse = await fetchCards();
	categoryTypes = translations;
	allCards = await allCardsResponse;
	totalCards = maxCards();

	// First load.
	
	if (allCards.length < totalCards) {
		totalCards = allCards.length;
	}
	
	const cardsToShow = allCards.splice(0, totalCards);
	
	appendCards(cardsToShow);
}

export const lazyLoadCards = () => {
	let frame = document.getElementById("js-frame");
	frame.addEventListener("scroll", function () {
		if (frame.scrollTop + frame.clientHeight >= frame.scrollHeight) {

			const cardsToShow = allCards.splice(0, totalCards);
			if (cardsToShow.length > 0) {
				appendCards(cardsToShow);
			}
		}
	})
}

const appendCards = (cards) => {
	const cardHtml = cards.map(c=> buildCard(categoryTypes.category, c)).join("");
	document.querySelector(".card-feed").innerHTML += cardHtml;
}

const buildCard = (categoryTypes, card) => {
	const cardTag = tagComponent(categoryTypes, card); 
	return template(card, cardTag);
}

// TODO replace onclick with eventlistener
const template = (props, children) => `
<div class="card show_inline-block ${props.category}" onclick="pageEvents.loadPage('${createLink(props.category, props.routeid)}')" title="${props.description}">
<img src="${ImageBasePath}/${props.category}/${props.routeid}/${props.routeid}m.jpg" alt="${props.name}" srcset="${ImageBasePath}/${props.category}/${props.routeid}/${props.routeid}m.jpg 164w, ${ImageBasePath}/${props.category}/${props.routeid}/${props.routeid}l.jpg 237w, ${ImageBasePath}/${props.category}/${props.routeid}/${props.routeid}.jpg 310w" sizes="(max-width: 756px) 164px, (max-width: 1350px) 237px, 310px">${children}</div>`


const createLink = (category, routeid) => {
	let url;
	if (routeid === "map") {
		url = "map";
	} else {
		url = category.concat("-", routeid)
	}
	return url;
}

const maxCards = () => {
	const viewWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

	let columns = 4;

	if (viewWidth < 500) {
		columns = 2;
	}

	let cardHeight = 177;

	if (viewWidth < 765) {
		cardHeight = 123;
	}

	if (viewWidth > 1350) {
		cardHeight = 233;
	}

	const viewHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

	const rows = Math.ceil(viewHeight / cardHeight);
	return rows * columns;
}

export const onFilter = () =>{
	appendCards(allCards);
	allCards = [];
	filter();
}