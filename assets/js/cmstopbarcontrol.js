import {Control} from "ol/control";

// The top bar in the map of the xerbutri website. A control in Open Layers is an element hovering over the map in a fixed position
export class CmsTopBarControl extends Control {
	constructor(opt_options) {
		const options = opt_options || {};
		
		
			
		
		super({
			element: element,
			target: options.target,
		});
	}
}