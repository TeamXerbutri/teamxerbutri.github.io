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

function initMenuCtrl() {
	const menu = document.getElementById('menu-ctrl');
	const menuContent = document.querySelector(".menu-content");
	menu.IsActive = false;
	menuContent.classList.add("hide");
	
	menu.addEventListener('click', function (e) {
		e.stopPropagation();
		toggleMenuCtrl();
	})
	
	menuContent.addEventListener('click', function (e) {
		if(menu.IsActive)
			toggleMenuCtrl();
	})
	
	// dismiss overlay
	const menuOverlay = document.getElementById("dismiss-layer");
	menuOverlay.style.display = "none";

	menuOverlay.addEventListener("click", function(event) {
		if (event.target === menuOverlay) {
			toggleMenuCtrl()
		}
	});
}

function toggleMenuCtrl() {
	const menu = document.getElementById('menu-ctrl');
	const menuContent = document.querySelector(".menu-content");
	const dismissLayer = document.getElementById("dismiss-layer");
	if(menu.IsActive) {
		menuContent.classList.remove("show");
		menuContent.classList.add("hide");
		dismissLayer.style.display = "none"
		menu.IsActive = false;
	}else {
		menuContent.classList.remove("hide");
		menuContent.classList.add("show");
		dismissLayer.style.display = "block";
		menu.IsActive = true;
	}
}

function initializeMenu() {
	initMenuCtrl()
	document.getElementById("contact").addEventListener("click", function () {
		showItem("contactpanel")
	});
	document.getElementById("privacy").addEventListener("click", function () {
		showItem("privacypanel")
	});
}

export {
	initializeMenu
}