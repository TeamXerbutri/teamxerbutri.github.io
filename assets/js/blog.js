//ToDo init Blog like in avontuur
import {uiState} from "./uistate.js";
import {hideBackToTop, showBackToTop} from "./header.js";
import {appState} from "./appstate.js";

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




//ToDo later!
// function setShare() {
// 	const uri = location.href;
// 	const urienc = encodeURIComponent(uri);
// 	const fburi = "https://www.facebook.com/sharer/sharer.php?u=" + urienc;
// 	const wauri = "whatsapp://send?text=" + urienc;
// 	const fbElem = document.getElementById('sharefb');
// 	const waElem = document.getElementById('sharewa');
// 	fbElem.href = fburi;
// 	waElem.href = wauri;
// }

export function initBlog() {
	// get last part of url string //TODO in function
	console.log("Hit init blog");
	let abbreviation = window.location.href.split("/").pop();
	let category = "gebouw"; //TODO Get category from somewhere
	let blogPath = "data/".concat(category, "/", abbreviation, "/", appState.language, "_", abbreviation, ".html");
	console.log("Blogpath: ",blogPath);
	let blogContent = fetch("data/".concat(category, "/", abbreviation, "/", appState.language, "_", abbreviation, ".html")).then(response => response.text());
	
	document.querySelector('#app').innerHTML = `
		<article id="blog">

		</article>
		<a id="back-to-top" href="#blog">^</a>
		`
	
	//As gemini says it should go
	//fetch(blogPath).then(response => response.text()).then(data => {const container = document.getElementById('blog');console.log("The hmml string: ", data); container.innerHTML = data;});
	
	// fetch(blogPath)
	// 	.then(response => response.text())
	// 	.then(function(html){
	// 		let parser = new DOMParser();
	// 		var doc = parser.parseFromString(html, 'text/html');
	// 		console.log("The doc: ", doc);
	// 	})
	
	
	// fetch the objects
	// blogContent.then(
	// 	function (value) {
	// 		console.log("Value: ", value);
	// 		document.getElementById("blog").innerHTML = value;
	// 	},
	// 	function (error) {
	// 		errorHandler(error)
	// 	}
	// 	);
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