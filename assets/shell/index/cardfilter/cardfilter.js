import {fetchTranslations, translate} from "../../../translator.js";

export const loadCardFilter = async () => {
	await fetchTranslations("filter");
	const buttons = [ ["bridge","brug"], ["tunnel","tunnel"], ["rail","spoor"], ["building","gebouw"] ].map(([type,category]) => ({ type, category }));
	const filterElement = document.querySelector(".card-filter");
	buttons.map(b => buttonComponent(filterElement, b.type, b.category));
}

const buttonComponent = (filterElement, type, category) => {
	const button = document.createElement("button");
	button.className = `card-filter__button_${type} fab card-filter__button_active`;
	button.title = translate(type + ".hide");
	button.setAttribute("data-i18n", "filter." + type + ".hide");
	button.isActive = true;
	button.onclick = function() { toggleButton(this, type, category); };
	filterElement.appendChild(button);
}

function toggleButton(button, translationKey, categoryName) {
	if (button.isActive) {
		button.title = translate(translationKey + ".show");
		button.setAttribute("data-i18n", "filter." + translationKey + ".show");
		button.classList.add("card-filter__button_off");
		button.classList.remove("card-filter__button_active");
		button.isActive = false;
		hideCategory(categoryName);
	} else {
		button.title = translate(translationKey + ".show");
		button.setAttribute("data-i18n", "filter." + translationKey + ".hide");
		button.isActive = true;
		button.classList.remove("card-filter__button_off");
		button.classList.add("card-filter__button_active");
		showCategory(categoryName);
	}
}

export const cardFilterComponent = `<div class="card-filter" role="toolbar"></div>`

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