function showBackToTop() {
	let bt = document.querySelector(".back-to-top");
	bt.IsActive = true;
	bt.classList.remove("hide");
	bt.classList.add("back-to-top__show");
}

function hideBackToTop() {
	let bt = document.querySelector(".back-to-top");
	bt.IsActive = false;
	bt.classList.remove("back-to-top__show");
	bt.classList.add("hide");
}

function initializeBackToTop() {
	let app = document.querySelector("#app");
	hideBackToTop();

	app.onscroll = function (ev) {
		let bt = document.querySelector(".back-to-top");
		if (app.scrollTop >= 200 && !bt.IsActive) {
			showBackToTop();
			return;
		}
		if (bt.IsActive && app.scrollTop < 200) {
			hideBackToTop();
		}
	}
}

const upArrow = '<svg aria-hidden="true" class="tx-icon" viewBox="0 0 24 24" width="24" height="24"><path d="m0,24 l0,-12 l12,-12 l12,12 l0,12 l-12,-12 l-12,12 Z"/></svg>';

const backToTopHtml = `<a class="back-to-top fab hide" href="#top">${upArrow}</a>`

export {
	initializeBackToTop, backToTopHtml
};