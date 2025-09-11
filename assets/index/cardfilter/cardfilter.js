import {ApiBasePath} from "../../config.js";

let translations;

export const cardFilterComponent = async (lang) => {
	translations = await fetchFilterTranslations(lang);
	const buttons = [ ["bridge","brug"], ["tunnel","tunnel"], ["rail","spoor"], ["building","gebouw"] ].map(([type,category]) => ({ type, category }));
	const filterHtml =  buttons.map(b => buttonComponent(b.type, b.category)).join("");
	const filterElement = document.querySelector(".card-filter");
	filterElement.innerHTML = filterHtml;
}

const fetchFilterTranslations = async (lang) => {
	const response = await fetch(`${ApiBasePath}/${lang}.filter.json`);
	return await response.json();
}
const buttonComponent = (type, category) => `
<button class="card-filter__button_${type} fab card-filter__button_active" onclick="toggleButton(this, ${type}, ${category})" title="${translations[type + ".hide"]}" data-i18n="filter.${type}.hide"></button>
`;

// TODO: this does not work!! 
function toggleButton(button, translationKey, categoryName) {
	if (button.isActive) {
		button.title = translations[translationKey + ".show"];
		button.setAttribute("data-i18n", "filter." + translationKey + ".show");
		button.classList.add("card-filter__button_off");
		button.classList.remove("card-filter__button_active");
		button.isActive = false;
		hideCategory(categoryName);
	} else {
		button.title = translations[translationKey + ".show"];
		button.setAttribute("data-i18n", "filter." + translationKey + ".hide");
		button.isActive = true;
		button.classList.remove("card-filter__button_off");
		button.classList.add("card-filter__button_active");
		showCategory(categoryName);
	}
}

export const filter = () => {
	const buttons = [
		{ btn: document.querySelector(".card-filter__button_tunnel"), cat: "tunnel" },
		{ btn: document.querySelector(".card-filter__button_bridge"), cat: "brug" },
		{ btn: document.querySelector(".card-filter__button_rail"), cat: "spoor" },
		{ btn: document.querySelector(".card-filter__button_building"), cat: "gebouw" }
	];
	buttons.forEach(({ btn, cat }) => {
		if (btn.isActive) {
			showCategory(cat);
		} else {
			hideCategory(cat);
		}
	});
}

function hideCategory(className) {
	let categories = document.getElementsByClassName(className);
	let i;

	for (i = 0; i < categories.length; i++) {
		categories[i].classList.add("hide");
		categories[i].classList.remove("show_inline-block");
	}
}
function showCategory(className) {
	let categories = document.getElementsByClassName(className);
	let i;

	for (i = 0; i < categories.length; i++) {
		categories[i].classList.add("show_inline-block");
		categories[i].classList.remove("hide");
	}
}