function initFilter(translator) {
	
	const filterElement = document.querySelector(".card-filter");

	// create buttons for filters
	const bridgeButton = document.createElement("button");
	bridgeButton.classList.add("card-filter__button_bridge");
	bridgeButton.classList.add("fab");
	bridgeButton.isActive = false;
	bridgeButton.setAttribute("data-i18n", "filter.bridge.hide");
	bridgeButton.title = translator.translate("filter.bridge.hide");
	toggleButton(bridgeButton, "bridge", "brug");

	bridgeButton.onclick = function () {
		toggleButton(bridgeButton, "bridge", "brug");
	}

	const buildingButton = document.createElement("button");
	buildingButton.classList.add("card-filter__button_building");
	buildingButton.classList.add("fab");
	buildingButton.isActive = false;
	buildingButton.title = translator.translate("filter.building.hide");
	buildingButton.setAttribute("data-i18n", "filter.building.hide");
	toggleButton(buildingButton, "building", "gebouw");

	buildingButton.onclick = function () {
		toggleButton(buildingButton, "building", "gebouw");
	}

	const railButton = document.createElement("button");
	railButton.classList.add("card-filter__button_rail");
	railButton.classList.add("fab");
	railButton.isActive = false;
	railButton.title = translator.translate("filter.rail.hide");
	railButton.setAttribute("data-i18n", "filter.rail.hide");
	toggleButton(railButton, "rail", "spoor");

	railButton.onclick = function () {
		toggleButton(railButton, "rail", "spoor");
	}

	const tunnelButton = document.createElement("button");
	tunnelButton.classList.add("card-filter__button_tunnel");
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
			button.classList.add("card-filter__button_off");
			button.classList.remove("card-filter__button_active");
			button.isActive = false;
			hideCategory(categoryName);
		} else {
			button.title = translator.translate("filter." + translationKey + ".hide");
			button.isActive = true;
			button.classList.remove("card-filter__button_off");
			button.classList.add("card-filter__button_active");
			showCategory(categoryName);
		}
	}

	filterElement.appendChild(bridgeButton);
	filterElement.appendChild(tunnelButton);
	filterElement.appendChild(railButton);
	filterElement.appendChild(buildingButton);
}

function hideCategory(className) {
	let categories = document.getElementsByClassName(className);
	let i;

	for (i = 0; i < categories.length; i++) {
		categories[i].classList.add("hide");
		categories[i].classList.remove("show-ib");
	}
}
function showCategory(className) {
	let categories = document.getElementsByClassName(className);
	let i;

	for (i = 0; i < categories.length; i++) {
		categories[i].classList.add("show-ib");
		categories[i].classList.remove("hide");
	}
}

function filter(){
	const tunnel = document.querySelector(".card-filter__button_tunnel");
	const bridge = document.querySelector(".card-filter__button_bridge");
	const rail = document.querySelector(".card-filter__button_rail");
	const building = document.querySelector(".card-filter__button_building");
	
	if(tunnel.isActive) {
		showCategory("tunnel");
	}
	else {
		hideCategory("tunnel");
	}
	if(bridge.isActive) {
		showCategory("brug");
	}
	else {
		hideCategory("brug");
	}
	if(rail.isActive) {
		showCategory("spoor");
	}
	else {
		hideCategory("spoor");
	}
	if(building.isActive) {
		showCategory("gebouw");
	}
	else {
		hideCategory("gebouw");
	}
}

export {initFilter, filter};