function showItem(elementId) {
	document.addEventListener("click", function (evt) {
		hideItem(elementId, evt)
	});
	document.getElementById(elementId).style.display = "block";
}

function hideItem(elementId, evt) {
	let element = document.getElementById(elementId);
	if (element.style.display !== "none" && evt.target.parentNode.id !== "menu") {
		document.removeEventListener("click", function (evt) {
			hideItem(elementId, evt)
		});
		element.style.display = "none";
	}
}

function initializeMenu() {
	document.getElementById("contact").addEventListener("click", function () {
		showItem("contactpanel")
	});
	document.getElementById("privacy").addEventListener("click", function () {
		showItem("privacypanel")
	});
	
	if(!("ontouchstart" in document.documentElement)) {
		document.documentElement.classList.add("no-touch");
		}
}

export {
	initializeMenu
}