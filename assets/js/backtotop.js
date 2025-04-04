function showBackToTop() {
	let bt = document.getElementById("back-to-top");
	bt.IsActive = true;
	bt.style.display = "inline";
}

function hideBackToTop() {
	let bt = document.getElementById("back-to-top");
	bt.IsActive = false;
	bt.style.display = "none";
}

function initializeBackToTop(){
	let app = document.getElementById("app");
	hideBackToTop();
	
	app.onscroll = function (ev) {
		let bt = document.getElementById("back-to-top");
		if (app.scrollTop >= 200 && !bt.IsActive) {
			showBackToTop();
			return;
		} 
		if(bt.IsActive && app.scrollTop < 200) {
			hideBackToTop();
		}
	}
}

export {
	initializeBackToTop
};