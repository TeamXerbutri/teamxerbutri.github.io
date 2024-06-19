import '../css/map.css';
import KML from 'ol/format/KML';
import Map from 'ol/Map';
import View from 'ol/View';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import OSM from 'ol/source/OSM';
import {useGeographic} from 'ol/proj';
import {defaults as defaultControls, ZoomSlider} from 'ol/control';
import VectorSource from "ol/source/Vector";
import {Circle, Fill, Icon, Stroke, Style} from "ol/style";
import {TopBarControl} from "./topbarcontrol.js";
import {Select} from "ol/interaction";
import {click, pointerMove} from "ol/events/condition";


let map;
export function initMap() {
		
	document.querySelector("#app").innerHTML = `<div id="map"></div>`;
	const header = ``;
	const headerElem = document.getElementById("header");
	if (!headerElem.classList.contains("map-header")) {
		headerElem.classList.add("map-header")
		headerElem.innerHTML = header
	}
	
	const htmlElement = document.querySelector("html");
	if(!htmlElement.classList.contains("map-html")){
		htmlElement.classList.add("map-html");
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
	
	// map	
	map = new Map({
		target: 'map',
		layers: [raster],
		view: new View({
			projection: 'EPSG:3857',
			center: [6, 51.7],
			zoom: 8
		}),
		controls: defaultControls().extend([new TopBarControl(), new ZoomSlider()])
	});

	map.addLayer(railVector);	
	map.addLayer(tunnelVector);
	map.addLayer(bridgeVector);
	map.addLayer(buildingVector);
	
	// feature-info-container
	
	let featureInfo = document.createElement("div");
	featureInfo.pinned = false;
	featureInfo.id = "feature-info";
	featureInfo.classList.add("feature-info");
	document.getElementById("map").appendChild(featureInfo);

	const selectPointerMove = new Select({
		condition: pointerMove,
		style: function (feature) {
			return styles[feature.get('type')];
		},
	});
	map.addInteraction(selectPointerMove);
	
	const hoveredFeatures = selectPointerMove.getFeatures();
	
	hoveredFeatures.on('add', function (event) {
		showFeature(event)
	});
	hoveredFeatures.on('remove', function () {
		if(!featureInfo.pinned)
			featureInfo.style.visibility = "hidden";
	});
	
	const selectClick = new Select({
		condition: click,
		style: function (feature) {
			return styles[feature.get('type')];
		}
	});
	map.addInteraction(selectClick);
	const clickedFeatures = selectClick.getFeatures();
	
	clickedFeatures.on('add', function (event) {
		featureInfo.pinned = true;
		showFeature(event)
	});
	clickedFeatures.on('remove', function () {
		featureInfo.pinned = false;
		featureInfo.style.visibility = "hidden";
	});
	function showFeature(event){
		const feature = event.element;
		const name = feature.get('name');
		const description = feature.get('description');
		const category = description.split(",")[0];
		const routeId = description.split(",")[1];
		const coordinates = feature.getGeometry().getCoordinates();
		const pixel = map.getPixelFromCoordinate(coordinates);

		const viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
		const viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
		
		if(viewportWidth < 756 || viewportHeight < 500){
			featureInfo.innerHTML = `<a href="avontuur/${routeId}" title="${name}"> <img class="map-tile" src="data/${category}/${routeId}/${routeId}s.jpg" alt="${name}" > <h2 class="map-tile">${name}</h2></a>`;
		}
		else {
			featureInfo.innerHTML = `<a href="avontuur/${routeId}" title="${name}"> <img class="map-tile" src="data/${category}/${routeId}/${routeId}.jpg" alt="${name}" > <h2 class="map-tile">${name}</h2></a>`;
			if (featureInfo.pinned)
				featureInfo.innerHTML += `<img class="map-tile-pinned" src="../images/pin.svg" alt="pin" >`;
			
			// width large = 310px
			if (viewportWidth - pixel[0] < 310)
				featureInfo.style.left = pixel[0] - 310 + "px";
			else
				featureInfo.style.left = pixel[0] + "px";
			
			// height large = 233px
			if (viewportHeight - pixel[1] < 233)
				featureInfo.style.top = pixel[1] - 233 + "px";
			else
				featureInfo.style.top = pixel[1] + "px";
		}
		featureInfo.style.visibility = "visible";
	}
	
	// Filter container
	
	//TODO this should extend ol map control This is about the same as the indexfilter, but language-independent

	
	
	
	
	document
		.querySelector('meta[name="description"]')
		.setAttribute("content", "Team Xerbutri explores abandoned buildings, railway tunnels and bridges. The website is about urban exploring, enjoy the pictures.");
	document.title = "Xerbutri Urban Exploring";
	
}