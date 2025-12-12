import {Control} from "ol/control";

// The top bar in the map of the xerbutri website. A control in Open Layers is an element hovering over the map in a fixed position
export class CmsTopBarControl extends Control {
	constructor(map, opt_options) {
		const options = opt_options || {};
		
		const element = document.createElement("div");
		element.className = "cms-top-bar-control ol-unselectable ol-control";

		// create input and button elements instead of using innerHTML
		const inputEl = document.createElement("input");
		inputEl.type = "text";
		inputEl.name = "coordinates";
		inputEl.value = "";
		inputEl.className = "cms-mouse-position";

		const buttonEl = document.createElement("button");
		buttonEl.className = "cms-copy-button";
		buttonEl.textContent = "Copy";

		element.appendChild(inputEl);
		element.appendChild(buttonEl);

		// map click should populate the input and trigger copy
		map.addEventListener("click", function() {
			const posEl = document.getElementsByClassName("custom-mouse-position")[0];
			if (posEl) {
				inputEl.value = posEl.innerHTML;
				copyText();
			}
		});

		function copyText() {
			// Select the text field
			inputEl.select();
			inputEl.setSelectionRange(0, 99999); // For mobile devices

			// Copy the text inside the text field
			navigator.clipboard.writeText(inputEl.value).catch(() => {
				// Fallback for older browsers: try document.execCommand
				try {
					document.execCommand("copy");
				} catch (e) {
					// ignore
				}
			});
		}

		// wire the button to copy when clicked
		buttonEl.addEventListener("click", function() {
			copyText();
		});
		
		super({
			element: element,
			target: options.target,
		});
	}
}