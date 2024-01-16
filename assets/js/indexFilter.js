(function(){
  var readyStateCheckInterval = setInterval(function() {
   if (document.readyState === "complete") {
    clearInterval(readyStateCheckInterval);
	initFilter(); //Als de pagina geladen is, roep init aan
       	var displayString = "inline-block";
         if(viewportWidth <=755){
             displayString = "block";
         }
        
	function initFilter(){
            var spoorButton = document.createElement('button');
            spoorButton.innerHTML = 'V';
            spoorButton.title = 'verberg de spoorwegen';
            spoorButton.id = 'spoorFilter'; 
            spoorButton.addEventListener('click',spoorFilter);

            var brugButton = document.createElement('button');
            brugButton.title = 'verberg de bruggen';
            brugButton.innerHTML ='V';
            brugButton.id = 'brugFilter';
            brugButton.addEventListener('click',brugFilter);
        
            var tunnelButton = document.createElement('button');
	    tunnelButton.innerHTML = 'V';
            tunnelButton.title = 'verberg de tunnels';
            tunnelButton.id = 'tunnelFilter';
            tunnelButton.addEventListener('click',tunnelFilter);

            var gebouwButton = document.createElement('button');
            gebouwButton.innerHTML = 'V';
            gebouwButton.title = 'verberg de verlaten gebouwen';
            gebouwButton.id = 'gebouwFilter';
            gebouwButton.addEventListener('click',gebouwFilter);

            var filter = document.createElement('div');
            filter.className = 'filteren';
            filter.appendChild(brugButton);
            filter.appendChild(tunnelButton);
            filter.appendChild(spoorButton);
            filter.appendChild(gebouwButton);
            document.body.appendChild(filter);
       
		
	function brugFilter(){
  		if (filterActive.brug) {
                        setDisplayFilter("brugt", displayString);
                        setFilterStyle(brugButton, 'bruggen', filterActive.brug);
                        filterActive.brug = false;
  			}
  		else{
 			setDisplayFilter("brugt", 'none');
                        setFilterStyle(brugButton, 'bruggen', filterActive.brug);
                        filterActive.brug = true;
                        iconenLaden();
  			};
  		}
  	function tunnelFilter(){
  		if (filterActive.tunnel) {
  			setDisplayFilter("tunnelt", displayString);
                        setFilterStyle(tunnelButton, 'tunnels', filterActive.tunnel);
                        filterActive.tunnel= false;
  			}
  		else{
  			setDisplayFilter("tunnelt", 'none');
  			setFilterStyle(tunnelButton, 'tunnels', filterActive.tunnel);
                        filterActive.tunnel=true;
                        iconenLaden();
  			};
  		}
  	function gebouwFilter(){
  		if (filterActive.gebouw) {
  			setDisplayFilter("gebouwt", displayString);
                        setFilterStyle(gebouwButton, 'verlaten gebouwen', filterActive.gebouw);
                        filterActive.gebouw=false;
  			}
  		else{
  			setDisplayFilter("gebouwt", 'none');
  			setFilterStyle(gebouwButton, 'verlaten gebouwen', filterActive.gebouw);
                        filterActive.gebouw=true;
                        iconenLaden();
  			};
  		}
  	function spoorFilter(){
  		if (filterActive.spoor) {
  			setDisplayFilter("spoort", displayString);
                        setFilterStyle(spoorButton, 'spoorwegen', filterActive.spoor);
                        filterActive.spoor=false
  			}
  		else{
  			setDisplayFilter("spoort", 'none');
  			setFilterStyle(spoorButton, 'spoorwegen', filterActive.spoor);
                        filterActive.spoor=true;
                        iconenLaden();
  			};
  		}
  	function setFilterStyle(buttonName, categorieName, activeFilter){
            var vink = '&nbsp;';
            var titel = 'toon de '+categorieName;
            var stijl = "rgba(30,30,30,0.8)";
            if(activeFilter){
                vink = 'V';
                titel = 'verberg de '+categorieName;
                stijl = "rgba(30,30,30,0.2)";
            }
            buttonName.title = titel;
            buttonName.innerHTML = vink;
            buttonName.style.backgroundColor = stijl;
        }

        function iconenLaden(){
                    //var lastid= parseInt(document.getElementById('oc').lastChild.getAttribute("data-num"));
                    var maxid = parseInt(document.getElementById('maxid').value);
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
                        ladenKlaar=false;
                        laadMeer(lastid+1, icons, viewportWidth <=755);
                        var laadInterval = setInterval(function() {
                            if (ladenKlaar) {
                                clearInterval(laadInterval);
                                iconenLaden();}
                            }, 10);
                        lastid = lastid+icons+1;                       
                    }
                    else{
                        return;
                    }
                }
  		
};
    		}
		}, 10);
})();
