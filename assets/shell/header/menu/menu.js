import {currentPage, loadThisPage} from "../../../navigator.js";
import {isTouchDevice} from "../../../fix/touch.js";
import {SupportedLanguages} from "../../../config.js";
import {lang, setLanguage} from "../../../language.js";
import {reloadIndex} from "../../index/index.js";
import {reTranslateAll} from "../../../translator.js";

const shareMenuItem = (uri, title) => {
	return `<li><a class="li_mat-menu show" role="button" target="_blank" href="${uri}" title="${title}">${title}</a></li>`;
}

function showElement(elementId) {
	let element = document.getElementById(elementId);
	let dismiss = document.querySelector(".modal__dismiss");
	element.classList.add("show");
	element.classList.remove("hide");
	dismiss.classList.add("show");
	dismiss.classList.remove("hide");
	dismiss.addEventListener("click", function () {
		handleDismiss(elementId)
	}, true);
}


function handleDismiss(elementId) {
	let element = document.getElementById(elementId);
	let dismiss = document.querySelector(".modal__dismiss");

	if (dismiss.classList.contains("show")) {
		dismiss.classList.remove("show");
		dismiss.classList.add("hide");
	}

	if (element.classList.contains("show")) {
		element.classList.remove("show");
		element.classList.add("hide");
		document.removeEventListener("click", function () {
			handleDismiss(elementId)
		}, true);
	}
}

const menuItem = (key) => {
	let item = document.createElement("li");

	const hide = key.startsWith("menu") ? " index" : "";

	item.innerHTML = `<div class="li_mat-menu show${hide}" role="button" data-i18n="${key}.link" title="${key}">${key}</div>`;

	if (key === "contact" || key === "privacy") {
		item.addEventListener("click", function () {
			const elementId = key.toLowerCase() + "-panel";
			showElement(elementId);
		})
	} else if (key.startsWith("menu")) {
		const language = key.split(".")[1];
		item.addEventListener("click", function () {
			if (language === lang())
				return;

			const prevLang = lang();
			// set language
			setLanguage(language);
			// reload page
			reloadIndex();
			showRightLanguages(prevLang);
			reTranslateAll()
			loadThisPage();
		});
	} else {
		item.addEventListener("click", function () {
			pageEvents.loadPage(routingTable(key))
		});
	}

	return item;
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

export const initMenu = () => {

	let menu = document.querySelector(".sub-menu__dots");
	const routes = ["maps", "abouttx", "aboutue", "contact", "privacy"];

	SupportedLanguages.filter(l => l !== lang()).forEach(l => {
		routes.push("menu." + l);
	})
	routes.forEach(key => {
		menu.appendChild(menuItem(key));
	})

	if (isTouchDevice()) {
		let menuButton = document.querySelector(".menu__dots");
		menuButton.addEventListener("click", function () {
			document.querySelector(".sub-menu__dots").classList.toggle("show");
			document.addEventListener("click", handleMenuDismiss, true);
		});
	}
}

const showRightLanguages = (prevLang) => {
	let menu = document.querySelector(".sub-menu__dots");
	const langElement = menu.querySelectorAll(`.index`);
	langElement.forEach(l => {
		menu.removeChild(l.parentElement);
	})

	const languages = SupportedLanguages.filter(l => l !== lang());
	languages.filter(l => l !== lang()).forEach(key => {
		menu.appendChild(menuItem("menu." + key));
	})
}

const routingTable = (key) => {
	switch (key) {
		case "maps":
			return "map";
		case "abouttx":
			return "xerbutri-txatx";
		case "aboutue":
			return "xerbutri-txaue";
	}
};