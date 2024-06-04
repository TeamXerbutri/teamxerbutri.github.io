import '../css/map.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
let map;
export function initMap() {
	document.querySelector("#app").innerHTML = `<div id="map"></div>`;
	map = new Map({
		target: 'map',
		layers: [
			new TileLayer({
				source: new OSM()
			})
		],
		view: new View({
			center: [6, 51.7],
			zoom: 8
		})
	});
	

	document
		.querySelector('meta[name="description"]')
		.setAttribute("content", "Team Xerbutri explores abandoned buildings, railway tunnels and bridges. The website is about urban exploring, enjoy the pictures.");
	document.title = "Xerbutri Urban Exploring";
	
}