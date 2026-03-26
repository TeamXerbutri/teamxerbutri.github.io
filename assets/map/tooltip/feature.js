import {Select} from "ol/interaction";
import {click, pointerMove} from "ol/events/condition";
import {imageBasePath} from "../../config.js";

export class MapFeatureTooltip {
	constructor(map, styles) {

		const pinSvg = `<svg class="icon_pin" xmlns="http://www.w3.org/2000/svg" width="44.419" height="55.167">
	<g stroke-linecap="round" stroke-width="2">
		<path d="M17.4 36.357c-.45 1.27-2.24 6.34-2.69 7.6M16.21 26.522c.63-1.05 2.82-3.83 3.79-6.3.96-2.48 1.66-7.12 2-8.54M27.293 32.366c.42-1.67 1.42-7.32 2.5-10.04 1.08-2.73 3.3-5.26 3.96-6.31m-6.46 16.35c.42-1.67 1.42-7.32 2.5-10.04 1.08-2.73 3.3-5.26 3.96-6.31"/>
	</g>
	<path d="M34.354 15.328a1.386 1.386 0 0 1-.246.48c-.106.146-.253.29-.423.407a3.15 3.15 0 0 1-.6.333c-.224.09-.478.171-.754.225a5.39 5.39 0 0 1-.875.137 8.447 8.447 0 0 1-.98.033c-.342-.007-.698-.04-1.06-.084a12.7 12.7 0 0 1-1.094-.179 14.028 14.028 0 0 1-1.098-.273 14.278 14.278 0 0 1-1.079-.372 13.218 13.218 0 0 1-1.94-.95c-.29-.18-.569-.367-.803-.561a5.519 5.519 0 0 1-.669-.595 4.07 4.07 0 0 1-.501-.597 3.238 3.238 0 0 1-.33-.609 2.019 2.019 0 0 1-.134-.571 1.386 1.386 0 0 1 .055-.537c.051-.172.13-.336.246-.48.119-.152.253-.29.426-.416.17-.116.381-.23.606-.32.215-.093.479-.172.748-.238.267-.056.573-.101.882-.124.303-.036.638-.04.98-.033.342.007.697.04 1.053.072.362.044.728.111 1.091.187.364.077.743.168 1.108.276.364.108.723.235 1.069.37.346.133.7.28 1.018.436.325.17.64.336.931.516.282.178.56.364.804.562.247.188.469.39.662.582.2.205.368.411.508.61.14.197.244.406.324.596.076.2.124.391.13.58.019.184-.039.448-.055.537-.006.092.045-.08 0 0M19.97 37.563c-.45 1.27-2.24 6.34-2.69 7.6m2.69-7.6c-.45 1.27-2.24 6.34-2.69 7.6M18.809 22.23c-.76.15-3.36.46-4.58.92-1.22.45-2.04.94-2.74 1.83-.71.88-1.64 2.09-1.47 3.48.17 1.38 1.07 3.44 2.47 4.85 1.41 1.4 3.79 2.87 5.95 3.57 2.17.7 4.95.88 7.05.64 2.11-.24 4.43-1.04 5.59-2.11 1.16-1.06 1.57-2.77 1.37-4.3-.2-1.53-2.13-4.04-2.56-4.85m-11.08-4.03c-.76.15-3.36.46-4.58.92-1.22.45-2.04.94-2.74 1.83-.71.88-1.64 2.09-1.47 3.48.17 1.38 1.07 3.44 2.47 4.85 1.41 1.4 3.79 2.87 5.95 3.57 2.17.7 4.95.88 7.05.64 2.11-.24 4.43-1.04 5.59-2.11 1.16-1.06 1.57-2.77 1.37-4.3-.2-1.53-2.13-4.04-2.56-4.85" stroke-width="2" stroke-linecap="round"/>
</svg>`

		let featureTooltip = document.createElement("div");
		featureTooltip.pinned = false;
		featureTooltip.classList.add("feature-tooltip");
		let smallScreen = false;
		const viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
		const viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
		
		if (viewportWidth < 756 || viewportHeight < 500) {
			smallScreen = true;
		}

		let cardElement = document.createElement("a");
		cardElement.id = "js-map-tooltip";
		cardElement.href = "";
		cardElement.addEventListener("click", event => {
			event.preventDefault();
			pageEvents.navigateTo(cardElement.href);
		});

		let featureTooltipHtml = `<img class="feature-tooltip__img"> <h2 class="feature-tooltip__h2"></h2>`;
			
		if (!smallScreen)
			featureTooltipHtml += `<span class="feature-tooltip_pinned" hidden>${pinSvg}</span>`;
		
		cardElement.innerHTML = featureTooltipHtml;
			
		featureTooltip.appendChild(cardElement);

		document.getElementById("js-map").appendChild(featureTooltip);

		const selectPointerMove = new Select({
			condition: pointerMove,
			style: function (feature) {
				return styles[feature.get("type")];
			},
		});
		map.addInteraction(selectPointerMove);

		const hoveredFeatures = selectPointerMove.getFeatures();

		hoveredFeatures.on("add", function (event) {
			showFeature(event)
		});
		hoveredFeatures.on("remove", function () {
			if (!featureTooltip.pinned)
				featureTooltip.style.visibility = "hidden";
		});

		const selectClick = new Select({
			condition: click,
			style: function (feature) {
				return styles[feature.get("type")];
			}
		});
		map.addInteraction(selectClick);
		const clickedFeatures = selectClick.getFeatures();

		clickedFeatures.on("add", function (event) {
			featureTooltip.pinned = true;
			showFeature(event)
		});
		clickedFeatures.on("remove", function () {
			featureTooltip.pinned = false;
			featureTooltip.style.visibility = "hidden";
		});

		function showFeature(event) {
			const feature = event.element;
			const name = feature.get("Name");
			const description = feature.get("Description");
			const route = feature.get("Route");
			const category = feature.get("Category");

			let coordinates;
			if (feature.getGeometry().getType() === "Point")
				coordinates = feature.getGeometry().getCoordinates();

			if (feature.getGeometry().getType() === "LineString")
				coordinates = feature.getGeometry().getCoordinateAt(0.5);

			const pixel = map.getPixelFromCoordinate(coordinates);

			const viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
			const viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

			if (viewportWidth < 756 || viewportHeight < 500) {
				thisFeatureTooltipComponent(category, route, name, description, true);
			}
			else {
				thisFeatureTooltipComponent(category, route, name, description, false);
				featureTooltip.querySelector("span").hidden = !featureTooltip.pinned;
				
				// width large = 310px
				if (viewportWidth - pixel[0] < 310)
					featureTooltip.style.left = pixel[0] - 310 + "px";
				else
					featureTooltip.style.left = pixel[0] + "px";

				// height large = 233px
				if (viewportHeight - pixel[1] < 233)
					featureTooltip.style.top = pixel[1] - 233 + "px";
				else
					featureTooltip.style.top = pixel[1] + "px";
			}
			featureTooltip.style.visibility = "visible";
		}
		
		// TODO instead of building it, manipulate the values!
		const thisFeatureTooltipComponent = (category, route, name, description, smallScreen) => {
			const s = smallScreen ? "s" : "";

			let cardElement = document.getElementById("js-map-tooltip");
			const link = `${category}-${route}`;
			cardElement.href = link;
			cardElement.title = name;

			let img = cardElement.getElementsByTagName("img")[0];
			img.src = `${imageBasePath()}/${category}/${route}/${route}${s}.jpg`;
			img.alt = description;
			let nameElem = cardElement.getElementsByTagName("h2")[0];
			nameElem.innerHTML = name;
		}
	}
}