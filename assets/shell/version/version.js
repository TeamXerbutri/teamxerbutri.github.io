import {Version} from "../../config.js";
import {apiBasePath} from "../../navigator.js";

const fetchVersion = async () => {
	const response = await fetch(`${apiBasePath()}/version.json`);
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