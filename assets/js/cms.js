﻿import "../css/cms.css";
import Map from "ol/Map";
import View from "ol/View";
import {Tile as TileLayer, Vector as VectorLayer} from "ol/layer";
import OSM from "ol/source/OSM";
import {useGeographic} from "ol/proj";
import {defaults as defaultControls, ZoomSlider} from "ol/control";
import VectorSource from "ol/source/Vector";
import {Stroke, Style} from "ol/style";
import {TopBarControl} from "./topbarcontrol.js";
import GeoJSON from "ol/format/GeoJSON";

let map;
export function initCms() {
		
	document.querySelector("#app").innerHTML = `<div id="cmsmap"></div>`;

	// The vertical height fix for mobile devices
	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', `${vh}px`);

	window.addEventListener('resize', () => {
		// We execute the same script as before
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
	});
	
	// do not show header in map
	const headerElem = document.getElementById("header");
	if (!headerElem.classList.contains("cms-header")) {
		headerElem.classList.add("cms-header")
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
		"baseLine": new Style({
			stroke: new Stroke({
				width: 7, color: "rgb(138,0,155)",
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
	styles["rail"] = [styles["baseLine"], styles["whiteDash"]];

	// raster (the base map or background)
	
	const raster = new TileLayer({
		source: new OSM({
			projection: "EPSG:4326"
		})
	});
	
	// map	
	map = new Map({
		target: "cmsmap",
		layers: [raster],
		view: new View({
			projection: "EPSG:3857",
			center: [6, 51.7],
			zoom: 8
		}),
		controls: defaultControls().extend([new TopBarControl(), new ZoomSlider()])
	});

	// vectors
	
	const railVector = new VectorLayer({
		source: new VectorSource({
			url: "data/geo-spoor.json",
			format: new GeoJSON(),
		}),
		style: function (feature) {
			return styles[feature.get("type")];
		}
	});

	railVector.getSource().on("featuresloadend", function (event) {
		event.features.forEach(function (feature) {
			feature.set("type", "rail");
		});
	});

	map.addLayer(railVector);
	
	document
		.querySelector('meta[name="description"]')
		.setAttribute("content", "Team Xerbutri, content for future blogs.");
	document.title = "TX-The tunnel: CMS";
	
}