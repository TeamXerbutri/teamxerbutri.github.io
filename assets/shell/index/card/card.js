import {tagComponent} from "./tag/tag.js";
import {lang} from "../../../language.js";
import {fetchTranslations} from "../../../translator.js";
import {filter} from "../cardfilter/cardfilter.js";
import {apiBasePath} from "../../../navigator.js";

const fetchCards = async () => {
	const response = await fetch(`${apiBasePath()}/index.${lang()}.json`);
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

// Comment: Using map and += for the innerHtml causes annoying flickering of the screen when new cards are added.
const appendCards = (cards) => {
	const cardContainer = document.querySelector(".card-feed");

	for (let i in cards) {
		let displayCard = buildCard(categoryTypes.category, cards[i]);
		cardContainer.appendChild(displayCard);
	}
}

const buildCard = (categoryTypes, card) => {
	const cardTag = tagComponent(categoryTypes, card);

	let divCard = document.createElement("div");
	divCard.className = `card show_inline-block ${card.category}`;
	divCard.setAttribute("title", card.description);
	divCard.addEventListener("click", () => {
		pageEvents.loadPage(`${createLink(card.category, card.routeid)}`);
	});
	divCard.innerHTML = `<img src="${ImageBasePath}/${card.category}/${card.routeid}/${card.routeid}m.jpg" alt="${card.name}" srcset="${ImageBasePath}/${card.category}/${card.routeid}/${card.routeid}m.jpg 164w, ${ImageBasePath}/${card.category}/${card.routeid}/${card.routeid}l.jpg 237w, ${ImageBasePath}/${card.category}/${card.routeid}/${card.routeid}.jpg 310w" sizes="(max-width: 756px) 164px, (max-width: 1350px) 237px, 310px">${cardTag}</div>`;
	return divCard;
}

const createLink = (category, routeid) => {
	let url;
	if (routeid === "map") {
		url = "map";
	} else {
		url = category.concat("-", routeid);
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

export const onFilter = () => {
	appendCards(allCards);
	allCards = [];
	filter();
}