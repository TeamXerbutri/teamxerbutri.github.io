const version = "6.1.2";

function fetchServerVersion() {
	const path = "/data/version.json";
	return fetch(path).then((response) => response.json());
}

function checkVersion(translator) {
	fetchServerVersion().then((serverVersion) => {

		if (serverVersion.version === version)
			return;

		if (serverVersion.version !== version) {
			let messageBar = document.querySelector(".index__message-bar");
			messageBar.innerHTML = `<p class="message-bar__content">${translator.translate("version.update")}</p>`;
			messageBar.setAttribute("data-i18n", "version.update");
			messageBar.classList.remove("hide");
			messageBar.classList.add("show");
		}
	});
}

export {checkVersion};