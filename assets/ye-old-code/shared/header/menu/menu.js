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


function handleMenuDismiss() {
	let menu = document.querySelector(".sub-menu__dots");
	if (menu.classList.contains("show")) {
		menu.classList.remove("show");
		document.removeEventListener("click", handleMenuDismiss, true);
	}
}

function handleShareDismiss() {
	let shareMenu = document.querySelector(".sub-menu__share");
	if (shareMenu.classList.contains("show")) {
		shareMenu.classList.remove("show");
		document.removeEventListener("click", handleShareDismiss, true);
	}
}

function initializeMenu(basePath) {
	let menu = document.querySelector(".sub-menu__dots");
	menu.appendChild(menuItemFactory(basePath + "map", "Maps", "maps.link"));
	menu.appendChild(menuItemFactory(basePath + "avontuur/txatx", "Over TX", "abouttx.link"));
	menu.appendChild(menuItemFactory(basePath + "avontuur/txaue", "Over UE", "aboutue.link"));
	menu.appendChild(menuItemFactory("#", "Contact", "contact.link"));
	menu.appendChild(menuItemFactory("#", "Privacy", "privacy.link"));

	if (!("ontouchstart" in document.documentElement)) {
		document.documentElement.classList.add("no-touch");
	} else {
		let menuButton = document.querySelector(".menu__dots");
		menuButton.addEventListener("click", function () {
			document.querySelector(".sub-menu__dots").classList.toggle("show");
			document.addEventListener("click", handleMenuDismiss, true);
		});
	}
}

function menuItemFactory(url, title, langLink) {
	let item = document.createElement("li");
	let link = document.createElement("a");
	link.classList.add("li_mat-menu");
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
	link.classList.add("li_mat-menu");
	link.target = "_blank";
	link.href = uri;
	link.innerHTML = title;
	link.title = title;

	item.appendChild(link);
	return item;
}

function initializeShareMenu() {

	let shareMenu = document.querySelector(".sub-menu__share");
	const uri = encodeURIComponent(location.href);

	let facebook = shareMenuItemFactory("https://www.facebook.com/sharer/sharer.php?u=" + uri, "Facebook");
	let whatsapp = shareMenuItemFactory("whatsapp://send?text=" + uri, "Whatsapp");

	shareMenu.appendChild(facebook);
	shareMenu.appendChild(whatsapp);

	if (("ontouchstart" in document.documentElement)) {
		let shareButton = document.querySelector(".menu__share");
		shareButton.addEventListener("click", function () {
			document.querySelector(".sub-menu__share").classList.toggle("show");
			document.addEventListener("click", handleShareDismiss, true);
		});
	}
}

export {
	initializeMenu, initializeShareMenu
}