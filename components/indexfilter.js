(function () {
	var readyStateCheckInterval = setInterval(function () {
		if (document.readyState === "complete") {
			clearInterval(readyStateCheckInterval);
			initFilter(); //Als de pagina geladen is, roep init aan
			var displayString = "inline-block";
			if (viewportWidth <= 755) {
				displayString = "block";
			}

			function initFilter() {
				var spoorButton = document.createElement('button');
				spoorButton.innerHTML = 'V';
				spoorButton.title = 'verberg de spoorwegen';
				spoorButton.id = 'spoorfilter';
				spoorButton.addEventListener('click', spoorFilter);

				var bridgeButton = document.createElement('button');
				bridgeButton.title = 'verberg de bruggen';
				bridgeButton.innerHTML = 'V';
				bridgeButton.id = 'bridgefilter';
				bridgeButton.addEventListener('click', bridgeFilter);

				var tunnelButton = document.createElement('button');
				tunnelButton.innerHTML = 'V';
				tunnelButton.title = 'verberg de tunnels';
				tunnelButton.id = 'tunnelfilter';
				tunnelButton.addEventListener('click', tunnelFilter);

				var buildingButton = document.createElement('button');
				buildingButton.innerHTML = 'V';
				buildingButton.title = 'verberg de verlaten gebouwen';
				buildingButton.id = 'buildingfilter';
				buildingButton.addEventListener('click', buildingFilter);

				var filter = document.createElement('div');
				filter.className = 'filteren';
				filter.appendChild(bridgeButton);
				filter.appendChild(tunnelButton);
				filter.appendChild(spoorButton);
				filter.appendChild(buildingButton);
				document.body.appendChild(filter);


				function bridgeFilter() {
					if (filterActive.bridge) {
						setDisplayFilter("bridge", displayString);
						setFilterStyle(bridgeButton, 'bruggen', filterActive.bridge);
						filterActive.bridge = false;
					} else {
						setDisplayFilter("bridge", 'none');
						setFilterStyle(bridgeButton, 'bruggen', filterActive.bridge);
						filterActive.bridge = true;
						loadIcons();
					}
				}

				function tunnelFilter() {
					if (filterActive.tunnel) {
						setDisplayFilter("tunnelt", displayString);
						setFilterStyle(tunnelButton, 'tunnels', filterActive.tunnel);
						filterActive.tunnel = false;
					} else {
						setDisplayFilter("tunnel", 'none');
						setFilterStyle(tunnelButton, 'tunnels', filterActive.tunnel);
						filterActive.tunnel = true;
						loadIcons();
					}
				}

				function buildingFilter() {
					if (filterActive.building) {
						setDisplayFilter("building", displayString);
						setFilterStyle(buildingButton, 'verlaten gebouwen', filterActive.building);
						filterActive.building = false;
					} else {
						setDisplayFilter("building", 'none');
						setFilterStyle(buildingButton, 'verlaten gebouwen', filterActive.building);
						filterActive.building = true;
						loadIcons();
					}
				}

				function railFilter() {
					if (filterActive.rail) {
						setDisplayFilter("rail", displayString);
						setFilterStyle(railButton, 'spoorwegen', filterActive.rail);
						filterActive.rail = false
					} else {
						setDisplayFilter("rail", 'none');
						setFilterStyle(railButton, 'spoorwegen', filterActive.rail);
						filterActive.rail = true;
						loadIcons();
					}
				}

				function setFilterStyle(buttonName, categorieName, activeFilter) {
					let check = '&nbsp;';
					var title = 'toon de ' + categorieName;
					var filterStyle = "rgba(30,30,30,0.8)";
					if (activeFilter) {
						check = 'V';
						title = 'verberg de ' + categorieName;
						filterStyle = "rgba(30,30,30,0.2)";
					}
					buttonName.title = title;
					buttonName.innerHTML = check;
					buttonName.style.backgroundColor = filterStyle;
				}

				function loadIcons() {
					//var lastid= parseInt(document.getElementById('oc').lastChild.getAttribute("data-num"));
					var maxid = parseInt(document.getElementById('maxid').value);
					if (lastid >= maxid) {
						return;
					}
					var totalHeight = window.innerHeight + window.scrollY;
					if (totalHeight >= 0.9 * document.body.offsetHeight) {
						var icons = 8;
						var nextlastid = lastid + icons;
						if (maxid <= nextlastid) {
							icons = maxid - lastid;
						}
						loadingReady = false;
						loadMore(lastid + 1, icons, viewportWidth <= 755);
						let loadingInterval = setInterval(function () {
							if (loadingReady) {
								clearInterval(loadingInterval);
								loadIcons();
							}
						}, 10);
						lastid = lastid + icons + 1;
					} else {

					}
				}

			}
		}
	}, 10);
})();
