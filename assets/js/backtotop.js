function showBackToTop() {
	let bt = document.getElementById("back-to-top");
	bt.style.display = "inline";
}

function hideBackToTop() {
	let bt = document.getElementById("back-to-top");
	bt.style.display = "none";
}

export {
	showBackToTop,
	hideBackToTop,
};