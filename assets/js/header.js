import {uiState} from './uistate.js';


function showMenuItem(elementId){
	document.addEventListener("click", function(evt){hideMenuItem(elementId, evt)});
	document.getElementById(elementId).style.display = 'block';
}

function hideMenuItem(elementId, evt){
	let element = document.getElementById(elementId);
	if(element.style.display !== 'none' && evt.target.parentNode.id !==  "menu"){
		document.removeEventListener("click", function(evt){hideMenuItem(elementId, evt)});
		element.style.display = 'none';
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
	// TODO Why did I have this again? (double clicks?) Try with onblur instead
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
	showBackToTop,
	hideBackToTop,
	showMenu,
	hideMenu,
	showMenuItem
};