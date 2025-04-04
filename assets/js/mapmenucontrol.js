import {Control} from "ol/control";
import {initRipple} from "./buttonripple.js";
import {dragIcon} from "./icons.js";

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
		const menuOverlay = document.getElementById("tx-menu-dismiss");
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
		menuModal.classList.add("mat-bottom-sheet");
		menuModal.style.display = "none";
		menuModal.isActive = false;
		
		//header
		const modalHeader = document.createElement("h3");
		modalHeader.innerHTML = "Menu"; //TODO translate => use i18n
		
		// drag handle closing the bottom sheet
		const dragHandle = document.createElement("div")
		dragHandle.classList.add("mat-bottom-sheet-drag-handle");
		dragHandle.id = "drag-handle";
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