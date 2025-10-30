import "./map.css";
import Map from "ol/Map";
import View from "ol/View";
import {Tile as TileLayer, Vector as VectorLayer} from "ol/layer";
import OSM from "ol/source/OSM";
import {useGeographic} from "ol/proj";
import {defaults as defaultControls, ZoomSlider} from "ol/control";
import VectorSource from "ol/source/Vector";
import {Icon, Stroke, Style} from "ol/style";
import {TopBarControl} from "./control/topbar.js";
import {MapMenuControl} from "./control/menu.js";
import {MapLayerControl} from "./control/layer.js";
import {MapFeatureTooltip} from "./tooltip/feature.js";
import GeoJSON from "ol/format/GeoJSON";
import {apiBasePath} from "../config.js";

let map;
let isLoaded = false;

export const loadMap = () => {
	// init
	if (!isLoaded) {
		init();
		isLoaded = true;
	}
	
	document.querySelector("html").classList.add("overflow-hidden");
	document.querySelector(".shell").hidden = true;
	document.querySelector("header").classList.add("hide");
}

const init = () => {
	
	let app = document.getElementById("js-app");
	
		app.insertAdjacentHTML('beforeend', `<div id="js-map" class="map"><div class="menu-modal__dismiss hide dismiss"></div> <div class="layer-modal__dismiss hide dismiss"></div></div>`);
	
	// The vertical height fix for mobile devices
	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', `${vh}px`);

	window.addEventListener('resize', () => {
		// We execute the same script as before
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
	});
	
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
		target: "js-map",
		layers: [raster],
		view: new View({
			projection: "EPSG:3857",
			center: [6, 51.7],
			zoom: 8
		}),
		controls: defaultControls().extend([new ZoomSlider(), new MapMenuControl()])
	});

	// vectors
	
	function createVectorLayer(url) {
		return new VectorLayer({
			source: new VectorSource({
				url: url,
				format: new GeoJSON(),
			}),
			style: function (feature) {
				return styles[feature.get("type")];
			}
		});
	}

	const tunnelVector = createVectorLayer(`${apiBasePath()}/geo-tunnel.json`);
	const buildingVector = createVectorLayer(`${apiBasePath()}/geo-gebouw.json`);
	const railVector = createVectorLayer(`${apiBasePath()}/geo-spoor.json`);
	const bridgeVector = createVectorLayer(`${apiBasePath()}/geo-brug.json`);
	
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
		.setAttribute("content", "A map with all the abandoned places visited by Team Xerbutri.");
	document.title = "Team Xerbutri - Maps";
}