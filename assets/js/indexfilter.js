function initFilter(translator) {

	uiState.hasFilter = {bridge: false, building: false, rail: false, tunnel: false};

	let viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	let displayString = "inline-block";
	if (viewportWidth <= 755) {
		displayString = "block";
	}

	const railButton = document.createElement("button");
	railButton.innerHTML = "V";
	railButton.title = translator.translate("filter.rail.hide");
	railButton.setAttribute("data-i18n", "filter.rail.hide");
	railButton.id = "railfilter";
	railButton.addEventListener("click", railFilter);

	const bridgeButton = document.createElement("button");
	bridgeButton.title = translator.translate("filter.bridge.hide");
	bridgeButton.innerHTML = "V";
	bridgeButton.setAttribute("data-i18n", "filter.bridge.hide");
	bridgeButton.id = "bridgefilter";
	bridgeButton.addEventListener("click", bridgeFilter);

	const tunnelButton = document.createElement("button");
	tunnelButton.innerHTML = "V";
	tunnelButton.title = translator.translate("filter.tunnel.hide");
	tunnelButton.setAttribute("data-i18n", "filter.tunnel.hide");
	tunnelButton.id = "tunnelfilter";
	tunnelButton.addEventListener("click", tunnelFilter);

	const buildingButton = document.createElement("button");
	buildingButton.innerHTML = "V";
	buildingButton.title = translator.translate("filter.building.hide");
	buildingButton.setAttribute("data-i18n", "filter.building.hide");
	buildingButton.id = "buildingfilter";
	buildingButton.addEventListener("click", buildingFilter);

	const filter = document.createElement("div");
	filter.className = "filter";
	filter.appendChild(bridgeButton);
	filter.appendChild(tunnelButton);
	filter.appendChild(railButton);
	filter.appendChild(buildingButton);
	document.getElementById("header").appendChild(filter);

	function bridgeFilter() {
		if (uiState.hasFilter.bridge) {
			setDisplayFilter("brug", displayString);
			setFilterStyle(bridgeButton, "bridge", uiState.hasFilter.bridge);
			uiState.hasFilter.bridge = false;
		} else {
			setDisplayFilter("brug", "none");
			setFilterStyle(bridgeButton, "bridge", uiState.hasFilter.bridge);
			uiState.hasFilter.bridge = true;
		}
	}

	function tunnelFilter() {
		if (uiState.hasFilter.tunnel) {
			setDisplayFilter("tunnel", displayString);
			setFilterStyle(tunnelButton, "tunnel", uiState.hasFilter.tunnel);
			uiState.hasFilter.tunnel = false;
		} else {
			setDisplayFilter("tunnel", "none");
			setFilterStyle(tunnelButton, "tunnel", uiState.hasFilter.tunnel);
			uiState.hasFilter.tunnel = true;
		}
	}

	function buildingFilter() {
		if (uiState.hasFilter.building) {
			setDisplayFilter("gebouw", displayString);
			setFilterStyle(buildingButton, "building", uiState.hasFilter.building);
			uiState.hasFilter.building = false;
		} else {
			setDisplayFilter("gebouw", "none");
			setFilterStyle(buildingButton, "building", uiState.hasFilter.building);
			uiState.hasFilter.building = true;
		}
	}

	function railFilter() {
		if (uiState.hasFilter.rail) {
			setDisplayFilter("spoor", displayString);
			setFilterStyle(railButton, "rail", uiState.hasFilter.rail);
			uiState.hasFilter.rail = false
		} else {
			setDisplayFilter("spoor", "none");
			setFilterStyle(railButton, "rail", uiState.hasFilter.rail);
			uiState.hasFilter.rail = true;
		}
	}

	function setFilterStyle(buttonName, categoryName, activeFilter) {
		let check = "&nbsp;";
		let filterStyle = "rgba(30,30,30,0.8)";
		let key = "show";
		if (activeFilter) {
			check = "V";
			key = "hide";
			filterStyle = "rgba(30,30,30,0.2)";
		}
		buttonName.title = translator.translate(`filter.${categoryName}.${key}`);
		buttonName.innerHTML = check;
		buttonName.style.backgroundColor = filterStyle;
	}
}

function setDisplayFilter(className, display) {
	let categories = document.getElementsByClassName(className);
	let i;

	for (i = 0; i < categories.length; i++) {
		categories[i].style.display = display;
	}
}


export {initFilter};