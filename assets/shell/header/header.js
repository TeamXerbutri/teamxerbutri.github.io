import {leftArrow} from "../../shared/icons/icons.js";

const dotsMenu = '<svg aria-hidden="true" class="icon_dark" viewBox="0 0 48 48" width="48" height="48"><circle r="6" cx="24" cy="6"/><circle r="6" cx="24" cy="24"/><circle r="6" cx="24" cy="42"/></svg>';

const share = '<svg aria-hidden="true" class="icon_dark" viewBox="0 0 48 48" width="48" height="48"><circle r="8" cx="8" cy="24"/><circle r="8" cx="40" cy="40"/><circle r="8" cx="40" cy="8"/><path d="M44,44 L44,44 L4,24 L44,4 L44,8 L12,24 L44,40 Z"/></svg>';

const txLogo = '<svg aria-hidden="true" class="icon_dark" viewBox="0 0 48 48" width="48" height="48"><path d="M0,0 L48,0 L48,14 L44,8 L29,8 L29,44 L32,48 L28,48 L35.4,37.8 L42,48 L48,48 L38.6,33.4 L48,20 L44,20 L36.6,30.4 L30,20 L24,20 L33.4,34.8 L24,48 L16,48 L19,44 L19,8 L4,8 L0,12 Z" /></svg>';

const searchIcon = '<svg aria-hidden="true" class="icon_dark" viewBox="0 0 24 24" width="24" height="24"><circle r="4" cx="4" cy="12"/><circle r="4" cx="20" cy="20"/><circle r="4" cx="20" cy="4"/><path d="M22,22 L22,22 L2,12 L22,2 L22,4 L6,12 L22,20 Z"/></svg>';

const privacyHtml = `<div id="privacy-panel" class="panel hide">
			<h2 data-i18n="privacy.link">Privacy</h2>
			<p data-i18n="privacy.content">Privacy</p>
		</div>`;

const contactHtml = `<div id="contact-panel" class="panel hide">
			<h2 data-i18n="contact.link">Contact</h2>
			<p data-i18n="contact.content">Contact</p>
		</div>`;

const dotsMenuHtml = `<li class="menu__dropdown menu__dots"><div role="button" class="link_mat-app-bar show_inline-block" data-i18n="navigation.menu">${dotsMenu}</div>
					<ul class="dropdown__sub-menu ul_mat-menu sub-menu__dots">
					</ul>
				</li>`;

const shareButtonHtml = `<li class="menu__dropdown menu__share header__blog"><div role="button" class="link_mat-app-bar header__blog" data-i18n="navigation.share">${share}</div>
					<ul class="dropdown__sub-menu ul_mat-menu sub-menu__share">
					</ul>
				</li>`;

export const headerComponent = `
		<div class="header__logo header__index">${txLogo}</div>
		<div role="button" class="link_mat-app-bar header__blog" data-i18n="navigation.back">${leftArrow}</div>
		<h1 class="header__index">Team Xerbutri</h1>
		<nav role="navigation">
			<ul class="nav__menu">
				<li class="header__blog"><div role="button" class="link_mat-app-bar header__blog" data-i18n="navigation.home">${txLogo}</div></li>
				${shareButtonHtml}
				${dotsMenuHtml}
			</ul>
		</nav>
		${contactHtml}
		${privacyHtml}
		`;

export function initHeader() {
	const navBack = document.querySelectorAll('[data-i18n="navigation.back"]');
	navBack.forEach((el) => {
		el.addEventListener("click", () => {
			pageEvents.navigateBack();
		})
	});
	
	const navHome = document.querySelectorAll('[data-i18n="navigation.home"]');
	navHome.forEach((el) => {
		el.addEventListener("click", () => {
			pageEvents.navigateTo('home');
		})
	});
}
