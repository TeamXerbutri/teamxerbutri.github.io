const version = "6.1.1";

function fetchServerVersion() {
	const path = "/data/version.json";
	return fetch(path).then((response) => response.json());
}

function checkVersion(translator) {
	fetchServerVersion().then((serverVersion) => {

		if (serverVersion.version === version)
			return;

		if (serverVersion.version !== version) {
			let messageBar = document.getElementById("message-bar");
			messageBar.innerHTML = `<p>${translator.translate("version.update")}</p>`;
			messageBar.setAttribute("data-i18n", "version.update");
			messageBar.style.display = "block";
		}
	});
}

export {checkVersion};