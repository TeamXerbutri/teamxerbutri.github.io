import {ApiBasePath} from "../config.js";
import {addTranslations, translate} from "../translator.js";

function showBackToTop() {
	let bt = document.querySelector(".back-to-top");
	bt.IsActive = true;
	bt.classList.remove("hide");
	bt.classList.add("back-to-top_show");
}

const fetchBackToTopTranslations = async (lang) => {
	const response = await fetch(`${ApiBasePath}/${lang}.backtotop.json`);
	return await response.json();
}

function hideBackToTop() {
	let bt = document.querySelector(".back-to-top");
	bt.IsActive = false;
	bt.classList.remove("back-to-top_show");
	bt.classList.add("hide");
}

export const initializeBackToTop = async (lang) => {
	let app = document.getElementById("js-app");
	hideBackToTop();

	const translations = await fetchBackToTopTranslations(lang);
	addTranslations(translations);
	let bt = document.querySelector(".back-to-top");
	bt.title = translate("backtotop.title");
	bt.setAttribute("data-i18n", "backtotop.title");

	app.onscroll = function (ev) {
		let bt = document.querySelector(".back-to-top");
		if (app.scrollTop >= 200 && !bt.IsActive) {
			showBackToTop();
			return;
		}
		if (bt.IsActive && app.scrollTop < 200) {
			hideBackToTop();
		}
	}
}

const upArrow = '<svg aria-hidden="true" class="icon_dark" viewBox="0 0 24 24" width="24" height="24"><path d="m0,24 l0,-12 l12,-12 l12,12 l0,12 l-12,-12 l-12,12 Z"/></svg>';

// TODO: aria-label
const fabBackToTop = `<a class="back-to-top fab hide" href="#href-top" title="Back to top">${upArrow}</a>`;

// TODO: Why classname?
export const backToTopComponent = (className, children) => {
	
	return `
<div id="href-top" class="${className}">
	${children}
</div>
${fabBackToTop}
`;
}
