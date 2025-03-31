function initFilter(translator) {
	
	const filterElement = document.getElementById("tx-filter");

	// create buttons for filters
	const bridgeButton = document.createElement("button");
	bridgeButton.id = "tx-filter-button_bridge";
	bridgeButton.classList.add("fab");
	bridgeButton.isActive = false;
	bridgeButton.setAttribute("data-i18n", "filter.bridge.hide");
	bridgeButton.title = translator.translate("filter.bridge.hide");
	toggleButton(bridgeButton, "bridge", "brug");

	bridgeButton.onclick = function () {
		toggleButton(bridgeButton, "bridge", "brug");
	}

	const buildingButton = document.createElement("button");
	buildingButton.id = "tx-filter-button_building";
	buildingButton.classList.add("fab");
	buildingButton.isActive = false;
	buildingButton.title = translator.translate("filter.building.hide");
	buildingButton.setAttribute("data-i18n", "filter.building.hide");
	toggleButton(buildingButton, "building", "gebouw");

	buildingButton.onclick = function () {
		toggleButton(buildingButton, "building", "gebouw");
	}

	const railButton = document.createElement("button");
	railButton.id = "tx-filter-button_rail";
	railButton.classList.add("fab");
	railButton.isActive = false;
	railButton.title = translator.translate("filter.rail.hide");
	railButton.setAttribute("data-i18n", "filter.rail.hide");
	toggleButton(railButton, "rail", "spoor");

	railButton.onclick = function () {
		toggleButton(railButton, "rail", "spoor");
	}

	const tunnelButton = document.createElement("button");
	tunnelButton.id = "tx-filter-button_tunnel";
	tunnelButton.classList.add("fab");
	tunnelButton.isActive = false;
	tunnelButton.title = translator.translate("filter.tunnel.hide");
	tunnelButton.setAttribute("data-i18n", "filter.tunnel.hide");
	toggleButton(tunnelButton, "tunnel", "tunnel");

	tunnelButton.onclick = function () {
		toggleButton(tunnelButton, "tunnel", "tunnel");
	}

	function toggleButton(button, translationKey, categoryName) {
		if (button.isActive) {
			button.title = translator.translate("filter." + translationKey + ".show");
			button.classList.add("tx-filter_off");
			button.classList.remove("tx-filter_active");
			button.isActive = false;
			setDisplayFilter(categoryName, "none");
		} else {
			button.title = translator.translate("filter." + translationKey + ".hide");
			button.isActive = true;
			button.classList.remove("tx-filter_off");
			button.classList.add("tx-filter_active");
			setDisplayFilter(categoryName);

		}
	}

	filterElement.appendChild(bridgeButton);
	filterElement.appendChild(tunnelButton);
	filterElement.appendChild(railButton);
	filterElement.appendChild(buildingButton);
}

function setDisplayFilter(className) {
	let categories = document.getElementsByClassName(className);
	let i;

	for (i = 0; i < categories.length; i++) {
		categories[i].style.display = "inline-block";
	}
}


export {initFilter};