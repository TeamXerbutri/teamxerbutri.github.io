import "./cms.css";
import "./topbar.css";
import "ol/ol.css";
import {defaults as defaultControls, MousePosition} from "ol/control";
import Map from "ol/Map";
import View from "ol/View";
import {Tile as TileLayer, Vector as VectorLayer} from "ol/layer";
import OSM from "ol/source/OSM";
import {useGeographic} from "ol/proj";
import VectorSource from "ol/source/Vector";
import {Stroke, Style} from "ol/style";
import GeoJSON from "ol/format/GeoJSON";
import {createStringXY} from 'ol/coordinate';
import {CmsFeatureTooltip} from "./cmsfeaturetooltip.js";
import {apiBasePath} from "../config.js";
import {CmsTopBarControl} from "./topbar.js";

let map;
let isLoaded = false;

export const loadCmsMap = () =>{
	// init
	if (!isLoaded) {
		init();
		isLoaded = true;
	}

	document.querySelector("html").classList.add("overflow-hidden");
	document.querySelector(".shell").hidden = true;
	document.querySelector("header").classList.add("hide");
	
	if(document.querySelector(".map"))
		document.querySelector(".map").hidden = true;
	
	document.querySelector(".cmsmap").hidden = false;
}

const init = () => {
	let app = document.getElementById("js-app");

	app.insertAdjacentHTML('beforeend', `<div id="js-cmsmap" class="cmsmap">`);
	
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

	// mouse position
	const mousePositionControl = new MousePosition({
		coordinateFormat: createStringXY(14),
		projection: 'EPSG:4326',

		className: 'custom-mouse-position',
		target: document.getElementById('mouse-position'),
	});

	// map	
	map = new Map({
		target: "js-cmsmap",
		layers: [raster],
		view: new View({
			projection: "EPSG:3857",
			center: [6, 51.7],
			zoom: 8
		}),
		controls: defaultControls().extend([mousePositionControl])
	});

	// vectors

	const railVector = new VectorLayer({
		source: new VectorSource({
			url: `${apiBasePath()}/cms-spoor.json`,
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

	new CmsFeatureTooltip(map, styles);
	map.addControl(new CmsTopBarControl(map));

	document
		.querySelector('meta[name="description"]')
		.setAttribute("content", "Team Xerbutri, content for future blogs.");
	document.title = "TX-The tunnel: CMS";
}