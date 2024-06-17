import '../css/map.css';
import KML from 'ol/format/KML';
import Map from 'ol/Map';
import View from 'ol/View';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import OSM from 'ol/source/OSM';
import {fromLonLat, toLonLat, useGeographic} from 'ol/proj';
import {defaults as defaultControls} from 'ol/control';
import VectorSource from "ol/source/Vector";
import {Circle, Fill, Icon, Stroke, Style} from "ol/style";



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

	// the styles
	const styles = {
		'icon': new Style({
			image: new Circle({
				radius: 7,
				fill: new Fill({color: 'rgba(255, 0, 0, 1)'}),
				stroke: new Stroke({
					color: 'rgba(255, 255, 255, 1)',
					width: 2,
				}),
			}),
		}), // TODO Delete bridge example
		'bridge-example': new Style({
			image: new Icon({
				anchor: [0.5, 46],
				anchorXUnits: 'fraction',
				anchorYUnits: 'pixels',
				src: 'assets/images/bridgemarker.png',
			}),
		}),
		'bridge': new Style({
			image: new Icon({
				opacity: 0.9,
				scale: 0.9,
				size: [52, 52],
				src: 'assets/images/bridgemarker.png',
			}),
		}),
		'tunnel': new Style({
			image: new Icon({
				opacity: 0.9,
				scale: 0.9,
				size: [52, 52],
				src: 'assets/images/tunnelmarker.png',
			}),
		}),
		'building': new Style({
			image: new Icon({
				opacity: 0.9,
				scale: 0.9,
				size: [52, 52],
				src: 'assets/images/buildingmarker.png',
			}),
		}),
		'redLine': new Style({
			stroke: new Stroke({
				width: 7, color: 'rgba(255, 0, 0, 1)',
			}),
			zIndex: 2,
		}),
		'whiteDash': new Style({
			stroke: new Stroke({
				width: 5, color: 'rgba(255, 255, 255, 1)',
				lineDash: [16, 28]
			}),
			zIndex: 3
		}),
	}
	styles['rail'] = [styles['redLine'], styles['whiteDash']];
	
	
	// vectors
	const tunnelVector = new VectorLayer({
		source: new VectorSource({
			url: 'assets/kml/tunnel.kml',
			format: new KML({
				extractStyles: false,
				showPointNames: false
			})
		}),
		style: function (feature) {
			return styles[feature.get('type')];}
	});

	const buildingVector = new VectorLayer({
		source: new VectorSource({
			url: 'assets/kml/building.kml',
			format: new KML({
				extractStyles: false,
				showPointNames: false
			})
		}),
		style: function (feature) {
			return styles[feature.get('type')];}
	});

	const railVector = new VectorLayer({
		source: new VectorSource({
			url: 'assets/kml/rail.kml',
			format: new KML({
				extractStyles: false,
			})
		}),
		style: function (feature) {
			return styles[feature.get('type')];}
	});

	const bridgeVector = new VectorLayer({
		source: new VectorSource({
			url: 'assets/kml/bridge.kml',
			format: new KML({
				extractStyles: false,
				showPointNames: false
			})
		}),
		style: function (feature) {
			return styles[feature.get('type')];}
	});


	// load styles
	tunnelVector.getSource().on('featuresloadend', function (event) {
		event.features.forEach(function (feature) {
			feature.set('type', 'tunnel');
		});
	});

	bridgeVector.getSource().on('featuresloadend', function (event) {
		event.features.forEach(function (feature) {
			feature.set('type', 'bridge');
		});
	});
	
	buildingVector.getSource().on('featuresloadend', function (event) {
		event.features.forEach(function (feature) {
			feature.set('type', 'building');
		});
	});
	
	railVector.getSource().on('featuresloadend', function (event) {
		event.features.forEach(function (feature) {
			feature.set('type', 'rail');
		});
	});
	
	
	// raster (the base map or background)
	
	const raster = new TileLayer({
		source: new OSM({
			projection: 'EPSG:4326'
		})
	});
	
	map = new Map({
		target: 'map',
		layers: [raster],
		view: new View({
			projection: 'EPSG:3857',
			center: [6, 51.7],
			zoom: 8
		}),
		controls: defaultControls()
	});

	map.addLayer(railVector);	
	map.addLayer(tunnelVector);
	map.addLayer(bridgeVector);
	map.addLayer(buildingVector);
	
	
	
	// Filter box

	
	//TODO improve:

	// var mapbox = document.createElement("DIV");
	// mapbox.id = "mapbox";
	// var clickbox = document.createElement("DIV");
	// clickbox.id = "clickbox";
	// clickbox.style.display = "none";
	// var clickinfo = document.createElement("DIV");
	// clickinfo.id = "clickinfo";
	// clickbox.appendChild(clickinfo);
	// mapbox.appendChild(clickbox);
	// var hoverbox = document.createElement("DIV");
	// hoverbox.id = "hoverbox";
	// hoverbox.style.display = "none";
	// var hoverinfo = document.createElement("DIV");
	// hoverinfo.id = "hoverinfo";
	// hoverbox.appendChild(hoverinfo);
	// mapbox.appendChild(hoverbox);
	// gcDivParent.appendChild(mapbox);

	

	// const railVector = new Vector({
	// 	source: new VectorSource({
	// 		projection: 'EPSG:4326',
	// 		url: 'ui/kml/spoor.kml',
	// 		format: new ol.format.KML({
	// 			extractStyles: false
	// 		})
	// 	}),
	// 	style: [redStroke, whiteDash]
	// });
	// var gebouwVector = new ol.layer.Vector({
	// 	source: new ol.source.Vector({
	// 		url: 'ui/kml/gebouw.kml',
	// 		format: new ol.format.KML({
	// 			showPointNames: false,
	// 			extractStyles: false
	// 		})
	// 	}),
	// 	style: new ol.style.Style({
	// 		image: new ol.style.Icon({
	// 			size: [52, 52],
	// 			opacity: 0.9,
	// 			scale: 0.9,
	// 			src: 'ui/pics/gebouwMarker.png'
	// 		})
	// 	})
	// });
	
	
	
	document
		.querySelector('meta[name="description"]')
		.setAttribute("content", "Team Xerbutri explores abandoned buildings, railway tunnels and bridges. The website is about urban exploring, enjoy the pictures.");
	document.title = "Xerbutri Urban Exploring";
	
}