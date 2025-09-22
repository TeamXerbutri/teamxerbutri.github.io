import {fetchTranslations, translate} from "../../translator.js";

function showBackToTop() {
	let bt = document.querySelector(".back-to-top");
	bt.IsActive = true;
	bt.classList.remove("hide");
	bt.classList.add("back-to-top_show");
}

function hideBackToTop() {
	let bt = document.querySelector(".back-to-top");
	bt.IsActive = false;
	bt.classList.remove("back-to-top_show");
	bt.classList.add("hide");
}

export const initializeBackToTop = async () => {
	let frame = document.getElementById("js-frame");
	hideBackToTop();

	await fetchTranslations("backtotop");
	let bt = document.querySelector(".back-to-top");
	bt.title = translate("backtotop.title");
	bt.setAttribute("data-i18n", "backtotop.title");

	frame.onscroll = function (ev) {
		let bt = document.querySelector(".back-to-top");
		if (frame.scrollTop >= 200 && !bt.IsActive) {
			showBackToTop();
			return;
		}
		if (bt.IsActive && frame.scrollTop < 200) {
			hideBackToTop();
		}
	}
}

const upArrow = '<svg aria-hidden="true" class="icon_dark" viewBox="0 0 24 24" width="24" height="24"><path d="m0,24 l0,-12 l12,-12 l12,12 l0,12 l-12,-12 l-12,12 Z"/></svg>';

// TODO: aria-label
const fabBackToTop = `<a class="back-to-top fab hide" href="#href-top" title="Back to top">${upArrow}</a>`;

// TODO: Why classname?
export const backToTopComponent = (children) => {
	
	return `
<div id="href-top">
	${children}
</div>
${fabBackToTop}
`;
}
