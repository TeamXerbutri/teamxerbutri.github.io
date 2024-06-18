import {Control} from "ol/control";

// The top bar in the map of the xerbutri website. A control in Open Layers is an element hovering over the map in a fixed position
export class TopBarControl extends Control {
	constructor(opt_options) {
		const options = opt_options || {};
		
		const element = document.createElement("div");
		element.id = "top-bar";
		element.className = "top-bar ol-unselectable ol-control";
		
		super({
			element: element,
			target: options.target,
		});
	}
}