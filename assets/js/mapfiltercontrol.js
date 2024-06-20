import {Control} from "ol/control";

export class MapFilterControl extends Control {
	// TODO I can use an array as parameter, and foreach to create the buttons using a vector property
	constructor(bridgeVector, buildingVector, railVector, tunnelVector, opt_options) {
		const options = opt_options || {};

		// layer control element
		const element = document.createElement("div");
		element.id = "map-layers";
		element.className = "map-layers ol-unselectable ol-control";
		
		// button for layer control
		const button = document.createElement("button");
		button.id = "tx-layers";
		button.classList.add("ol-unselectable");
		button.classList.add("tx-layers");
		button.title = "Kaartlagen wijzigen"; //TODO translate => use i18n
		button.onclick = function() {
			toggleFilter();
		};
				
		element.appendChild(button);
		
		//overlay for layer modal
		const overlay = document.getElementById("map-overlay");
		overlay.style.display = "none";
		
		window.onclick = function(event) {
			if (event.target === overlay) {
				overlay.style.display = "none";
				layerFilter.isActive = false;
			}
		}
		
		// modal for filtering layers
		const layerFilter = document.createElement("div");
		layerFilter.id = "layer-filter";
		layerFilter.classList.add("layer-filter");
		layerFilter.isActive = false;
		layerFilter.innerHTML = `<h3>Kaartlagen aanpassen</h3>`; //TODO translate => use i18n
		
		// create buttons for layer filters
		const bridgeButton = document.createElement("button");
		bridgeButton.id = "bridge-layer-filter";
		bridgeButton.isActive = false;
		toggleButton(bridgeButton, "bruggen"); //TODO translate => use i18n
		
		bridgeButton.onclick = function() {
			toggleLayer(bridgeVector);
			toggleButton(bridgeButton, "bruggen"); //TODO translate => use i18n
		};
		
		const buildingButton = document.createElement("button");
		buildingButton.id = "building-layer-filter";
		buildingButton.isActive = false;
		toggleButton(buildingButton, "gebouwen"); //TODO translate => use i18n
		
		buildingButton.onclick = function() {
			toggleLayer(buildingVector);
			toggleButton(buildingButton, "gebouwen"); //TODO translate => use i18n
		}
		
		const railButton = document.createElement("button");
		railButton.id = "rail-layer-filter";
		railButton.isActive = false;
		toggleButton(railButton, "spoorwegen"); //TODO translate => use i18n
		
		railButton.onclick = function() {
			toggleLayer(railVector);
			toggleButton(railButton, "spoorwegen"); //TODO translate => use i18n
		}
		
		const tunnelButton = document.createElement("button");
		tunnelButton.id = "tunnel-layer-filter";
		tunnelButton.isActive = false;
		toggleButton(tunnelButton, "tunnels"); //TODO translate => use i18n
		
		tunnelButton.onclick = function() {
			toggleLayer(tunnelVector);
			toggleButton(tunnelButton, "tunnels"); //TODO translate => use i18n
		}
				
		layerFilter.appendChild(bridgeButton);
		layerFilter.appendChild(buildingButton);
		layerFilter.appendChild(railButton);
		layerFilter.appendChild(tunnelButton);
		
		overlay.appendChild(layerFilter);
		
		function toggleFilter() {
			if(layerFilter.isActive){
				overlay.style.display = "none";
				layerFilter.isActive = false;
			}
			else {
				overlay.style.display = "block";
				layerFilter.isActive = true;
			}
		}
		
		function toggleButton(button, categoryName) {
			if(button.isActive){
				button.classList.remove("layer-active");
				button.title = "Toon "+ categoryName + " op kaart"; //TODO translate => use i18n
				button.innerHTML = "";
				button.isActive = false;
			}
			else {
				button.classList.add("layer-active");
				button.title = "Verberg "+ categoryName + " op kaart"; //TODO translate => use i18n
				button.innerHTML = `<span class="layer-active-icon">✔</span>`;
				button.isActive = true;
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

