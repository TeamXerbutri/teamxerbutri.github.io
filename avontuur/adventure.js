import './style.css'

document.querySelector('#app').innerHTML =`
<main>
<header >
	<a href="../" title="Team Xerbutri Overzichts pagina"><img class="TX" src="../ui/pics/TX.gif" alt="Team Xerbutri Logo"></a>
	<h1 class="logo">Team Xerbutri</h1>
        <div id="sharepanel">
            <a href="" target="_blank" id="sharefb">Facebook</a>
            <a href="" target="_blank" id="sharewa">WhatsApp</a>
        </div>
	<div class="menu" id="menu">
		<a href="../map" title="Team Xerbutri Maps"> Maps</a>
		<a href="../avontuur/TXATX" title="Over Team Xerbutri urban exploring"> Over TX</a>
		<a href="../avontuur/TXAUE" title="Over Urban exploring">Over UE</a>
		<a id="contact" title="Neem contact met ons op">Contact</a>
<!--		<a href="../vier/xerbutri.php?lang=2" title="Visit the team xerbutri page version 4 in English" >EN</a>-->
	</div>
        <a class="overzicht" href="../" title="Terug naar overzicht">X</a>
        <div id="contactpanel">
            <p>Voor op- of aanmerkingen of persoonlijk contact stuur een bericht naar &#105;&#110;&#102;&#111;<span>rmation</span>&#064;<span>&nbsp;</span>xerbutri&#46;&#110;l</p>
        </div>
</header>

<article id="top">
	
	<include href="{{@artikel}}"/>
        <check if="{{@categorieid == 5 }}"><true></true><false>
        <h3>Bronnen</h3>
        <p>Voor het artikel is gebruikt gemaakt van de volgende bronnen:</p>
        <ol>
        <repeat group="{{ @bronresults }}" value="{{ @bronitem }}"> 
            <li><a href="{{@bronitem.bronadres}}" title="{{@bronitem.brontitel}}" target="_blank">{{@bronitem.brontitel|decodehtml}}</a> <i>bezocht op {{date("j M Y",strtotime(@bronitem.brondatum))}}</i></li>
        </repeat>
        </ol>
        </false></check>
        <h3><check if="{{@categorieid == 3 }}"><true>Fotoreportage</true><false>Galerij</false></check> </h3>
        <p id="galerijcontent"><check if="{{@categorieid == 3 }}"><true>Klik op de foto om naar de fotoreportage te gaan</true><false>Tik op de foto om alle foto's van {{@titel| decodehtml}} te bekijken in de fotoviewer</false></check></p>
        <div id="galerij" class="galerij">
            <figure id="mobgal">
                <img id="mobgalimg" src={{@firstimage}} itemprop="thumbnail" alt="{{@beschrijving| decodehtml}}" >
            </figure>
        </div>
        


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
<script src='../ui/js/avontuur.js'></script>
<script src='../ui/js/photoswipe.min.js'></script>
<script src='../ui/js/photoswipe-ui-default.min.js'></script>
<check if="{{@categorieid == 3 }}"><true> 
    <script src="../picz/{{@categorie}}/{{@map}}/longlatarray.js"></script>
    <script src="../ui/js/reportage.js"></script>
    </true>
    <false>
    <script  src="../ui/js/galery.js"></script>
    <script type="application/ld+json">
        <include href="{{@jsonld}}"/>
</script>
    </false> 
</check>
`


var viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
var menuActief = true, shareActief = true, contactActief, scrollActief;

function showMenu() {
	var menu = document.getElementById("menu");
	var menuitems = menu.getElementsByTagName("a");
	for (var i = 0; i < menuitems.length; i += 1) {
		var element = menuitems[i];
		element.style.display = "block"
	}
	menu.style.width = "116px";
	menu.style.height = "230px";
	window.setTimeout(setMenuActief, 1000)
}

function setMenuActief() {
	menuActief = true
}

function hideMenu() {
	if (menuActief) {
		var menu = document.getElementById("menu");
		var menuitems = menu.getElementsByTagName("a");
		for (var i = 0; i < menuitems.length; i += 1) {
			var element = menuitems[i];
			element.style.display = "none"
		}
		menu.style.width = "44px";
		menu.style.height = "44px";
		menuActief = false
	}
}

function showShare() {
	var share = document.getElementById("sharepanel");
	var shareitems = share.getElementsByTagName("a");
	for (var i = 0; i < shareitems.length; i += 1) {
		var element = shareitems[i];
		element.style.display = "block"
	}
	share.style.width = "116px";
	share.style.height = "91px";
	window.setTimeout(setShareActief, 1000)
}

function setShareActief() {
	shareActief = true
}

function hideShare() {
	if (shareActief) {
		var share = document.getElementById("sharepanel");
		var shareitems = share.getElementsByTagName("a");
		for (var i = 0; i < shareitems.length; i += 1) {
			var element = shareitems[i];
			element.style.display = "none"
		}
		share.style.width = "44px";
		share.style.height = "44px";
		shareActief = false
	}
}

function showContact() {
	var cp = document.getElementById("contactpanel");
	cp.style.display = "block";
	window.setTimeout(setContactActief, 1000)
}

function setContactActief() {
	contactActief = "true"
}

function hideContact() {
	if (contactActief === "true") {
		var cp = document.getElementById("contactpanel");
		cp.style.display = "none";
		contactActief = "false"
	}
}

function showScroll() {
	var bt = document.getElementById("back-to-top");
	bt.style.display = "inline";
	window.setTimeout(setScrollActief, 1000)
}

function setScrollActief() {
	scrollActief = "true"
}

function hideScroll() {
	if (scrollActief === "true") {
		var bt = document.getElementById("back-to-top");
		bt.style.display = "none";
		scrollActief = "false"
	}
}

function laadGalerij(src) {
	var galery = document.getElementById("galerij");
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (this.readyState === 4 && this.status === 200) {
			galery.innerHTML = xhttp.responseText
		}
	};
	xhttp.open("GET", src, true);
	xhttp.setRequestHeader("Content-type", "text/html");
	xhttp.send()
}

function setShare() {
	var uri = location.href;
	var urienc = encodeURIComponent(uri);
	var fburi = "https://www.facebook.com/sharer/sharer.php?u=" + urienc;
	var wauri = "whatsapp://send?text=" + urienc;
	var fbElem = document.getElementById('sharefb');
	var waElem = document.getElementById('sharewa');
	fbElem.href = fburi;
	waElem.href = wauri;
	try {
		if (typeof _paq !== 'undefined') {
			waElem.addEventListener("click", _paq.push(['trackEvent', 'SocialMedia', 'Share', 'WhatsApp']));
			fbElem.addEventListener("click", _paq.push(['trackEvent', 'SocialMedia', 'Share', 'Facebook']))
		}
	} catch (error) {
		console.error("Your browser is blocking analytics")
	}
}

(function () {
	if (viewportWidth <= 755) {
		document.addEventListener('DOMContentLoaded', initMobiel)
	}
	;
	if (viewportWidth > 755) {
		document.addEventListener('DOMContentLoaded', initLarge)
	}
	;

	function initMobiel() {
		setShare();
		hideMenu();
		hideShare();
		hideContact();
		hideScroll();
		document.addEventListener("click", hideMenu);
		document.addEventListener("click", hideContact);
		document.addEventListener("click", hideShare);
		document.getElementById("menu").addEventListener("click", showMenu);
		document.getElementById("sharepanel").addEventListener("click", showShare);
		document.getElementById("contact").addEventListener("click", showContact);
		window.onscroll = function (ev) {
			var pvopen = false;
			if (window.scrollY >= 200) {
				showScroll()
			} else {
				hideScroll()
			}
		}
	};

	function initLarge() {
		setShare();
		hideMenu();
		hideShare();
		hideContact();
		hideScroll();
		document.addEventListener("click", hideMenu);
		document.addEventListener("click", hideShare);
		document.addEventListener("click", hideContact);
		document.getElementById("menu").addEventListener("click", showMenu);
		document.getElementById("sharepanel").addEventListener("click", showShare);
		document.getElementById("contact").addEventListener("click", showContact);
		window.onscroll = function (ev) {
			if (window.scrollY >= 250) {
				showScroll()
			} else {
				hideScroll()
			}
		};
		document.getElementById("mobgal").style.display = "none";
		var src = document.getElementById("mobgalimg").src;
		var asrc = src.split("/");
		var nsrc = "";
		for (let i = 0; i < asrc.length - 1; i += 1) {
			if (asrc[i] === "") {
				nsrc = nsrc + "//"
			} else {
				nsrc = nsrc + asrc[i] + "/"
			}
		}
		nsrc = nsrc + 'NL_foto.phtml';
		laadGalerij(nsrc)
	}
})();