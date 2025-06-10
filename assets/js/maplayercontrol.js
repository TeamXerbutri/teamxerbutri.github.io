import {Control} from "ol/control";
import {dragIcon} from "../icons/icons.js";

export class MapLayerControl extends Control {
	// TODO I can use an array as parameter, and foreach to create the buttons using a vector property
	constructor(bridgeVector, buildingVector, railVector, tunnelVector, opt_options) {
		const options = opt_options || {};

		// layer control element
		const element = document.createElement("div");
		element.id = "tx-layer";
		element.className = "tx-layer ol-unselectable ol-control";

		// button for layer control
		const button = document.createElement("button");
		button.id = "tx-layer_button";
		button.classList.add("ol-unselectable");
		button.classList.add("tx-layer_button");
		button.title = "Kaartlagen wijzigen"; //TODO translate => use i18n
		button.onclick = function() {
			toggleModal();
		};
				
		element.appendChild(button);
		
		// dismiss for layer modal
		const overlay = document.getElementById("tx-layer-dismiss");
		overlay.style.display = "none";
		overlay.addEventListener("click", function(event) {
			if (event.target === overlay) {
				toggleModal()
			}
		});
		
		// modal for filtering layers
		const layerModal = document.createElement("div");
		layerModal.id = "tx-layer-modal";
		layerModal.classList.add("mat-bottom-sheet");
		layerModal.style.display = "none";
		layerModal.classList.add("tx-layer-modal");
		layerModal.isActive = false;
		
		const layerModalHeader = document.createElement("h3");
		layerModalHeader.innerHTML = "Kaartlagen aanpassen"; //TODO translate => use i18n

		// draghandle closing the bottom sheet
		const dragHandle = document.createElement("div")
		dragHandle.classList.add("mat-bottom-sheet-drag-handle");
		dragHandle.id = "drag-handle";
		dragHandle.title = "drag";//;
		dragHandle.innerHTML = `${dragIcon}`;
		
		dragHandle.onmousedown = function() {
			toggleModal();
		};
		
		// create buttons for layer filters
		const bridgeButton = document.createElement("button");
		bridgeButton.id = "tx-layer-modal-button_bridge";
		bridgeButton.isActive = false;
		toggleButton(bridgeButton, "bruggen"); //TODO translate => use i18n
		
		bridgeButton.onclick = function() {
			toggleLayer(bridgeVector);
			toggleButton(bridgeButton, "bruggen"); //TODO translate => use i18n
		};
		
		const buildingButton = document.createElement("button");
		buildingButton.id = "tx-layer-modal-button_building";
		buildingButton.isActive = false;
		toggleButton(buildingButton, "gebouwen"); //TODO translate => use i18n
		
		buildingButton.onclick = function() {
			toggleLayer(buildingVector);
			toggleButton(buildingButton, "gebouwen"); //TODO translate => use i18n
		}
		
		const railButton = document.createElement("button");
		railButton.id = "tx-layer-modal-button_rail";
		railButton.isActive = false;
		toggleButton(railButton, "spoorwegen"); //TODO translate => use i18n
		
		railButton.onclick = function() {
			toggleLayer(railVector);
			toggleButton(railButton, "spoorwegen"); //TODO translate => use i18n
		}
		
		const tunnelButton = document.createElement("button");
		tunnelButton.id = "tx-layer-modal-button_tunnel";
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
				button.innerHTML = `<span class="tx-layer-active-icon">✔</span>`;
				button.isActive = true;
			}
		}
		
		function toggleModal() {
			if(layerModal.isActive){
				overlay.style.display = "none";
				layerModal.style.display = "none";
				overlay.style.zIndex = "1";
				layerModal.isActive = false;
			}
			else {
				overlay.style.display = "block";
				layerModal.style.display = "block";
				overlay.style.zIndex = "200";
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

