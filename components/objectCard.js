const template = document.createElement('template');

template.innerHTML = `
<style>
    .tile:nth-child(-n+3){
        position: relative;
        overflow:hidden;
        display:block;
        height:200px;
        background-color:#181818;
        margin:2px
    }
    .tile:nth-child(-n+3) h2.te{
        display: block;
        position: absolute;
        top: 158px;
        left: 0px;
        font-size: 1.2em;
        line-height: initial;
        padding-left: 0px;
        width: 100%;
        background: #000000; /* For browsers that do not support gradients*/
        background: -webkit-linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.9)); /* For Safari 5.1 to 6.0*/ 
        background: -o-linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.9)); /* For Opera 11.1 to 12.0 */
        background: -moz-linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.9)); /* For Firefox 3.6 to 15 */
        background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.9)); /* Standard syntax */
        padding-top: 10px;
        padding-bottom: 10px;
    }
    .tile:nth-child(-n+3) h3.te{
        display: block;
        position: absolute;
        top: 113px;
        left: 0px;
        font-size: 1em;
        font-weight: normal;
        color: #c7c7c7;
        width: 100%;
        background: #000000; /* For browsers that do not support gradients*/
        background: -webkit-linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5)); /* For Safari 5.1 to 6.0*/ 
        background: -o-linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5)); /* For Opera 11.1 to 12.0 */
        background: -moz-linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5)); /* For Firefox 3.6 to 15 */
        background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5)); /* Standard syntax */
        padding-top: 10px;
        padding-bottom: 0px;
    }
    .tile:nth-child(-n+3) img.te{
        width: 100%;
    }
    /*rows*/
    h3.te{
        display: none;
    }
    h2.te{
	    display: inline-block;
	    padding-left: 10px;
	    font-size: 1.0em;
	    margin: 0px;
	    color: #CCCCCC;
	    vertical-align: middle;
	    line-height: 50px;
    }
    .tile{
    	display: block;
    	height: 50px;
    	margin-top: 5px;
        width: auto;
        margin-left: auto;
        margin-right: auto;
    }

    .spoor{
	    background-color: #000800;
    }
    .brug{
    	background-color: #000008;
    }
    .gebouw{
    	background-color: #080000;
    }
    .tunnel{
    	background-color:#080808;
    }
    .xerbutri{
    	background: #000000;
    }
	
    img.te{
    	vertical-align: middle;
    }

    a:hover, a:active{
    	background-color: #000000;
        color:#fff;
    }
    @media only screen and (min-width: 756px){
        .tile{
            overflow: hidden;
            display: inline-block;
            height:190px;
            width: 248px;
            background-color: #181818;
            margin: 2px;
        }
        img.te{
            transition: all .5s ease-in-out;
            height:190px;
            width: 248px;
        }
        a:hover img.te{
            transform: scale(1.05);
        }
        h2.te{
            display: block;
            position: relative;
            top: -107px;
            left: 0px;
            font-size: 1.2em;
            width: auto;
            background: #000000; /* For browsers that do not support gradients*/
            background: -webkit-linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.9)); /* For Safari 5.1 to 6.0*/ 
            background: -o-linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.9)); /* For Opera 11.1 to 12.0 */
            background: -moz-linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.9)); /* For Firefox 3.6 to 15 */
            background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.9)); /* Standard syntax */
            padding-top: 10px;
            padding-bottom: 10px;
        }
        h3.te{
            display: block;
            position: relative;
            top: -91px;
            left: 0px;
            font-size: 1em;
            font-weight: normal;
            color: #c7c7c7;
            width: auto;
            background: #000000; /* For browsers that do not support gradients*/
            background: -webkit-linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5)); /* For Safari 5.1 to 6.0*/ 
            background: -o-linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5)); /* For Opera 11.1 to 12.0 */
            background: -moz-linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5)); /* For Firefox 3.6 to 15 */
            background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5)); /* Standard syntax */
            padding-top: 10px;
            padding-bottom: 0px;
        }
        .tile{
            height:238px;
            width: 310px;
        }
    }
    /* Resolution 1366x768*/
    @media only screen and (min-width: 1350px){
        img.te{
            height:238px;
            width: 310px;
        }
        h2.te{
            top: -117px;
            font-size: 1.5em;
        }
        h3.te{
            display: block;
            position: relative;
            top: -97px;
            left: 0px;
            font-size: 1em;
        }
    }

</style>
<div class="tile">
    <a href="avontuur/">
        <img class="te" />    
        <h3 class="te"></h3>
        <h2 class="te"></h2>
    </a>
</div>
`; 

class ObjectCard extends HTMLElement {
    constructor() {
        super();
        
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        // 

        const category = this.getAttribute('category');
        const abbreviation = this.getAttribute('abbreviation');
        const realname = this.getAttribute('realname');

        // add the category to the tile as class for filtering
        this.shadowRoot.querySelector('div').classList.add(category);

        // add href and titleto anchor
        // href logic -> ToDo see if you can eliminate the need for this logic
        var link = "";
        if(abbreviation==="map"){
            link = "map";
        }
        else{
            link = "avontuur/".concat(abbreviation)
        }
        this.shadowRoot.querySelector('a').href = link;
        this.shadowRoot.querySelector('a').title = this.getAttribute('description');

        // img
        this.shadowRoot.querySelector('img').src = "data/".concat(category, "/", abbreviation, "/", abbreviation, ".jpg");
        this.shadowRoot.querySelector('img').alt = realname;
        this.shadowRoot.querySelector('img').id = abbreviation;
        
        // h3 logic
        var firstline = "";
        if(category==="xerbutri"){
            firstline = realname;
        }
        else{
            firstline = this.getCategoryName(category, 'nl')
        }
        this.shadowRoot.querySelector('h3').innerText = firstline;
        
        //h2
        this.shadowRoot.querySelector('h2').innerText = this.getAttribute('shortname');;

    }

    getCategoryName(category, language){
        switch(language){
            case 'nl':
                categoryName = this.getCategoryNameNl(category);
                break;
            default:
                categoryName= "Not Found"
        }


    }

    getCategoryNameNl(category){
        switch(category){
            case 'gebouw':
                categoryName = "Verlaten Gebouwen";
                break;
            case 'spoor':
                categoryName = "Spoorlijnen";
                break;
            case 'tunnel':
                categoryName = "Tunnels";
                break;
            case 'brug':
                categoryName = "Bruggen";
                break;
            default:
                categoryName = "Not Found"
        }
    }





}

window.customElements.define('object-card', ObjectCard)