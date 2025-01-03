class JsonHelper{

	constructor(options = {}) {
		this._basePath = this.getBasePath();
	}

	// TODO: code multiplication from Translator
	getBasePath() {
		let pathPrefix = "";
		if (document.location.pathname.toLowerCase().startsWith("/avontuur")) {
			pathPrefix = "../../";
		}
		return `${pathPrefix}data/`;
	}
	
	fetchBlogFacts(category, route) {
		const path = this._basePath.concat(category, "/", route, "/blog.json");
		return fetch(path).then((response) => response.json());
	}

	fetchBlogImages(category, route) {
		const path = this._basePath.concat(category, "/", route, "/images.json");
		return fetch(path).then((response) => response.json());
	}

	fetchBlogPhotos(category, route) {
		const path = this._basePath.concat(category, "/", route, "/photos.json");
		return fetch(path).then((response) => response.json());
	}
}

export default JsonHelper;