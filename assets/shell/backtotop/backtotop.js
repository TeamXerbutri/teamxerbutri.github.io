function showBackToTop() {
	let bt = document.querySelector(".back-to-top");
	bt.hidden = false;
}

function hideBackToTop() {
	let bt = document.querySelector(".back-to-top");
	bt.hidden = true;
}

export const initializeBackToTop = async () => {
	let frame = document.getElementById("js-frame");
	hideBackToTop();

	frame.onscroll = function (ev) {
		let bt = document.querySelector(".back-to-top");
		if (frame.scrollTop >= 200 && bt.hidden) {
			showBackToTop();
			return;
		}
		if (!bt.hidden && frame.scrollTop < 200) {
			hideBackToTop();
		}
	}
}

const upArrow = '<svg aria-hidden="true" class="icon_dark" viewBox="0 0 24 24" width="24" height="24"><path d="m0,24 l0,-12 l12,-12 l12,12 l0,12 l-12,-12 l-12,12 Z"/></svg>';

// TODO: aria-label?
const fabBackToTop = `<a class="back-to-top fab" href="#href-top" title="Back to top" data-i18n="navigation.top">${upArrow}</a>`;

export const backToTopComponent = (children) => {

	return `
<div id="href-top">
	${children}
</div>
${fabBackToTop}
`;
}
