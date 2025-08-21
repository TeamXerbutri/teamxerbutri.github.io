import {Control} from "ol/control";
import {initRipple} from "./buttonripple.js";
import {dragIcon} from "../../shared/icons/icons.js";

export class MapMenuControl extends Control {
	constructor(opt_options) {
		const options = opt_options || {};

		// menu control element
		const menuIcon = '<svg aria-hidden="true" class="menu-control__icon" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"> <path d="M4,2 A4,4,0,0,0,4,10 l40,0 a4,4,0,0,0,0,-8 l-40,0 Z M4,20 A4,4,0,0,0,4,28 l40,0 a4,4,0,0,0,0,-8 l-40,0 Z M4,38 A4,4,0,0,0,4,46 l40,0 a4,4,0,0,0,0,-8 l-40,0"></path></svg>';
		
		const element = document.createElement("div");
		element.className = "menu-control ol-unselectable ol-control";

		// button for menu control
		const button = document.createElement("button");
		button.classList.add("ol-unselectable");
		button.innerHTML = menuIcon;
		button.title = "Menu openen"; //TODO translate => use i18n
		
		button.onclick = function() {
			toggleModal();
		};
		
		element.appendChild(button);

		// dismiss overlay
		const menuOverlay = document.querySelector(".menu-modal__dismiss");

		menuOverlay.addEventListener("click", function(event) {
			if (event.target === menuOverlay) {
				toggleModal()
			}
		});
		
		// modal for menu

		const menuModal = document.createElement("div");
		menuModal.classList.add("bottom-sheet");
		menuModal.classList.add("hide");
		menuModal.isActive = false;
		
		// menu title
		const modalHeader = document.createElement("h3");
		modalHeader.innerHTML = "Menu"; //TODO translate => use i18n
		
		// drag handle closing the bottom sheet
		const dragHandle = document.createElement("div")
		dragHandle.classList.add("bottom-sheet__drag-handle");
		dragHandle.title = "drag";//;
		dragHandle.innerHTML = `${dragIcon}`;

		dragHandle.onmousedown = function() {
			toggleModal();
		};
		
		const menuContainer = document.createElement("div");
		menuContainer.classList.add("menu-modal__item");
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