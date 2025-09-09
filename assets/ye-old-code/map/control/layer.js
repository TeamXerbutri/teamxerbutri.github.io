import {Control} from "ol/control";
import {dragIcon} from "../../shared/icons/icons.js";

export class MapLayerControl extends Control {
	constructor(bridgeVector, buildingVector, railVector, tunnelVector, opt_options) {
		const options = opt_options || {};

		// layer control element
		const layerIcon = '<svg aria-hidden="true" class="layer-control__icon" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path d="M0,10 l24,-10 l24,10 l0,2 l-24,10 l-24,-10 Z M0,23 l6,-2.5 l18,7.5 l18,-7.5 l6,2.5 l0,2 l-24,10 l-24,-10 Z M0,36 l6,-2.5 l18,7.5 l18,-7.5 l6,2.5 l0,2 l-24,10 l-24,-10"></path></svg>';
		
		const element = document.createElement("div");
		element.className = "layer-control ol-unselectable ol-control";

		// button for layer control
		const button = document.createElement("button");
		button.classList.add("ol-unselectable");
		button.title = "Kaartlagen wijzigen"; //TODO translate => use i18n
		button.innerHTML = layerIcon;
		button.onclick = function() {
			toggleModal();
		};
				
		element.appendChild(button);
		
		// dismiss for layer modal
		const overlay = document.querySelector(".layer-modal__dismiss");
		
		overlay.addEventListener("click", function(event) {
			if (event.target === overlay) {
				toggleModal()
			}
		});
		
		// modal for filtering layers
		const layerModal = document.createElement("div");
		layerModal.classList.add("layer-modal");
		layerModal.classList.add("bottom-sheet");
		layerModal.classList.add("hide");
		layerModal.isActive = false;
		
		const layerModalHeader = document.createElement("h3");
		layerModalHeader.innerHTML = "Kaartlagen aanpassen"; //TODO translate => use i18n

		// draghandle closing the bottom sheet
		const dragHandle = document.createElement("div")
		dragHandle.classList.add("bottom-sheet__drag-handle");
		dragHandle.title = "drag";//;
		dragHandle.innerHTML = `${dragIcon}`;
		
		dragHandle.onmousedown = function() {
			toggleModal();
		};
		
		// create buttons for layer filters
		const bridgeButton = document.createElement("button");
		bridgeButton.classList.add("layer-modal__button_bridge");
		bridgeButton.classList.add("layer-modal__button");
		bridgeButton.isActive = false;
		toggleButton(bridgeButton, "bruggen"); //TODO translate => use i18n
		
		bridgeButton.onclick = function() {
			toggleLayer(bridgeVector);
			toggleButton(bridgeButton, "bruggen"); //TODO translate => use i18n
		};
		
		const buildingButton = document.createElement("button");
		buildingButton.classList.add("layer-modal__button_building");
		buildingButton.classList.add("layer-modal__button");
		buildingButton.isActive = false;
		toggleButton(buildingButton, "gebouwen"); //TODO translate => use i18n
		
		buildingButton.onclick = function() {
			toggleLayer(buildingVector);
			toggleButton(buildingButton, "gebouwen"); //TODO translate => use i18n
		}
		
		const railButton = document.createElement("button");
		railButton.classList.add("layer-modal__button_rail");
		railButton.classList.add("layer-modal__button");
		railButton.isActive = false;
		toggleButton(railButton, "spoorwegen"); //TODO translate => use i18n
		
		railButton.onclick = function() {
			toggleLayer(railVector);
			toggleButton(railButton, "spoorwegen"); //TODO translate => use i18n
		}
		
		const tunnelButton = document.createElement("button");
		tunnelButton.classList.add("layer-modal__button_tunnel");
		tunnelButton.classList.add("layer-modal__button");
		tunnelButton.isActive = false;
		toggleButton(tunnelButton, "tunnels"); //TODO translate => use i18n
		
		tunnelButton.onclick = function() {
			toggleLayer(tunnelVector);
			toggleButton(tunnelButton, "tunnels"); //TODO translate => use i18n
		}
		
		layerModal.appendChild(dragHandle);
		layerModal.appendChild(layerModalHeader);
		layerModal.appendChild(bridgeButton);
		layerModal.appendChild(buildingButton);
		layerModal.appendChild(railButton);
		layerModal.appendChild(tunnelButton);
		
		overlay.appendChild(layerModal);
		
		function toggleButton(button, categoryName) {
			if(button.isActive){
				button.title = "Toon "+ categoryName + " op kaart"; //TODO translate => use i18n
				button.innerHTML = "";
				button.isActive = false;
			}
			else {
				button.title = "Verberg "+ categoryName + " op kaart"; //TODO translate => use i18n
				button.innerHTML = `<span class="layer-modal__button_active">✔</span>`;
				button.isActive = true;
			}
		}
		
		function toggleModal() {
			if(layerModal.isActive){
				overlay.classList.add("hide");
				overlay.classList.remove("show");
				layerModal.classList.add("hide");
				layerModal.classList.remove("show");
				layerModal.isActive = false;
			}
			else {
				overlay.classList.remove("hide");
				overlay.classList.add("show");
				layerModal.classList.remove("hide");
				layerModal.classList.add("show");
				layerModal.isActive = true;
			}
		}

		function toggleLayer(layer) {
			if (layer.getVisible()) {
				layer.setVisible(false);
			} else {
				layer.setVisible(true);
			}
		}
		
		super({
			element: element,
			target: options.target,
		});
	}
}

