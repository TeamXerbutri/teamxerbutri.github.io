import "../css/map.css";
import KML from "ol/format/KML";
import Map from "ol/Map";
import View from "ol/View";
import {Tile as TileLayer, Vector as VectorLayer} from "ol/layer";
import OSM from "ol/source/OSM";
import {useGeographic} from "ol/proj";
import {defaults as defaultControls, ZoomSlider} from "ol/control";
import VectorSource from "ol/source/Vector";
import {Circle, Fill, Icon, Stroke, Style} from "ol/style";
import {TopBarControl} from "./topbarcontrol.js";
import {MapMenuControl} from "./mapmenucontrol.js";
import {MapLayerControl} from "./maplayercontrol.js";
import {MapFeatureTooltip} from "./mapfeaturetooltip.js";


let map;
export function initMap() {
		
	document.querySelector("#app").innerHTML = `<div id="map"><div id="tx-menu-overlay" class="tx-overlay"></div> <div id="tx-layer-overlay" class="tx-overlay"></div></div>`;
	
	// do not show header in map
	const headerElem = document.getElementById("header");
	if (!headerElem.classList.contains("map-header")) {
		headerElem.classList.add("map-header")
		headerElem.innerHTML = "";
	}
	
	// correct the overflow in mobile
	const htmlElement = document.querySelector("html");
	if(!htmlElement.classList.contains("map-html")){
		htmlElement.classList.add("map-html");
	}
	
	useGeographic();

	// the styles
	const styles = {
		"icon": new Style({
			image: new Circle({
				radius: 7,
				fill: new Fill({color: "rgba(255, 0, 0, 1)"}),
				stroke: new Stroke({
					color: "rgba(255, 255, 255, 1)",
					width: 2,
				}),
			}),
		}),
		"bridge": new Style({
			image: new Icon({
				opacity: 0.9,
				scale: 0.9,
				size: [52, 52],
				src: "assets/images/bridgemarker.png",
			}),
		}),
		"tunnel": new Style({
			image: new Icon({
				opacity: 0.9,
				scale: 0.9,
				size: [52, 52],
				src: "assets/images/tunnelmarker.png",
			}),
		}),
		"building": new Style({
			image: new Icon({
				opacity: 0.9,
				scale: 0.9,
				size: [52, 52],
				src: "assets/images/buildingmarker.png",
			}),
		}),
		"redLine": new Style({
			stroke: new Stroke({
				width: 7, color: "rgba(255, 0, 0, 1)",
			}),
			zIndex: 2,
		}),
		"whiteDash": new Style({
			stroke: new Stroke({
				width: 5, color: "rgba(255, 255, 255, 1)",
				lineDash: [16, 28]
			}),
			zIndex: 3
		}),
	}
	styles["rail"] = [styles["redLine"], styles["whiteDash"]];
	
	// raster (the base map or background)
	
	const raster = new TileLayer({
		source: new OSM({
			projection: "EPSG:4326"
		})
	});
	
	// map	
	map = new Map({
		target: "map",
		layers: [raster],
		view: new View({
			projection: "EPSG:3857",
			center: [6, 51.7],
			zoom: 8
		}),
		controls: defaultControls().extend([new TopBarControl(), new ZoomSlider(), new MapMenuControl()])
	});

	// vectors //TODO: this is more of the same. I want it to be separate layers, but can I loop over multiple geojson sources? => take on in GeoJson story 106
	const tunnelVector = new VectorLayer({
		source: new VectorSource({
			url: "assets/kml/tunnel.kml",
			format: new KML({
				extractStyles: false,
				showPointNames: false
			})
		}),
		style: function (feature) {
			return styles[feature.get("type")];}
	});

	const buildingVector = new VectorLayer({
		source: new VectorSource({
			url: "assets/kml/building.kml",
			format: new KML({
				extractStyles: false,
				showPointNames: false
			})
		}),
		style: function (feature) {
			return styles[feature.get("type")];}
	});

	const railVector = new VectorLayer({
		source: new VectorSource({
			url: "assets/kml/rail.kml",
			format: new KML({
				extractStyles: false,
			})
		}),
		style: function (feature) {
			return styles[feature.get("type")];}
	});

	const bridgeVector = new VectorLayer({
		source: new VectorSource({
			url: "assets/kml/bridge.kml",
			format: new KML({
				extractStyles: false,
				showPointNames: false
			})
		}),
		style: function (feature) {
			return styles[feature.get("type")];}
	});

	// load styles
	tunnelVector.getSource().on("featuresloadend", function (event) {
		event.features.forEach(function (feature) {
			feature.set("type", "tunnel");
		});
	});

	bridgeVector.getSource().on("featuresloadend", function (event) {
		event.features.forEach(function (feature) {
			feature.set("type", "bridge");
		});
	});

	buildingVector.getSource().on("featuresloadend", function (event) {
		event.features.forEach(function (feature) {
			feature.set("type", "building");
		});
	});

	railVector.getSource().on("featuresloadend", function (event) {
		event.features.forEach(function (feature) {
			feature.set("type", "rail");
		});
	});

	map.addLayer(railVector);	
	map.addLayer(tunnelVector);
	map.addLayer(bridgeVector);
	map.addLayer(buildingVector);
		
	map.addControl(new MapLayerControl(bridgeVector, buildingVector, railVector, tunnelVector));
	
	new MapFeatureTooltip(map, styles);
		
	document
		.querySelector('meta[name="description"]')
		.setAttribute("content", "Team Xerbutri explores abandoned buildings, railway tunnels and bridges. The website is about urban exploring, enjoy the pictures.");
	document.title = "Xerbutri Urban Exploring";
	
}