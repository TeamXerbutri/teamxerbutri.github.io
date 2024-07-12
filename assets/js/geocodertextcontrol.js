//TODO class GeocoderTextControl

topBar.innerHTML = `<div id="geocoder-text-control">
	<input type="text" id="geocoder-text" placeholder="Zoeken naar...">
	<span id="menu-button">Menu</span>
</div>
`;
let geocoderTextControl = document.createElement("div");
geocoderTextControl.id = "geocoder-text-control";

let geocoderText = document.createElement("input");
geocoderText.type = "text";
geocoderText.id = "geocoder-text";
geocoderText.placeholder = "Zoeken naar...";
geocoderTextControl.appendChild(geocoderText);