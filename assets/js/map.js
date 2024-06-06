import '../css/map.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import {useGeographic} from 'ol/proj';
import {defaults as defaultControls} from 'ol/control';

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
	

	document
		.querySelector('meta[name="description"]')
		.setAttribute("content", "Team Xerbutri explores abandoned buildings, railway tunnels and bridges. The website is about urban exploring, enjoy the pictures.");
	document.title = "Xerbutri Urban Exploring";
	
}