//For Mobile

//before loading build a skeleton with tekst
var viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

var menuActief=true, contactActief, privacyActief, scrollActief, ladenKlaar=false, filterActive = {brug:false, gebouw:false, spoor:false, tunnel:false};

function setDisplayFilter(className, display){
    var x = document.getElementsByClassName(className);		
    var i;
    for(i=0; i< x.length; i++){
  	x[i].style.display = display;
    };	
}

function showMenu(){
    var menu = document.getElementById("menu");
    var menuitems = menu.getElementsByTagName("a");
    for (var i = 0; i < menuitems.length; i++) {
        var element = menuitems[i];
        element.style.display = "block";
    }
    menu.style.width = "100px";
    menu.style.height = "276px";
    window.setTimeout(setMenuActief,1000);
    document.getElementsByClassName('filteren')[0].style.display='none';
}

function setMenuActief(){
    menuActief = true;
}

function hideMenu(){
    if (menuActief) {    
        var menu = document.getElementById("menu");
        var menuitems = menu.getElementsByTagName("a");

        for (var i = 0; i < menuitems.length; i++) {
            var element = menuitems[i];
            element.style.display = "none";
        }

        menu.style.width = "44px";
        menu.style.height = "44px";

        if(document.getElementsByClassName('filteren')[0]){
        document.getElementsByClassName('filteren')[0].style.display='inline-block';
        }
        menuActief = false;
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

function showContact(){
    var cp = document.getElementById("contactpanel");
    cp.style.display = "block";
    window.setTimeout(setContactActief,1000);
}

function setContactActief(){
    contactActief = "true";
}

function hideContact(){
    if (contactActief==="true") {    
        var cp = document.getElementById("contactpanel");
        cp.style.display = "none";
        contactActief = "false";
    }
}

function showPrivacy(){
    var pp = document.getElementById("privacypanel");
    pp.style.display = "block";
    window.setTimeout(setPrivacyActief,1000);
}

function setPrivacyActief(){
    privacyActief = "true";
}

function hidePrivacy(){
    if (privacyActief==="true") {    
        var pp = document.getElementById("privacypanel");
        pp.style.display = "none";
        privacyActief = "false";
    }
}

function showScroll(){
    var bt = document.getElementById("back-to-top");
    bt.style.display = "inline";
    window.setTimeout(setScrollActief,1000);
}

function setScrollActief(){
    scrollActief = "true";
}

function hideScroll(){
    if (scrollActief==="true") {    
        var bt = document.getElementById("back-to-top");
        bt.style.display = "none";
        scrollActief = "false";
    }
}

var lastid=1;

(function(){//geef een naam in de toekomst, en roep aan als window.onresize en voer uit als domcontentisloaded
    if(viewportWidth <=755){document.addEventListener('DOMContentLoaded', initMobiel);};//Als de pagina geladen is, roep init aan
	if(viewportWidth >755){document.addEventListener('DOMContentLoaded', initLarge);};
        
    function initMobiel(){   
        hidePrivacy();
        hideContact();
        hideScroll();
        document.addEventListener("click", hideMenu);
        document.addEventListener("click", hidePrivacy);
        document.addEventListener("click", hideContact);
        document.getElementById("menu").addEventListener("click", showMenu);
        document.getElementById("contact").addEventListener("click", showContact);
       document.getElementById("privacy").addEventListener("click", showPrivacy);
        //var lastid= parseInt(document.getElementById('oc').lastChild.getAttribute("data-num"));
        var maxid = parseInt(document.getElementById('maxid').value);
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
        hidePrivacy();
        hideContact();
        hideScroll();
        document.addEventListener("click", hidePrivacy);
        document.addEventListener("click", hideContact);
        document.getElementById("contact").addEventListener("click", showContact);
        document.getElementById("privacy").addEventListener("click", showPrivacy);
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
            var totalHeight = window.innerHeight + window.scrollY;
            if (totalHeight >= 0.9*document.body.offsetHeight) {
                var icons = 8;
                var nextlastid = lastid+icons;
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
        var indexFilter = document.createElement("script");
        indexFilter.type = "text/javascript";
        indexFilter.src = "assets/js/indexFilter.js";
        document.body.appendChild(indexFilter);
    }

})();
