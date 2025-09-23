import {currentPage} from "../../../navigator.js";
import {isTouchDevice} from "../../../fix/touch.js";

const shareMenuItem = (uri, title) => {
	return `<li><a class="li_mat-menu" target="_blank" href="${uri}" title="${title}">${title}</a></li>`;
}

const handleShareDismiss = () => {
	document.querySelector(".sub-menu__share").classList.remove("show");
	document.removeEventListener("click", handleShareDismiss, true);
}

export const initShareMenu = () => {

	const shareMenu = document.querySelector(".sub-menu__share");
	const route = currentPage().split("-")[1];
	const path = location.href.concat("avontuur/", route);
	console.log(path);
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