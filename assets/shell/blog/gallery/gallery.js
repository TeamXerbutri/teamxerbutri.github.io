import {loadGallery} from "./default.js";
import "./gallery.css"
import "photoswipe/style.css";

const galleryTypes = {
	none: "none",
	default: "default",
	captions: "captions",
	openlayers: "openlayers"
};

// TODO, choose a more efficient way in the future
const getGalleryType = async (category, routeId) => {
	
	return galleryTypes.default;
}

export const buildGallery = async (category, routeId) => {
	const type = await getGalleryType(category, routeId);
	switch (type) {
		case galleryTypes.none:
			break;
		case galleryTypes.default:
			await loadGallery(category, routeId);
			break;
		case galleryTypes.captions:
			// TODO build captions gallery
			break;
		case galleryTypes.openlayers:
			// TODO build openlayers gallery
			break;
		default: {
			console.error(`Unknown gallery type: ${type}`);
			break;
		}
	}

}

