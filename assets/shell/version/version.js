import {ApiBasePath, Version} from "../../config.js";
import {fetchTranslations, translate} from "../../translator.js";

const fetchVersion = async () => {
	const response = await fetch(`${ApiBasePath}/version.json`);
	return await response.json();
}

export const checkVersion = async() =>{
	const serverVersion = await fetchVersion();
	
	if (serverVersion.version === Version)
		return;
	
	await fetchTranslations("version");

	let messageBar = document.querySelector(".message-bar");
	messageBar.innerHTML = `<p class="message-bar__content">${translate("version.update")}</p>`;
	messageBar.setAttribute("data-i18n", "version.update");
	messageBar.classList.remove("hide");
	messageBar.classList.add("show");
}