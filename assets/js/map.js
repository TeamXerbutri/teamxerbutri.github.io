import '../css/map.css';
import KML from 'ol/format/KML';
import {Map, View} from 'ol';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import OSM from 'ol/source/OSM';
import {useGeographic} from 'ol/proj';
import {defaults as defaultControls} from 'ol/control';
import VectorSource from "ol/source/Vector.js";

let map;
export function initMap() {
	
	
	document.querySelector("#app").innerHTML = `<div id="map"></div>`;
	const header = ``;
	const headerElem = document.getElementById("header");
	if (!headerElem.classList.contains("map-header")) {
		headerElem.classList.add("map-header")
		headerElem.innerHTML = header
	}
	
	useGeographic();
	
	// vectors
	const tunnelVector = new VectorLayer({
		source: new VectorSource({
			url: 'ui/kml/tunnel.kml',
			format: new KML({
				extractStyles: false,
				showPointNames: false
			})
		})
	});
	
	// map
	
	map = new Map({
		target: 'map',
		layers: [
			new TileLayer({
				source: new OSM({
					projection: 'EPSG:4326'
				})
			})
		],
		view: new View({
			projection: 'EPSG:3857',
			center: [6, 51.7],
			zoom: 8
		}),
		controls: defaultControls()
	});
	
	
	
	// Filter box

	document
		.querySelector('meta[name="description"]')
		.setAttribute("content", "Team Xerbutri explores abandoned buildings, railway tunnels and bridges. The website is about urban exploring, enjoy the pictures.");
	document.title = "Xerbutri Urban Exploring";
	
}