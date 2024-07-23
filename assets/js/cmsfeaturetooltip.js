import {Select} from "ol/interaction";
import {click, pointerMove} from "ol/events/condition";

export class CmsFeatureTooltip {
	constructor(map, styles) {

		let featureTooltip = document.createElement("div");
		featureTooltip.pinned = false;
		featureTooltip.id = "cms-feature-tooltip";
		featureTooltip.classList.add("cms-feature-tooltip");
		document.getElementById("cmsmap").appendChild(featureTooltip);

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
			const route = feature.get("Route");

			let coordinates;
			if (feature.getGeometry().getType() === "Point")
				coordinates = feature.getGeometry().getCoordinates();

			if (feature.getGeometry().getType() === "LineString")
				coordinates = feature.getGeometry().getCoordinateAt(0.5);

			const pixel = map.getPixelFromCoordinate(coordinates);

			const viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
			const viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
			
			featureTooltip.innerHTML = `<h2 class="cms-feature-tooltip_h2">${route} - ${name}</h2>`;
			if (viewportWidth > 756 || viewportHeight > 500) {
								
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
	}
}