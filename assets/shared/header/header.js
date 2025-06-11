import {leftArrow} from "../icons/icons.js";
import {initializeMenu, initializeShareMenu} from "./menu/menu.js";

const dotsMenu= '<svg aria-hidden="true" class="icon_dark" viewBox="0 0 24 24" width="24" height="24"><circle r="3" cx="12" cy="3"/><circle r="3" cx="12" cy="12"/><circle r="3" cx="12" cy="21"/></svg>';

const share = '<svg aria-hidden="true" class="icon_dark" viewBox="0 0 24 24" width="24" height="24"><circle r="4" cx="4" cy="12"/><circle r="4" cx="20" cy="20"/><circle r="4" cx="20" cy="4"/><path d="M22,22 L22,22 L2,12 L22,2 L22,4 L6,12 L22,20 Z"/></svg>';

const txLogo = '<svg aria-hidden="true" class="icon_dark" viewBox="0 0 24 24" width="24" height="24"><path d="M0,0 L24,0 L24,7 L22,4 L14.5,4 L14.5,22 L16,24 L14,24 L17.7,18.9 L21,24 L24,24 L19.3,16.7 L24,10 L22,10 L18.3,15.2 L15,10 L12,10 L16.7,17.4 L12,24 L8,24 L9.5,22 L9.5,4 L2,4 L0,6 Z" /></svg>';

const privacyHtml = `<div id="privacy-panel" class="panel hide">
			<h2 data-i18n="privacy.link">Privacy</h2>
			<p data-i18n="privacy.content">Privacy</p>
		</div>`

const contactHtml = `<div id="contact-panel" class="panel hide">
			<h2 data-i18n="contact.link">Contact</h2>
			<p data-i18n="contact.content">Contact</p>
		</div>`

const dotsMenuHtml = `<li class="menu__dropdown menu__dots"><a href="javascript:void(0);" role="button" class="link_mat-app-bar" data-i18n="navigation.menu">${dotsMenu}</a>
					<ul class="dropdown__sub-menu ul_mat-menu sub-menu__dots">
					</ul>
				</li>`

const shareButtonHtml = `<li class="menu__dropdown menu__share"><a href="javascript:void(0);" role="button" class="link_mat-app-bar" data-i18n="navigation.share">${share}</a>
					<ul class="dropdown__sub-menu ul_mat-menu sub-menu__share">
					</ul>
				</li>`

const homeHeaderHtml = `<div class="header__logo">${txLogo}</div><h1>Team Xerbutri</h1>
	<nav role="navigation">
		<ul class="nav__menu">
			${dotsMenuHtml}
		</ul>
	</nav>
		${contactHtml}
		${privacyHtml}
		`

const blogHeaderHtml = `
		<a class="link_mat-app-bar" href="../" data-i18n="navigation.back">${leftArrow}</a>
		<nav role="navigation">
			<ul class="nav__menu">
				<li><a class="link_mat-app-bar" href="../" data-i18n="navigation.home">${txLogo}</a></li>
				${shareButtonHtml}
				${dotsMenuHtml}
			</ul>
		</nav>
		${contactHtml}
		${privacyHtml}
		`
function initializeBlogHeader(){
	// init header
	const headerElem = document.querySelector("header");

	if (headerElem.classList.contains("home"))
		headerElem.classList.remove("home");

	if (headerElem.classList.contains("map-header"))
		headerElem.classList.remove("map-header");

	if (!headerElem.classList.contains("blog"))
		headerElem.classList.add("blog")

	headerElem.innerHTML = blogHeaderHtml

	initializeMenu("../");
	initializeShareMenu();
}

function initializeHomeHeader() {
	// init header
	const headerElem = document.querySelector("header");

	if (headerElem.classList.contains("blog"))
		headerElem.classList.remove("blog");

	if (headerElem.classList.contains("map-header"))
		headerElem.classList.remove("map-header");

	if (!headerElem.classList.contains("home"))
		headerElem.classList.add("home")

	headerElem.innerHTML = homeHeaderHtml

	initializeMenu("");
}

export {
	initializeBlogHeader, initializeHomeHeader
};