export class MapMenuControl{
	constructor(){
		this.hideMenu = true;
		const menuButton = document.createElement("span");
		menuButton.id = "menu-button";
		menuButton.innerText = "Menu";
		menuButton.addEventListener("click", this.toggleMenu);

		const menuContainer = document.createElement("div");
		menuContainer.id = "menu-container";
		menuContainer.innerHTML = `<a href="" title="Bezoek de nieuwste webpagina van Team Xerbutri, met alle recent bezochte locaties">Naar de index-pagina van TX5</a>`;
		
		this.menuContainer = menuContainer;
	}

	toggleMenu() {
		if (this.hideMenu) {
			this.menuContainer.style.display = "none";
			this.hideMenu = true;
		} else {
			this.menuContainer.style.display = "block";
			this.hideMenu = false;
		}
	}
	
}