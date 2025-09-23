import {currentPage} from "../../../navigator.js";
import {isTouchDevice} from "../../../fix/touch.js";
import {fetchTranslations, translate} from "../../../translator.js";

const shareMenuItem = (uri, title) => {
	return `<li><a class="li_mat-menu" role="button" target="_blank" href="${uri}" title="${title}">${title}</a></li>`;
}

const menuItem = (key) => {
	return `<li class="li_mat-menu" role="button" onclick="pageEvents.loadPage('${translate(key+".route")}')" data-i18n="${key}.link" title="${translate(key+".title")}">${translate(key+".link")}</li>`;
}

const handleShareDismiss = () => {
	document.querySelector(".sub-menu__share").classList.remove("show");
	document.removeEventListener("click", handleShareDismiss, true);
}

const handleMenuDismiss = () => {
	document.querySelector(".sub-menu__dots").classList.remove("show");
	document.removeEventListener("click", handleMenuDismiss, true);
}

export const initShareMenu = () => {

	const shareMenu = document.querySelector(".sub-menu__share");
	const route = currentPage().split("-")[1];
	const path = location.href.concat("avontuur/", route);
	const uri = encodeURIComponent(path);

	const facebook = shareMenuItem("https://www.facebook.com/sharer/sharer.php?u=" + uri, "Facebook");
	const whatsapp = shareMenuItem("whatsapp://send?text=" + uri, "Whatsapp");

	shareMenu.innerHTML = facebook + whatsapp;

	if (isTouchDevice()) {
		const shareButton = document.querySelector(".menu__share");
		shareButton.addEventListener("click", () => {
			document.querySelector(".sub-menu__share").classList.toggle("show");
			document.addEventListener("click", handleShareDismiss, true);
		});
	}
}

export const initMenu = async () => {
	
	const translations = await fetchTranslations("menu");

	let menu = document.querySelector(".sub-menu__dots");
	Object.entries(translations).forEach(([key, value]) => {
		menu.innerHTML += menuItem(key);
	})
	
	if(isTouchDevice()) {
		let menuButton = document.querySelector(".menu__dots");
		menuButton.addEventListener("click", function () {
			document.querySelector(".sub-menu__dots").classList.toggle("show");
			document.addEventListener("click", handleMenuDismiss, true);
		});
	}
}

// TODO: The languages