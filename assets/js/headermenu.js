function showItem(elementId) {
	console.log("Showing item " + elementId);
	document.addEventListener("click", function (evt) {
		hideItem(elementId, evt)
	});
	document.getElementById(elementId).style.display = "block";
}

function hideItem(elementId, evt) {
	console.log("Hiding item " + elementId);
	let element = document.getElementById(elementId);
	if (element.style.display !== "none" && evt.target.parentNode.id !== "menu") {
		document.removeEventListener("click", function (evt) {
			hideItem(elementId, evt)
		});
		element.style.display = "none";
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

	let contact = menuItemFactory("#", "Contact", "contact.link", "contactpanel")

	let privacy = menuItemFactory("#", "Privacy", "privacy.link", "privacypanel")

	menu.appendChild(contact);
	menu.appendChild(privacy);

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

function menuItemFactory(url, title, langLink, extraElementId) {
	let item = document.createElement("li");
	let link = document.createElement("a");
	link.classList.add("mat-menu-item");
	link.href = url;
	link.innerHTML = title;
	link.setAttribute("data-i18n", langLink);

	if (url === "#") {
		link.setAttribute("role", "button");
		link.addEventListener("click", function () {
			showItem(extraElementId);
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

export {
	initializeMenu, initializeShareMenu
}