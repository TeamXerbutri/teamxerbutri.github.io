import {lastUrl} from "./navigator.js";
import {navState} from "../../main.js";

function showElement(elementId) {
	let element = document.getElementById(elementId);
	let dismiss = document.getElementById("tx-panel-dismiss");
	element.classList.add("show");
	dismiss.classList.add("show");
	dismiss.addEventListener("click", function () {
		handleDismiss(elementId)
	}, true);
}


function handleDismiss(elementId) {
	let element = document.getElementById(elementId);
	let dismiss = document.getElementById("tx-panel-dismiss");
	
	if (dismiss.classList.contains("show")) {
		dismiss.classList.remove("show");
	}

	if (element.classList.contains("show")) {
		element.classList.remove("show");
		document.removeEventListener("click", function () {
			handleDismiss(elementId)
		}, true);
	}
}


function handleMenuDismiss() {
	let menu = document.getElementById("menu");
	if (menu.classList.contains("show")) {
		menu.classList.remove("show");
		document.removeEventListener("click", handleMenuDismiss, true);
	}
}

function handleShareDismiss() {
	let shareMenu = document.getElementById("share-menu");
	if (shareMenu.classList.contains("show")) {
		shareMenu.classList.remove("show");
		document.removeEventListener("click", handleShareDismiss, true);
	}
}

function initializeMenu(basePath) {
	let menu = document.getElementById("menu");
	menu.appendChild(menuItemFactory(basePath + "map", "Maps", "maps.link"));
	menu.appendChild(menuItemFactory(basePath + "avontuur/txatx", "Over TX", "abouttx.link"));
	menu.appendChild(menuItemFactory(basePath + "avontuur/txaue", "Over UE", "aboutue.link"));
	menu.appendChild(menuItemFactory("#", "Contact", "contact.link"));
	menu.appendChild(menuItemFactory("#", "Privacy", "privacy.link"));

	if (!("ontouchstart" in document.documentElement)) {
		document.documentElement.classList.add("no-touch");
	} else {
		let menuButton = document.getElementById("menu-button");
		menuButton.addEventListener("click", function () {
			document.getElementById("menu").classList.toggle("show");
			document.addEventListener("click", handleMenuDismiss, true);
		});
	}
}

function menuItemFactory(url, title, langLink) {
	let item = document.createElement("li");
	let link = document.createElement("a");
	link.classList.add("mat-menu-item");
	link.href = url;
	link.innerHTML = title;
	link.setAttribute("data-i18n", langLink);

	if (url === "#") {
		link.setAttribute("role", "button");
		link.href = "javascript:void(0);";
		link.addEventListener("click", function () {
			const elementId = title.toLowerCase() + "-panel";
			showElement(elementId);
		})
	}

	item.appendChild(link);
	return item;
}

function shareMenuItemFactory(uri, title) {
	let item = document.createElement("li");
	let link = document.createElement("a");
	link.classList.add("mat-menu-item");
	link.target = "_blank";
	link.href = uri;
	link.innerHTML = title;
	link.title = title;

	item.appendChild(link);
	return item;
}

function initializeShareMenu() {

	let shareMenu = document.getElementById("share-menu");
	const uri = encodeURIComponent(location.href);

	let facebook = shareMenuItemFactory("https://www.facebook.com/sharer/sharer.php?u=" + uri, "Facebook");
	let whatsapp = shareMenuItemFactory("whatsapp://send?text=" + uri, "Whatsapp");

	shareMenu.appendChild(facebook);
	shareMenu.appendChild(whatsapp);

	if (("ontouchstart" in document.documentElement)) {
		let shareButton = document.getElementById("share-button");
		shareButton.addEventListener("click", function () {
			document.getElementById("share-menu").classList.toggle("show");
			document.addEventListener("click", handleShareDismiss, true);
		});
	}
}

function initializeNavBack() {
	let backNavigation = document.getElementById("nav-back");
	backNavigation.addEventListener("click", function (e) {
		e.preventDefault();
		let url = lastUrl();
		navState.navigate("/" + url);
		history.pushState(null, null, "/" + url);
	});
}

export {
	initializeMenu, initializeShareMenu, initializeNavBack
}