import './style.css'
import txLogo from './assets/images/tx.gif'
import {showContactModal, hideContactModal, showPrivacyModal, hidePrivacyModal, showBackToTop, hideBackToTop, showMenu, hideMenu} from './assets/js/header.js'
//TODO import the router.js

 //TODO The header and main are universal. As is the noscript tag. Create a container wrapper div. load image and eventlistener from init 
document.querySelector('#app').innerHTML =`<main>
<header>
	<img class="tx" src=${txLogo} alt="Team Xerbutri Logo">
	<h1 class="logo">Team Xerbutri</h1>
	
	<div class="menu" id="menu">
		<a href="map" title="Team Xerbutri Maps"> Maps</a>
		<a href="avontuur/TXATX" title="Over Team Xerbutri urban exploring"> Over TX</a>
		<a href="avontuur/TXAUE" title="Over Urban exploring">Over UE</a>
		<a id="contact" title="Neem contact met ons op">Contact</a>
        <a id="privacy" title="Onze privacy declaratie">Privacy</a>
		<!--<a href="vier/xerbutri.php?lang=2" title="Visit the team xerbutri page version 4 in English" >EN</a>-->
	</div>
    <div id="contactpanel">
        <p>Voor op- of aanmerkingen, maak een issue op GitHub <a href="https://github.com/TeamXerbutri/teamxerbutri.github.io/issues">Team Xerbutri GitHub</a> </p>
    </div>
    <div id="privacypanel">
        <p>We respecteren privacy, deze site is gehost onder GitHub Pages en valt onder die privacy policy.</p>
    </div>
</header>

<div id="oi">
	<div id="oc">
<!--        <div class="xerbutrit tile" id="kaart">-->
<!--            <a href="map" title="Toon alle locaties op de kaart">-->
<!--                <img class="te"  src="data/xerbutri/map/map.jpg">-->
<!--                <h3 class="te">Toon op kaart</h3>-->
<!--                <h2 class="te">Alle locaties op kaart</h2>-->
<!--            </a>-->
<!--        </div>-->
<!--		<object-card category="xerbutri" abbreviation="map" shortname="Alle locaties op kaart" realname="Toon op kaart" description="Toon alle locaties op kaart"></object-card>-->
    </div>
	<noscript>
		<p>Javascript is niet geactiveerd. <br/>
	 	Team Xerbutri gebruikt Javascript om het laden van de afbeeldingen soepel te laten verlopen en om te kunnen filteren op categorie.<br/>
	 	Voor instructies om javascript aan te zetten verwijzen we naar <a href="https://www.browserchecker.nl/javascript-aanzetten">Browserchecker, Javascript aanzetten</a>.
		<br/><br/>
		Als je Javascript niet aan wilt zetten, dan kun je altijd onze oude website bezoeken via deze link: <a href="https://www.xerbutri.nl/vier/xerbutri.php?lang=1">Ga naar Xerbutri versie 4.3</a><br/>
		Op Xerbutri versie 4.3 vind je niet onze nieuwste avonturen, versie 4.3 is in december 2017 voor het laatst inhoudelijk bijgewerkt.</p>
	</noscript>
</div>

    <a id="back-to-top" href="#top">^</a>
</main>
    <input type="hidden" id="maxid" value="1"/>`



//before loading build a skeleton with text
let viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);





let appState = {};
appState.language = "nl";
// TODO: get language from browser like:
let futureLanguage = navigator.language;
let lastid=1;




(function(){
    document.addEventListener('DOMContentLoaded', init);

    function init() {
        hidePrivacyModal();
        hideContactModal();
        hideBackToTop();
        document.addEventListener("click", hideMenu);
        document.addEventListener("click", hidePrivacyModal);
        document.addEventListener("click", hideContactModal);
        document.getElementById("menu").addEventListener("click", showMenu);
        document.getElementById("contact").addEventListener("click", showContactModal);
        document.getElementById("privacy").addEventListener("click", showPrivacyModal);
        if (window.scrollY >= 200) {
            showBackToTop();
        }
        else{
            hideBackToTop();
        }
    }})();














