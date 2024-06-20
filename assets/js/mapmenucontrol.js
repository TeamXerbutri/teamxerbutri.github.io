import {Control} from "ol/control";

export class MapMenuControl extends Control {
	constructor(opt_options) {
		const options = opt_options || {};
		let hideMenu = true;
		const menuButton = document.createElement("span");
		menuButton.id = "menu-button";
		menuButton.innerText = "Menu";
		menuButton.addEventListener("click", toggleMenu);

		const menuContainer = document.createElement("div");
		menuContainer.id = "menu-container";
		menuContainer.innerHTML = `<a href="" title="Bezoek de nieuwste webpagina van Team Xerbutri, met alle recent bezochte locaties">Naar de index-pagina van TX5</a>`;

		function toggleMenu() {
			if (hideMenu) {
				menuContainer.style.display = "none";
				hideMenu = true;
			} else {
				menuContainer.style.display = "block";
				hideMenu = false;
			}
		}

		super({
			element: menuButton,
			target: options.target,
		});
	}
}