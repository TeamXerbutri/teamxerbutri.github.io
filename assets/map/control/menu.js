import {Control} from "ol/control";
import {initRipple} from "./buttonripple.js";
import {dragIcon} from "../../shared/icons/icons.js";

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

		// dismiss overlay
		const menuOverlay = document.querySelector(".menu-control__dismiss");

		menuOverlay.addEventListener("click", function(event) {
			if (event.target === menuOverlay) {
				toggleModal()
			}
		});
		
		// modal for menu

		const menuModal = document.createElement("div");
		menuModal.classList.add("menu-control__modal");
		menuModal.classList.add("mat-bottom-sheet");
		menuModal.classList.add("hide");
		menuModal.isActive = false;
		
		// menu title
		const modalHeader = document.createElement("h3");
		modalHeader.innerHTML = "Menu"; //TODO translate => use i18n
		
		// drag handle closing the bottom sheet
		const dragHandle = document.createElement("div")
		dragHandle.classList.add("mat-bottom-sheet__drag-handle");
		dragHandle.title = "drag";//;
		dragHandle.innerHTML = `${dragIcon}`;

		dragHandle.onmousedown = function() {
			toggleModal();
		};
		
		const menuContainer = document.createElement("div");
		menuContainer.id = "tx-menu-container";
		menuContainer.innerHTML = `<a class="mat-button light" href="../" title="Ga naar het index-overzicht van Team Xerbutri, met alle bezochte locaties">Naar het index-overzicht van Team Xerbutri</a>`; //TODO translate => use i18n
		
		menuModal.appendChild(dragHandle);
		menuModal.appendChild(modalHeader);
		menuModal.appendChild(menuContainer);
		menuOverlay.appendChild(menuModal);
		
		initRipple();

		function toggleModal() {
			if (menuModal.isActive) {
				menuOverlay.classList.add("hide");
				menuOverlay.classList.remove("show");
				menuModal.classList.add("hide");
				menuModal.classList.remove("show");
				menuModal.isActive = false;
			} else {
				menuOverlay.classList.remove("hide");
				menuOverlay.classList.add("show");
				menuModal.classList.remove("hide");
				menuModal.classList.add("show");
				menuModal.isActive = true;
			}
		}

		super({
			element: element,
			target: options.target,
		});
	}
}