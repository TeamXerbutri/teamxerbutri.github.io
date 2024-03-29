﻿import {createBlogObject} from "./objectfactory.js"
import {uiState} from "./uistate.js"
import {
	hideBackToTop,
	hideContactPopover,
	hideMenu,
	hidePrivacyDialog,
	showBackToTop,
	showContactPopover,
	showMenu,
	showPrivacyDialog
} from "./header.js";
import txLogo from "../images/tx.gif"
import {getHomeData} from "./blogdata.js"

// UI state Business logic for filtering
function setDisplayFilter(className, display) {
	let categories = document.getElementsByClassName(className);
	let i;

	for (i = 0; i < categories.length; i++) {
		categories[i].style.display = display;
	}
}

// Builds the objects
function objectFactory(subjects) {
	const objectContainer = document.getElementById('oc');
	for (let i in subjects) {
		let displayObject = createBlogObject(subjects[i]);
		objectContainer.appendChild(displayObject);
	}
}

function filterObjects() {
	if (uiState.hasFilter.bridge) {
		setDisplayFilter('bridge', 'none');
	}
	if (uiState.hasFilter.building) {
		setDisplayFilter('building', 'none');
	}
	if (uiState.hasFilter.rail) {
		setDisplayFilter('rail', 'none');
	}
	if (uiState.hasFilter.tunnel) {
		setDisplayFilter('tunnel', 'none');
	}
}


export function initHome() {
	document.querySelector('#app').innerHTML = `
<div id="oi">
	<div id="oc">
    </div>
</div>
<a id="back-to-top" href="#oi">^</a>`

	// TODO set the correct translations
	const header = `<img alt="Team Xerbutri Logo" id="tx" src="${txLogo}">
		<h1 class="logo">Team Xerbutri</h1>

		<div class="menu" id="menu">
			<a href="map" title="Team Xerbutri Maps"> Maps</a>
			<a href="avontuur/txatx" title="Over Team Xerbutri urban exploring"> Over TX</a>
			<a href="avontuur/txaue" title="Over Urban exploring">Over UE</a>
			<a id="contact" title="Neem contact met ons op">Contact</a>
			<a id="privacy" title="Onze privacy declaratie">Privacy</a>
			<!--<a href="vier/xerbutri.php?lang=2" title="Visit the team xerbutri page version 4 in English" >EN</a>-->
		</div>
		<div id="contactpanel">
			<p>Voor op- of aanmerkingen, maak een issue op GitHub <a
					href="https://github.com/TeamXerbutri/teamxerbutri.github.io/issues">Team Xerbutri GitHub</a></p>
		</div>
		<div id="privacypanel">
			<p>We respecteren privacy, deze site is gehost onder GitHub Pages en valt onder die privacy policy.</p>
		</div>`

	const headerElem = document.getElementById("header");
	if (headerElem.classList.contains("blog")) {
		headerElem.classList.remove("blog");
		headerElem.classList.add("home")
		headerElem.innerHTML = header
	}

	uiState.hasFilter = {bridge: false, building: false, rail: false, tunnel: false};

	let viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

	// fetch the objects
	getHomeData().then(
		function (value) {
			objectFactory(value.subjects);
		},
		function (error) {
			console.error(error);
		}
	)

	hideBackToTop();
	hideContactPopover();
	hidePrivacyDialog();
	document.addEventListener("click", hideMenu);
	document.addEventListener("click", hidePrivacyDialog);
	document.addEventListener("click", hideContactPopover);
	document.getElementById("menu").addEventListener("click", showMenu);
	document.getElementById("contact").addEventListener("click", showContactPopover);
	document.getElementById("privacy").addEventListener("click", showPrivacyDialog);

	if (window.scrollY >= 200) {
		showBackToTop();
	} else {
		hideBackToTop();
	}
	document
		.querySelector('meta[name="description"]')
		.setAttribute("content", "Team Xerbutri explores abandoned buildings, railway tunnels and bridges. The website is about urban exploring, enjoy the pictures.");
	document.title = "Xerbutri Urban Exploring";
}

	