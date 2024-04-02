"use strict"

class Translator {
	loaded = false;
	constructor(options = {}) {
		this._options = Object.assign({}, this.defaultConfig, options);
		this._lang = this.getLanguage();		
	}

	translate(key) {
		const text = key.split('.').reduce((obj, i) => obj[i], this._translations);
		return text || key;
	}
	
	translateAll(translations){
		function replace(element) {
			const text = element.dataset.i18n.split('.').reduce((obj, i) => obj[i], translations);
						
			if (text) {
				if (element.tagName === "BUTTON") {
					element.title = text;
				} else {
					element.innerHTML = text;
				}
			}
			
			if(element.tagName === "A"){
				const title = element.dataset.i18n.split('.')[0].concat(".title").split('.').reduce((obj, i) => obj[i], translations);
				if(title) {
					element.title = title;
				}
			}
		}

		this._elements.forEach(replace);
	}
	
	setLanguage(lang) {
		
		if(lang){
			this._lang = lang;
		}
				
		this.load().then(()=>{
			this._options.languages.forEach((language) => {
				this.showMenuOption(language);
			});
			this.hideMenuOption(this._lang);
		}).catch((error) => {console.error(`An error occured in getting the translations: ${error}`)});
	}

	getLanguage() {
		const storedLanguage = localStorage.getItem("language");

		if (storedLanguage) {
			return storedLanguage;
		}

		const browserLanguage = navigator.languages ? navigator.languages[0] : navigator.language;

		// default fallback to nl
		if (!browserLanguage) {
			return this._options.defaultLanguage;
		}

		let lang = browserLanguage.substring(0, 2).toLowerCase();

		if (!this._options.languages.includes(lang)) {
			return this._options.defaultLanguage;
		}

		return lang;
	}

	load(lang = null) {
		if (lang) {
			if (!this._options.languages.includes(lang)) {
				this.loaded = false;
				return;
			}

			this._lang = lang;
		}
		
		let pathPrefix = "";
		if(document.location.pathname.startsWith("/avontuur")){
			pathPrefix = "../";
		}

		const path =`${pathPrefix}/data/${this._lang}.json`;

		return fetch(path)
			.then((response) => response.json())
			.then((translations) => {
				this._translations = translations;
				this.setLanguageTag();
				this._elements = document.querySelectorAll("[data-i18n]");
				this.translateAll(translations);
				if (this._options.persist) {
					localStorage.setItem("language", this._lang);
				}
				this.loaded = true;
			});
	}

	setLanguageTag() {
		if (document.documentElement.lang !== this._lang) {
			document.documentElement.lang = this._lang;
		}
	}

	addMenuOption(lang) {
		const menu = document.getElementById("menu");
		const menuItem = document.createElement("a");
		menuItem.id = `lang-${lang}`;
		menuItem.innerText = lang.toUpperCase();
		menuItem.addEventListener("click", ()=> {this.setLanguage(lang)});
		menu.appendChild(menuItem);
	}
	
	addMenuOptions() {
		this._options.languages.forEach((lang) => {
			this.addMenuOption(lang);
		});
		this.hideMenuOption(this._lang);
	}
	
	showMenuOption(lang) {
		const menuItem = document.getElementById(`lang-${lang}`);
		menuItem.style.removeProperty("display");
	}
	
	hideMenuOption(lang) {
		const menuItem = document.getElementById(`lang-${lang}`);
		menuItem.style.display = "none";
	}

	get defaultConfig() {
		return {
			persist: true,
			languages: ["nl", "en", "fr", "de"],
			defaultLanguage: "nl",
		};
	}
}

export default Translator;
	