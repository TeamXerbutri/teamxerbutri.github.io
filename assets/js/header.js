import {uiState} from './uistate.js';

function showContactPopover() {
	let cp = document.getElementById("contactpanel");
	cp.style.display = "block";
	window.setTimeout(setContactModalTrue, 1000);
}

function setContactModalTrue() {
	uiState.hasContactModal = true;
}

function hideContactPopover() {
	if (uiState.hasContactModal) {
		let cp = document.getElementById("contactpanel");
		cp.style.display = "none";
		uiState.hasContactModal = false;
	}
}

function showPrivacyDialog() {
	let pp = document.getElementById("privacypanel");
	pp.style.display = "block";
	window.setTimeout(setHasPrivacyModalTrue, 1000);
}

function setHasPrivacyModalTrue() {
	uiState.hasPrivacyModal = true;
}

function hidePrivacyDialog() {
	if (uiState.hasPrivacyModal === "true") {
		let pp = document.getElementById("privacypanel");
		pp.style.display = "none";
		uiState.hasPrivacyModal = "false";
	}
}

function showBackToTop() {
	let bt = document.getElementById("back-to-top");
	bt.style.display = "inline";
	window.setTimeout(setBacktoTopTrue, 1000);
}

function setBacktoTopTrue() {
	uiState.hasBackToTop = true;
}

function hideBackToTop() {
	if (uiState.hasBackToTop) {
		let bt = document.getElementById("back-to-top");
		bt.style.display = "none";
		uiState.hasBackToTop = false;
	}
}

//ToDo Do the menu with popover
function showMenu() {
	let menu = document.getElementById("menu");

	let menuitems = menu.getElementsByTagName("a");

	for (let i = 0; i < menuitems.length; i++) {
		let element = menuitems[i];
		element.style.display = "block";
	}

	menu.style.width = "100px";
	menu.style.height = "276px";
	// Why did I have this again? (double clicks?) Try with onblur instead
	window.setTimeout(setHasMenuTrue, 1000);
	document.getElementsByClassName('filter')[0].style.display = 'none';
}

function setHasMenuTrue() {
	uiState.hasMenu = true;
}

function hideMenu() {
	if (uiState.hasMenu) {
		let menu = document.getElementById("menu");
		let menuitems = menu.getElementsByTagName("a");

		for (let i = 0; i < menuitems.length; i++) {
			let element = menuitems[i];
			element.style.display = "none";
		}

		menu.style.width = "44px";
		menu.style.height = "44px";

		if (document.getElementsByClassName('filter')[0]) {
			document.getElementsByClassName('filter')[0].style.display = 'inline-block';
		}
		uiState.hasMenu = false;
	}
}

export {
	uiState,
	showContactPopover,
	hideContactPopover,
	showPrivacyDialog,
	hidePrivacyDialog,
	showBackToTop,
	hideBackToTop,
	showMenu,
	hideMenu
};