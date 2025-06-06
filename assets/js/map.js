import "../css/map.css";
import Map from "ol/Map";
import View from "ol/View";
import {Tile as TileLayer, Vector as VectorLayer} from "ol/layer";
import OSM from "ol/source/OSM";
import {useGeographic} from "ol/proj";
import {defaults as defaultControls, ZoomSlider} from "ol/control";
import VectorSource from "ol/source/Vector";
import {Icon, Stroke, Style} from "ol/style";
import {TopBarControl} from "./topbarcontrol.js";
import {MapMenuControl} from "./mapmenucontrol.js";
import {MapLayerControl} from "./maplayercontrol.js";
import {MapFeatureTooltip} from "./mapfeaturetooltip.js";
import GeoJSON from "ol/format/GeoJSON";

let map;
export function initMap() {
	
	let app = document.getElementById("app");
	
	app.innerHTML = `<div id="txmap"><div id="tx-menu-dismiss" class="tx-dismiss"></div> <div id="tx-layer-dismiss" class="tx-dismiss"></div></div>`;
	app.classList.remove("blog");

	// The vertical height fix for mobile devices
	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', `${vh}px`);

	window.addEventListener('resize', () => {
		// We execute the same script as before
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
	});
	
	// do not show header in map
	const headerElem = document.querySelector("header");
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
		"bridge": new Style({
			image: new Icon({
				opacity: 0.9,
				scale: 0.9,
				size: [52, 52],
				src: "ui/pics/bridgemarker.png",
			}),
		}),
		"tunnel": new Style({
			image: new Icon({
				opacity: 0.9,
				scale: 0.9,
				size: [52, 52],
				src: "ui/pics/tunnelmarker.png",
			}),
		}),
		"building": new Style({
			image: new Icon({
				opacity: 0.9,
				scale: 0.9,
				size: [52, 52],
				src: "ui/pics/buildingmarker.png",
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
	
	// map	// TODO later add new TopBarControl(), in the list below
	map = new Map({
		target: "txmap",
		layers: [raster],
		view: new View({
			projection: "EPSG:3857",
			center: [6, 51.7],
			zoom: 8
		}),
		controls: defaultControls().extend([new ZoomSlider(), new MapMenuControl()])
	});

	// vectors
	
	const tunnelVector = new VectorLayer({
		source: new VectorSource({
			url: "data/geo-tunnel.json",
			format: new GeoJSON(),
		}),
		style: function (feature) {
			return styles[feature.get("type")];
		}
	});

	const buildingVector = new VectorLayer({
		source: new VectorSource({
			url: "data/geo-gebouw.json",
			format: new GeoJSON(),
		}),
		style: function (feature) {
			return styles[feature.get("type")];
		}
	});

	const railVector = new VectorLayer({
		source: new VectorSource({
			url: "data/geo-spoor.json",
			format: new GeoJSON(),
		}),
		style: function (feature) {
			return styles[feature.get("type")];
		}
	});

	const bridgeVector = new VectorLayer({
		source: new VectorSource({
			url: "data/geo-brug.json",
			format: new GeoJSON(),
		}),
		style: function (feature) {
			return styles[feature.get("type")];
		}
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