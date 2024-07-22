import {Control} from "ol/control";

export class MapMenuControl extends Control {
	constructor(opt_options) {
		const options = opt_options || {};

		// menu control element
		const element = document.createElement("div");
		element.id = "tx-menu";
		element.className = "tx-menu ol-unselectable ol-control";

		// button for menu control
		const button = document.createElement("button");
		button.id = "tx-menu_button";
		button.classList.add("ol-unselectable");
		button.classList.add("tx-menu_button");
		button.title = "Menu openen"; //TODO translate => use i18n
		
		button.onclick = function() {
			toggleModal();
		};
		
		element.appendChild(button);

		//overlay
		const menuOverlay = document.getElementById("tx-menu-overlay");
		menuOverlay.style.display = "none";

		menuOverlay.addEventListener("click", function(event) {
			if (event.target === menuOverlay) {
				toggleModal()
			}
		});
		
		// modal for menu

		const menuModal = document.createElement("div");
		menuModal.id = "tx-menu-modal";
		menuModal.classList.add("tx-menu-modal");
		menuModal.classList.add("tx-modal");
		menuModal.style.display = "none";
		menuModal.isActive = false;
		menuModal.innerHTML = `<h3>Menu</h3>`; //TODO translate => use i18n
		
		
		const menuContainer = document.createElement("div");
		menuContainer.id = "tx-menu-container";
		menuContainer.innerHTML = `<a href="../" title="Bezoek de webpagina van Team Xerbutri, met alle bezochte locaties">Naar de index-pagina van Team Xerbutri</a>`; //TODO translate => use i18n
		
		menuModal.appendChild(menuContainer);
		menuOverlay.appendChild(menuModal);

		function toggleModal() {
			if (menuModal.isActive) {
				menuModal.style.display = "none";
				menuOverlay.style.display = "none";
				menuOverlay.style.zIndex = "1";
				menuModal.isActive = false;
			} else {
				menuOverlay.style.display = "block";
				menuModal.style.display = "block";
				menuOverlay.style.zIndex = "200";
				menuModal.isActive = true;
			}
		}

		super({
			element: element,
			target: options.target,
		});
	}
}