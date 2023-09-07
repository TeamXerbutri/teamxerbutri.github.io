const template = document.createElement('template');

template.innerHTML = `

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