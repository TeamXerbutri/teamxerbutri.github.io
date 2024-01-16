import './style.css'
import {createBlogObject} from "./components/objectFactory"

document.querySelector('#app').innerHTML =`<main>
<header>
	<img class="TX" src="assets/images/TX.gif" alt="Team Xerbutri Logo">
	<h1 class="logo">Team Xerbutri</h1>
	
	<div class="menu" id="menu">
		<!--<a href="map" title="Team Xerbutri Maps"> Maps</a>
		<a href="avontuur/TXATX" title="Over Team Xerbutri urban exploring"> Over TX</a>
		<a href="avontuur/TXAUE" title="Over Urban exploring">Over UE</a>-->
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
		<object-card category="xerbutri" abbreviation="map" shortname="Alle locaties op kaart" realname="Toon op kaart" description="Toon alle locaties op kaart"></object-card>
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

let uiState = {};
uiState.hasMenu = true;
uiState.hasContactModal = false;
uiState.hasPrivacyModal = false;
uiState.hasBackToTop = false;
uiState.hasFilter = {brug:false, gebouw:false, spoor:false, tunnel:false};
let appState = {};
appState.language = "nl";

let getObjects = fetch("../../data/index.".concat(appState.language, ".json")).then((response) => response.json());

// UI state Business logic for filtering
function setDisplayFilter(className, display){
    let categories = document.getElementsByClassName(className);		
    let i;
    
    for(i=0; i< categories.length; i++){
        categories[i].style.display = display;
    }	
}

// why is showMenu so complicated?
function showMenu(){
    let menu = document.getElementById("menu");
    let menuitems = menu.getElementsByTagName("a");
    
    for (let i = 0; i < menuitems.length; i++) {
        let element = menuitems[i];
        element.style.display = "block";
    }
    
    menu.style.width = "100px";
    menu.style.height = "276px";
    // Why did I have this again?
    window.setTimeout(setHasMenuTrue , 1000);
    document.getElementsByClassName('filteren')[0].style.display='none';
}

function setHasMenuTrue(){
    uiState.hasMenu = true;
}

function hideMenu(){
    if (uiState.hasMenu) {    
        let menu = document.getElementById("menu");
        let menuitems = menu.getElementsByTagName("a");

        for (let i = 0; i < menuitems.length; i++) {
            let element = menuitems[i];
            element.style.display = "none";
        }

        menu.style.width = "44px";
        menu.style.height = "44px";

        if(document.getElementsByClassName('filteren')[0]){
        document.getElementsByClassName('filteren')[0].style.display='inline-block';
        }
        uiState.hasMenu = false;
    }
}

function laadMeer(lastid, number, small){
    // var xhttp = new XMLHttpRequest();
    // xhttp.onreadystatechange = function() {
    //     if (this.readyState === 4 && this.status === 200) {
    //         //var response = this.responseText;
    //         //var d = document.getElementById('ld');
    //         //d.parentNode.removeChild(d);
    //         var e = document.getElementById('oc');
    //         e.insertAdjacentHTML('beforeend', this.responseText);
    //         ladenKlaar=true;
    //         if(!filterActive.brug&&!filterActive.gebouw&&!filterActive.spoor&&!filterActive.tunnel){
    //             //nothing
    //         }
    //         else{
    //             if(filterActive.brug){
    //                 setDisplayFilter('brugt', 'none');
    //             }
    //             if(filterActive.gebouw){
    //                 setDisplayFilter('gebouwt', 'none');
    //             }
    //             if(filterActive.spoor){
    //                 setDisplayFilter('spoort', 'none');
    //             }
    //             if(filterActive.tunnel){
    //                 setDisplayFilter('tunnelt', 'none');
    //             }
    //         }
    //         }   
    //     };
    //     var lastidx=encodeURIComponent(lastid);
    //     var numberx = encodeURIComponent(number);
    //     var smallx = encodeURIComponent(small);
    //     var params="params="+lastidx+","+numberx+","+smallx;
    //     xhttp.open("POST", "getmoreicons", true);
    //     xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    //     xhttp.send(params);
}

function showContactModal(){
    let cp = document.getElementById("contactpanel");
    cp.style.display = "block";
    window.setTimeout(setContactModalTrue,1000);
}

function setContactModalTrue(){
    uiState.hasContactModal = true;
}

function hideContactModal(){
    if (uiState.hasContactModal) {    
        let cp = document.getElementById("contactpanel");
        cp.style.display = "none";
        uiState.hasContactModal = false;
    }
}

function showPrivacyModal(){
    let pp = document.getElementById("privacypanel");
    pp.style.display = "block";
    window.setTimeout(setHasPrivacyModalTrue,1000);
}

function setHasPrivacyModalTrue(){
    uiState.hasPrivacyModal = true;
}

function hidePrivacyModal(){
    if (uiState.hasPrivacyModal==="true") {    
        let pp = document.getElementById("privacypanel");
        pp.style.display = "none";
        uiState.hasPrivacyModal = "false";
    }
}

function showBackTotop(){
    let bt = document.getElementById("back-to-top");
    bt.style.display = "inline";
    window.setTimeout(setBacktoTopTrue,1000);
}

function setBacktoTopTrue(){
    uiState.hasBackToTop = true;
}

function hideBackTotop(){
    if (uiState.hasBackToTop) {    
        let bt = document.getElementById("back-to-top");
        bt.style.display = "none";
        uiState.hasBackToTop = false;
    }
}

function filterObjects(){
    if(filterActive.brug){
        setDisplayFilter('brug', 'none');
    }
    if(filterActive.gebouw){
        setDisplayFilter('gebouw', 'none');
    }
    if(filterActive.spoor){
        setDisplayFilter('spoor', 'none');
    }
    if(filterActive.tunnel){
        setDisplayFilter('tunnel', 'none');
    }
}

// What happens here? https://web.dev/articles/custom-elements-v1
function objectFactory(subjects){
    var objectContainer = document.getElementById('oc');
    for(let i in subjects){
        let displayObject = createBlogObject(subjects[i]);         
        objectContainer.appendChild(displayObject);
    }
}





//Obsolete
function getObjectsXhttp(){
    let request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            console.log(request);
            return JSON.parse(request.responseText);           
        }
    };
    const urlstring = "../../data/index.".concat(appState.language,".json")
    console.log(urlstring);
    request.open("GET", urlstring, false);
    request.send(null);
}





var lastid=1;


(function(){
    document.addEventListener('DOMContentLoaded', init);
    
    function init(){
        hidePrivacyModal();
        hideContactModal();
        hideBackTotop();
        document.addEventListener("click", hideMenu);
        document.addEventListener("click", hidePrivacyModal);
        document.addEventListener("click", hideContactModal);
        document.getElementById("menu").addEventListener("click", showMenu);
        document.getElementById("contact").addEventListener("click", showContactModal);
        document.getElementById("privacy").addEventListener("click", showPrivacyModal);

        //object factory

        // get the object container
        
        
        // fetch the objects
        getObjects.then(
            function(value) {objectFactory(value.subjects);},
            function (error) {errorHandler(error)},
        )
            
        if(viewportWidth <=755){ initMobiel}//Als de pagina geladen is, roep init aan
	    if(viewportWidth >755){ initLarge}
    }

    //ToDo window.onresize() -> doe een resizing en wijzig op basis van UIstate

    function initMobiel(){   
        //var lastid= parseInt(document.getElementById('oc').lastChild.getAttribute("data-num"));
        var maxid = parseInt(document.getElementById('maxid').value);
        //ToDo, load based on size! Do a height calculation
        laadMeer(lastid+1, 5, true);
        lastid = lastid+6;
        window.onscroll = function(ev) {
            if (lastid>=maxid){
             return;    
            }
            var totalHeight = window.innerHeight + window.scrollY;
            if (totalHeight >= 0.9*document.body.offsetHeight) {
                var icons = 8;
                var nextlastid = lastid+icons;
                if(maxid<=nextlastid){
                    icons = maxid-lastid;
                }
                laadMeer(lastid+1, icons, true);
                lastid = lastid+icons+1;
            }
            if (window.scrollY >= 200) {
                showScroll();
            }
            else{
                hideScroll();
            }
        };
        //load the filtering
        var indexFilter = document.createElement("script");
        indexFilter.type = "text/javascript";
        indexFilter.src = "assets/js/indexFilter.js";
        document.body.appendChild(indexFilter);
        hideMenu();
    }
        
	function initLarge(){
        //var lastid= parseInt(document.getElementById('oc').lastChild.getAttribute("data-num"));//==1, maar ook flexibel zo.
        var maxid = parseInt(document.getElementById('maxid').value);
        var h = Math.round(window.innerHeight/180)*4-4;//h is bekend.
        laadMeer(lastid+1, h, false);
        lastid = lastid+h+1;
        window.onscroll = function(ev) {
            //var lastid= parseInt(document.getElementById('oc').lastChild.getAttribute("data-num"));//hier gaat het mis bij snel scrollen.
            if (lastid>=maxid){
                return;    
            }
            let totalHeight = window.innerHeight + window.scrollY;
            if (totalHeight >= 0.9*document.body.offsetHeight) {
                let icons = 8;
                let nextlastid = lastid+icons;
                if(maxid<=nextlastid){
                    icons = maxid-lastid;
                }
                laadMeer(lastid+1, icons, false);
                lastid = lastid+icons+1;//set new lastid in js instead of fetching from page
            }
            if (window.scrollY >= 200) {
                showScroll();
            }
            else{
                hideScroll();
            }                
        };

        //load the filtering
        let indexFilter = document.createElement("script");
        indexFilter.type = "text/javascript";
        indexFilter.src = "assets/js/indexFilter.js";
        document.body.appendChild(indexFilter);
    }

})();
