import {Version, versionBasePath} from "../../config.js";
import {get} from "../../helpers.js";

const fetchVersion = async () => {
	try {
		const response = await get(`${versionBasePath()}/version.json`);
		return await response.json();
	} catch (error) {
		console.error(`Error fetching version:`, error);
		return { version: Version };
	}
	
}

export const checkVersion = async () => {
	const serverVersion = await fetchVersion();
	document.querySelector('meta[name="version"]').setAttribute("content", Version);
	
	if (serverVersion.version === Version)
		return;
	
	let messageBar = document.querySelector(".message-bar");
	messageBar.innerHTML = `<p class="message-bar__content" data-i18n="version.update" >Version update available</p>`;
	messageBar.classList.remove("hide");
	messageBar.classList.add("show");
}