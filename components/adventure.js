import './style.css'
import txLogo from './../assets/images/tx.gif'

document.querySelector('#app').innerHTML = `
<main>
<header >
	<a href="../" title="Team Xerbutri Overzichts pagina"><img class="tx" src=${txLogo} alt="Team Xerbutri Logo"></a>
	<h1 class="logo">Team Xerbutri</h1>
        <div id="sharepanel">
            <a href="" target="_blank" id="sharefb">Facebook</a>
            <a href="" target="_blank" id="sharewa">WhatsApp</a>
        </div>
	<div class="menu" id="menu">
		<a href="../map" title="Team Xerbutri Maps"> Maps</a>
		<a href="../avontuur/txatx" title="Over Team Xerbutri urban exploring"> Over TX</a>
		<a href="../avontuur/txaue" title="Over Urban exploring">Over UE</a>
		<a id="contact" title="Neem contact met ons op">Contact</a>
<!--		<a href="../vier/xerbutri.php?lang=2" title="Visit the team xerbutri page version 4 in English" >EN</a>-->
	</div>
        <a class="overview" href="../" title="Terug naar overzicht">X</a>
        <div id="contactpanel">
            <p>Voor op- of aanmerkingen, maak een issue op GitHub <a href="https://github.com/TeamXerbutri/teamxerbutri.github.io/issues">Team Xerbutri GitHub</a> </p>
        </div>
</header>

<article id="top">

</article>
<a id="back-to-top" href="#top">^</a>
<check if="{{@categorieid == 3 }}"><true> 
<div id="map" class="map"></div>
    </true></check>
<div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="pswp__bg"></div>
    <div class="pswp__scroll-wrap">
        <div class="pswp__container">
            <div class="pswp__item"></div>
            <div class="pswp__item"></div>
            <div class="pswp__item"></div>
        </div>
        <div class="pswp__ui pswp__ui--hidden">
            <div class="pswp__top-bar">
                <div class="pswp__counter"></div>
                <button class="pswp__button pswp__button--close" title="Sluiten (Esc)"></button>
                <button class="pswp__button pswp__button--share" title="Delen"></button>
                <button class="pswp__button pswp__button--fs" title="Volledig scherm"></button>
                <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>
                <div class="pswp__preloader">
                    <div class="pswp__preloader__icn">
                      <div class="pswp__preloader__cut">
                        <div class="pswp__preloader__donut"></div>
                      </div>
                    </div>
                </div>
            </div>
            <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                <div class="pswp__share-tooltip"></div> 
            </div>
            <button class="pswp__button pswp__button--arrow--left" title="Vorige (linkerpijl)">
            </button>
            <button class="pswp__button pswp__button--arrow--right" title="Volgende (rechterpijl)">
            </button>
            <div class="pswp__caption">
                <div class="pswp__caption__center"></div>
            </div>
        </div>
    </div>
</div>
</main>
<script src="../picz/{{@categorie}}/{{@map}}/items.js"></script>
<script src='../ui/js/photoswipe.min.js'></script>
<script src='../ui/js/photoswipe-ui-default.min.js'></script>
<check if="{{@categorieid == 3 }}"><true> 
    <script src="../picz/{{@categorie}}/{{@map}}/longlatarray.js"></script>
    <script src="../ui/js/reportage.js"></script>
    </true>
    <false>
    <script  src="../ui/js/gallery.js"></script>
    <script type="application/ld+json">
        <include href="{{@jsonld}}"/>
</script>
    </false> 
</check>
`

let viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

let uiState = {};
uiState.hasMenu = true;
uiState.hasContactModal = false;
uiState.hasPrivacyModal = false;
uiState.hasShareModal = false;
uiState.hasBackToTop = false;

let appState = {};
appState.language = "nl";
// TODO: get language from browser like:
let futureLanguage = navigator.language;

// get last part of url string
let abbreviation = window.location.href.split("/").pop();
let category = "gebouw"; //TODO Get category from somewhere
let blogContent = fetch("data/".concat(category, "/", abbreviation, "/", appState.language, "_", abbreviation, ".html")).then(response => response.text());

function showMenu() {
	let menu = document.getElementById("menu");
	let menuitems = menu.getElementsByTagName("a");
	for (let i = 0; i < menuitems.length; i += 1) {
		let element = menuitems[i];
		element.style.display = "block"
	}
	menu.style.width = "116px";
	menu.style.height = "230px";
	window.setTimeout(setHasMenuTrue, 1000)
}

function setHasMenuTrue() {
	uiState.hasMenu = true;
}

function hideMenu() {
	if (uiState.hasMenu) {
		let menu = document.getElementById("menu");
		let menuitems = menu.getElementsByTagName("a");
		for (let i = 0; i < menuitems.length; i += 1) {
			let element = menuitems[i];
			element.style.display = "none"
		}
		menu.style.width = "44px";
		menu.style.height = "44px";
		uiState.hasMenu = false
	}
}

function showShareModal() {
	let share = document.getElementById("sharepanel");
	let shareitems = share.getElementsByTagName("a");
	for (let i = 0; i < shareitems.length; i += 1) {
		const element = shareitems[i];
		element.style.display = "block"
	}
	share.style.width = "116px";
	share.style.height = "91px";
	window.setTimeout(setHasShareModal, 1000)
}

function setHasShareModal() {
	uiState.hasShareModal = true
}

function hideShareModal() {
	if (uiState.hasShareModal) {
		const share = document.getElementById("sharepanel");
		const shareitems = share.getElementsByTagName("a");
		for (let i = 0; i < shareitems.length; i += 1) {
			const element = shareitems[i];
			element.style.display = "none"
		}
		share.style.width = "44px";
		share.style.height = "44px";
		uiState.hasShareModal = false
	}
}

function showContactModal() {
	const cp = document.getElementById("contactpanel");
	cp.style.display = "block";
	window.setTimeout(setContactModalTrue, 1000)
}

function setContactModalTrue() {
	uiState.hasContactModal = "true"
}

function hideContactModal() {
	if (uiState.hasContactModal === "true") {
		const cp = document.getElementById("contactpanel");
		cp.style.display = "none";
		uiState.hasContactModal = "false"
	}
}

function showBackToTop() {
	const bt = document.getElementById("back-to-top");
	bt.style.display = "inline";
	window.setTimeout(setBackToTopTrue, 1000)
}

function setBackToTopTrue() {
	uiState.hasBackToTop = true;
}

function hideBackToTop() {
	if (uiState.hasBackToTop === "true") {
		const bt = document.getElementById("back-to-top");
		bt.style.display = "none";
		uiState.hasBackToTop = "false"
	}
}

function loadGallery(src) {
	const gallery = document.getElementById("gallery");
	const xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (this.readyState === 4 && this.status === 200) {
			gallery.innerHTML = xhttp.responseText
		}
	};
	xhttp.open("GET", src, true);
	xhttp.setRequestHeader("Content-type", "text/html");
	xhttp.send()
}

function setShare() {
	const uri = location.href;
	const urienc = encodeURIComponent(uri);
	const fburi = "https://www.facebook.com/sharer/sharer.php?u=" + urienc;
	const wauri = "whatsapp://send?text=" + urienc;
	const fbElem = document.getElementById('sharefb');
	const waElem = document.getElementById('sharewa');
	fbElem.href = fburi;
	waElem.href = wauri;
}

(function () {
	if (viewportWidth <= 755) {
		document.addEventListener('DOMContentLoaded', initMobile)
	}

	if (viewportWidth > 755) {
		document.addEventListener('DOMContentLoaded', initLarge)
	}

	function initMobile() {
		blogContent.then(data => {
			document.getElementById("top").innerHTML = data;
		});
		setShare();
		hideMenu();
		hideShareModal();
		hideContactModal();
		hideBackToTop();
		document.addEventListener("click", hideMenu);
		document.addEventListener("click", hideContactModal);
		document.addEventListener("click", hideShareModal);
		document.getElementById("menu").addEventListener("click", showMenu);
		document.getElementById("sharepanel").addEventListener("click", showShareModal);
		document.getElementById("contact").addEventListener("click", showContactModal);
		window.onscroll = function (ev) {
			const pvopen = false;
			if (window.scrollY >= 200) {
				showBackToTop()
			} else {
				hideBackToTop()
			}
		}
	}

	function initLarge() {
		blogContent.then(data => {
			document.getElementById("top").innerHTML = data;
		});
		setShare();
		hideMenu();
		hideShareModal();
		hideContactModal();
		hideBackToTop();
		document.addEventListener("click", hideMenu);
		document.addEventListener("click", hideShareModal);
		document.addEventListener("click", hideContactModal);
		document.getElementById("menu").addEventListener("click", showMenu);
		document.getElementById("sharepanel").addEventListener("click", showShareModal);
		document.getElementById("contact").addEventListener("click", showContactModal);
		window.onscroll = function (ev) {
			if (window.scrollY >= 250) {
				showBackToTop()
			} else {
				hideBackToTop()
			}
		};
		document.getElementById("mobgal").style.display = "none";
		const src = document.getElementById("mobgalimg").src;
		const asrc = src.split("/");
		let nsrc = "";
		for (let i = 0; i < asrc.length - 1; i += 1) {
			if (asrc[i] === "") {
				nsrc = nsrc + "//"
			} else {
				nsrc = nsrc + asrc[i] + "/"
			}
		}
		nsrc = nsrc + 'NL_foto.phtml';
		loadGallery(nsrc)
	}
})();