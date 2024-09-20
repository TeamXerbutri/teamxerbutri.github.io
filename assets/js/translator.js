"use strict"

class Translator {
	loaded = false;

	constructor(options = {}) {
		this._options = Object.assign({}, this.defaultConfig, options);
		this._lang = this.getLanguage();
		this._basePath = this.getBasePath();
	}

	getBasePath() {
		let pathPrefix = "";
		if (document.location.pathname.startsWith("/avontuur")) {
			pathPrefix = "../../";
		}
		return `${pathPrefix}data/`;
	}


	translate(key) {
		const text = key.split('.').reduce((obj, i) => obj[i], this._translations);
		return text || key;
	}

	translateData(translations) {
		function replace(element) {
			const text = element.dataset.i18n.split('.').reduce((obj, i) => obj[i], translations);

			if (!text)
				return;


			if (element.tagName === "BUTTON") {
				element.title = text;
				return;
			}

			if (element.tagName === "A") {
				
				if (!element.dataset.i18n.endsWith("link")) {
					element.title = text;
					return;
				}
				
				// if a dataset ends with link, it has link text and title
								
				const title = element.dataset.i18n.split('.')[0].concat(".title").split('.').reduce((obj, i) => obj[i], translations);
				if (title) {
					element.title = title;
				}
			}
			
			element.innerHTML = text;
		}

		this._elements.forEach(replace);
	}
	
	translateIndex(translations) {
		const elements = document.querySelectorAll("[data-i18nix]");
		function replace(element) {
			const text = element.dataset.i18nix.split('.').reduce((obj, i) => obj[i], translations);

			if (text) {

				element.innerHTML = text;

			}
		}
		elements.forEach(replace);
	}
	

	setLanguage(lang) {

		if (lang) {
			this._lang = lang;
		}

		this.load().then(() => {
			this.addMenuOptions();
		}).catch((error) => {
			console.error(`An error occured in loading the translations: ${error}`)
		});
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

		const path = `${this._basePath}${this._lang}.json`;

		return fetch(path)
			.then((response) => response.json())
			.then((translations) => {
				this._translations = translations;
				this.setLanguageTag();
				this._elements = document.querySelectorAll("[data-i18n]");
				this.translateData(translations);
				if (this._options.persist) {
					localStorage.setItem("language", this._lang);
				}
				if (window.location.pathname.length === 0 || window.location.pathname.startsWith("/vijf")|| window.location.pathname === "/") {
					this.fetchBlogData().then((data) => {
					this.translateIndex(data)});
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
		let existingMenuItem = document.getElementById(`lang-${lang}`);
		
		// remove existing menu item
		if(lang === this._lang) {
			if(existingMenuItem) {
				menu.removeChild(existingMenuItem);
			}
			return;
		}
		
		if(existingMenuItem) {
			return;
		}
		
		const menuItem = document.createElement("a");
		menuItem.id = `lang-${lang}`;
		menuItem.innerText = lang.toUpperCase();
		menuItem.href = "/";
		menuItem.addEventListener("click", () => {
			this.setLanguage(lang)
		});
				
		menu.appendChild(menuItem);
	}

	addMenuOptions() {
		this._options.languages.forEach((lang) => {
			this.addMenuOption(lang);
		});
	}

	localDate(day, month, year) {
		const monthFull = this.translate(`month.${month}`)
		if (this._lang === "en") {
			return `${monthFull} ${day} ${year}`;
		}
		return `${day} ${monthFull} ${year}`;
	}

	fetchBlogLanguageContent(category, route) {
		const path = this._basePath.concat(category, "/", route, "/blog.", this._lang, ".json");
		return fetch(path).then((response) => response.json());
	}
	fetchBlogCaptions(category, route) {
		const path = this._basePath.concat(category, "/", route, "/captions.", this._lang, ".json");
		return fetch(path).then((response) => response.json());
	}
	
	//TODO does not need to be in translator
	fetchBlogData() {
		const path = this._basePath.concat("blogs.", this._lang, ".json");
		return fetch(path).then((response) => response.json());
	}

	//TODO does not need to be in translator
	fetchHomeData() {
		return fetch(this._basePath.concat("index.", this._lang, ".json")).then((response) => response.json());
	}
	
	//TODO does not need to be in translator
	getBlogDataById(id) {
		const blogs = this.fetchBlogData();
		return blogs.then((data) => {
			return data[id]
		});
	}

	//TODO does not need to be in translator
	fetchBlogFacts(category, route) {
		const path = this._basePath.concat(category, "/", route, "/blog.json");
		return fetch(path).then((response) => response.json());
	}
	
	
	fetchBlogJsonLd(category, route) {
		const path = this._basePath.concat(category, "/", route, "/",route,".",this._lang,".jsonld");
		return fetch(path).then((response) => response.json());
	}
	
	//TODO does not need to be in translator
	fetchBlogImages(category, route) {
		const path = this._basePath.concat(category, "/", route, "/images.json");
		return fetch(path).then((response) => response.json());
	}
	
	get defaultConfig() {
		return {
			persist: true,
			languages: ["nl", "en", "fr"],
			defaultLanguage: "nl",
		};
	}
}

export default Translator;
	