import {uiState} from "./uistate.js";
import {hideBackToTop, showBackToTop} from "./header.js";
import {appState} from "./appstate.js";
import txLogo from "../images/tx.gif"
import {getBlogDataById, getHomeData} from "./blogdata.js"

uiState.hasMenu = true;
uiState.hasContactModal = false;
uiState.hasPrivacyModal = false;
uiState.hasShareModal = false;
uiState.hasBackToTop = false;


//TODO need to translate FFF to JS
// 	<script src="../picz/{{@categorie}}/{{@map}}/items.js"></script>
// <script src='../ui/js/photoswipe.min.js'></script>
// <script src='../ui/js/photoswipe-ui-default.min.js'></script>
// <!check if="{{@categorieid == 3 }}"><true>
// 	<script src="../picz/{{@categorie}}/{{@map}}/longlatarray.js"></script>
// 	<script src="../ui/js/reportage.js"></script>
// </true>
// 	<false>
// 		<script  src="../ui/js/gallery.js"></script>
// 		<script type="application/ld+json">
// 			<include href="{{@jsonld}}"/>
// 		</script>
// 	</false>
// </check>

// 	<!check if="{{@categorieid == 3 }}"><true>
// 	<div id="map" class="map"></div>
// </true></check>
// <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
// 	<div class="pswp__bg"></div>
// 	<div class="pswp__scroll-wrap">
// 		<div class="pswp__container">
// 			<div class="pswp__item"></div>
// 			<div class="pswp__item"></div>
// 			<div class="pswp__item"></div>
// 		</div>
// 		<div class="pswp__ui pswp__ui--hidden">
// 			<div class="pswp__top-bar">
// 				<div class="pswp__counter"></div>
// 				<button class="pswp__button pswp__button--close" title="Sluiten (Esc)"></button>
// 				<button class="pswp__button pswp__button--share" title="Delen"></button>
// 				<button class="pswp__button pswp__button--fs" title="Volledig scherm"></button>
// 				<button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>
// 				<div class="pswp__preloader">
// 					<div class="pswp__preloader__icn">
// 						<div class="pswp__preloader__cut">
// 							<div class="pswp__preloader__donut"></div>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 			<div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
// 				<div class="pswp__share-tooltip"></div>
// 			</div>
// 			<button class="pswp__button pswp__button--arrow--left" title="Vorige (linkerpijl)">
// 			</button>
// 			<button class="pswp__button pswp__button--arrow--right" title="Volgende (rechterpijl)">
// 			</button>
// 			<div class="pswp__caption">
// 				<div class="pswp__caption__center"></div>
// 			</div>
// 		</div>
// 	</div>
// </div>





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


export function initBlog() {

	document.querySelector('#app').innerHTML = `
		<article id="blog">
		<div id="article-title"></div>
		</article>
		<a id="back-to-top" href="#blog">^</a>
		`
	// TODO set the localized translations in header
		
	const header = `<a href="../" title="Team Xerbutri Overzichts pagina"><img alt="Team Xerbutri Logo" id="tx" src="${txLogo}"></a>
		<h1 class="logo">Team Xerbutri</h1>
		<div id="sharepanel">
			<a href="" target="_blank" id="sharefb">Facebook</a>
			<a href="" target="_blank" id="sharewa">Whatsapp</a>
		</div>
		<div class="blogmenu" id="menu">
			<a href="../map" title="Team Xerbutri Maps"> Maps</a>
			<a href="../avontuur/TXATX" title="Over Team Xerbutri urban exploring"> Over TX</a>
			<a href="../avontuur/TXAUE" title="Over Urban exploring">Over UE</a>
			<a id="contact" title="Neem contact met ons op">Contact</a>
		</div>
		<a class="overview" href="../" title="Terug naar overzicht">X</a>
		<div id="contactpanel">
			<p>Voor op- of aanmerkingen, maak een issue op GitHub <a
					href="https://github.com/TeamXerbutri/teamxerbutri.github.io/issues">Team Xerbutri GitHub</a></p>
		</div>`
	const headerElem = document.getElementById("header");
	if(headerElem.classList.contains("home")){
		headerElem.classList.remove("home");
		headerElem.classList.add("blog")
		headerElem.innerHTML = header
	}
	
	console.log("Hit init blog");
	
	function errorHandler(error) {
		console.error(error);
	}
	let abbreviation = window.location.href.split("/").pop();
	getBlogDataById(abbreviation).then(
		function (value) {
			console.log("Blog object is: ", value);
			document.title = value.shortname + " - Xerbutri Urban Exploring";
			document.querySelector('meta[name="description"]').setAttribute("content", value.description);
			document.getElementById("article-title").innerHTML = `<h1>${value.shortname}</h1>`;
		});
	
	
	// ToDo check for param category, if not there, go get it from JSON
	let category = "gebouw";
	
	
	
	
	
	
	
	//setShare();
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