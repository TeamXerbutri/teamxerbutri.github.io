import {uiState} from "./uistate.js";

function initFilter() {

	uiState.hasFilter = {bridge: false, building: false, rail: false, tunnel: false};

	let viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	let displayString = "inline-block";
	if (viewportWidth <= 755) {
		displayString = "block";
	}

	const railButton = document.createElement('button');
	railButton.innerHTML = 'V';
	railButton.title = 'verberg de spoorwegen';
	railButton.id = 'railfilter';
	railButton.addEventListener('click', railFilter);

	const bridgeButton = document.createElement('button');
	bridgeButton.title = 'verberg de bruggen';
	bridgeButton.innerHTML = 'V';
	bridgeButton.id = 'bridgefilter';
	bridgeButton.addEventListener('click', bridgeFilter);

	const tunnelButton = document.createElement('button');
	tunnelButton.innerHTML = 'V';
	tunnelButton.title = 'verberg de tunnels';
	tunnelButton.id = 'tunnelfilter';
	tunnelButton.addEventListener('click', tunnelFilter);

	const buildingButton = document.createElement('button');
	buildingButton.innerHTML = 'V';
	buildingButton.title = 'verberg de verlaten gebouwen';
	buildingButton.id = 'buildingfilter';
	buildingButton.addEventListener('click', buildingFilter);

	const filter = document.createElement('div');
	filter.className = 'filter';
	filter.appendChild(bridgeButton);
	filter.appendChild(tunnelButton);
	filter.appendChild(railButton);
	filter.appendChild(buildingButton);
	document.body.appendChild(filter);

	function bridgeFilter() {
		if (uiState.hasFilter.bridge) {
			setDisplayFilter("bridge", displayString);
			setFilterStyle(bridgeButton, 'bruggen', uiState.hasFilter.bridge);
			uiState.hasFilter.bridge = false;
		} else {
			setDisplayFilter("bridge", 'none');
			setFilterStyle(bridgeButton, 'bruggen', uiState.hasFilter.bridge);
			uiState.hasFilter.bridge = true;
		}
	}

	function tunnelFilter() {
		if (uiState.hasFilter.tunnel) {
			setDisplayFilter("tunnel", displayString);
			setFilterStyle(tunnelButton, 'tunnels', uiState.hasFilter.tunnel);
			uiState.hasFilter.tunnel = false;
		} else {
			setDisplayFilter("tunnel", 'none');
			setFilterStyle(tunnelButton, 'tunnels', uiState.hasFilter.tunnel);
			uiState.hasFilter.tunnel = true;
		}
	}

	function buildingFilter() {
		if (uiState.hasFilter.building) {
			setDisplayFilter("building", displayString);
			setFilterStyle(buildingButton, 'verlaten gebouwen', uiState.hasFilter.building);
			uiState.hasFilter.building = false;
		} else {
			setDisplayFilter("building", 'none');
			setFilterStyle(buildingButton, 'verlaten gebouwen', uiState.hasFilter.building);
			uiState.hasFilter.building = true;
		}
	}

	function railFilter() {
		if (uiState.hasFilter.rail) {
			setDisplayFilter("rail", displayString);
			setFilterStyle(railButton, 'spoorwegen', uiState.hasFilter.rail);
			uiState.hasFilter.rail = false
		} else {
			setDisplayFilter("rail", 'none');
			setFilterStyle(railButton, 'spoorwegen', uiState.hasFilter.rail);
			uiState.hasFilter.rail = true;
		}
	}

	function setFilterStyle(buttonName, categorieName, activeFilter) {
		let check = '&nbsp;';
		let title = 'toon de ' + categorieName;
		let filterStyle = "rgba(30,30,30,0.8)";
		if (activeFilter) {
			check = 'V';
			title = 'verberg de ' + categorieName;
			filterStyle = "rgba(30,30,30,0.2)";
		}
		buttonName.title = title;
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

function filterObjects() {
	if (uiState.hasFilter.bridge) {
		setDisplayFilter('bridge', 'none');
	}
	if (uiState.hasFilter.building) {
		setDisplayFilter('building', 'none');
	}
	if (uiState.hasFilter.rail) {
		setDisplayFilter('rail', 'none');
	}
	if (uiState.hasFilter.tunnel) {
		setDisplayFilter('tunnel', 'none');
	}
}

export {initFilter, filterObjects};