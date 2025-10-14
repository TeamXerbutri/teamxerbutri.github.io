import {ApiBasePath, Version} from "../../config.js";
import {fetchTranslations, translate} from "../../translator.js";

const fetchVersion = async () => {
	const response = await fetch(`${ApiBasePath}/version.json`);
	return await response.json();
}

export const checkVersion = async () => {
	const serverVersion = await fetchVersion();
	
	if (serverVersion.version === Version)
		return;
	
	let messageBar = document.querySelector(".message-bar");
	messageBar.innerHTML = `<p class="message-bar__content" data-i18n="version.update" >Version update available</p>`;
	messageBar.classList.remove("hide");
	messageBar.classList.add("show");
}