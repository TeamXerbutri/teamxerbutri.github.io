// There are four types of galleries:
// none....
// default
// captions
// openlayers

import {urlExists} from "../../../helpers.js";
import {ApiBasePath} from "../../../config.js";
import {lang} from "../../../language.js";
import {loadGallery} from "./default.js";

const galleryTypes = {
	none: "none",
	default: "default",
	captions: "captions",
	openlayers: "openlayers"
};

// TODO, choose a more efficient way in the future
//TODO: This does not work! All requests are redirected to index.html
const getGalleryType = async (category, routeId) => {
	// if no images.json, return none
	// if photos.json => openlayers
	// if captions in images.json => captions
	// else default
	
	
	const hasImages = await urlExists(`${ApiBasePath}/${category}/${routeId}/images.json`);
	
	if (!hasImages) {
		return galleryTypes.none;
	}
	
	const photoUrl = `${ApiBasePath}/${category}/${routeId}/photos.json`;
	const hasPhotos = await urlExists(photoUrl);
	
	if (hasPhotos) {
		return galleryTypes.openlayers;
	}
	
	const hasCaptions = await urlExists(`${ApiBasePath}/${category}/${routeId}/captions.${lang()}.json`);
	if (hasCaptions) {
		return galleryTypes.captions;
	}
	
	return galleryTypes.default;
}

export const buildGallery = async (category, routeId) => {
	const type = await getGalleryType(category, routeId);
	console.log(type);
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

