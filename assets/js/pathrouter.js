import {initHome} from "./home.js";
import {initBlog} from "./blog.js";
import {initMap} from "./map.js";
import {initCms} from "./cms.js";

let stateContext = function () {
	let currentState = new homeState(this);

	this.transitionTo = function (state) {
		currentState = state;
		currentState.enterState();
	}

	this.navigate = function (path) {
		
		if(!path)
			path = window.location.pathname.toLowerCase();
		
		const previousUrl = sessionStorage.currentUrl;
		
		if (previousUrl && previousUrl !== path)
			sessionStorage.previousUrl = previousUrl;
		
		sessionStorage.currentUrl = path.toLowerCase();
		
		currentState.navigate(path);
	}

	this.initState = function () {
		const path = window.location.pathname.toLowerCase();
		if (path.startsWith("/cms")) {
			this.transitionTo(new cmsState(this.context));
			return;
		}
		if (path.startsWith("/map")) {
			this.transitionTo(new mapState(this.context));
			return;
		}
		if (path.startsWith("/avontuur")) {
			this.transitionTo(new blogState(this.context));
			return;
		}
		this.transitionTo(new homeState(this));
	}
}

let homeState = function (context) {
	this.context = context;
	this.enterState = function () {
		initHome();
	}
	this.navigate = function (path) {
		console.log("home navigating to " + path);
		if (path.length === 0 || path.startsWith("/vijf")) {
			// do nothing, I am already @home
			return;
		}
		if (path.startsWith("/avontuur")) {
			this.context.transitionTo(new blogState(this.context));
			return;
		}
		if (path.startsWith("/map")) {
			this.context.transitionTo(new mapState(this.context));
		}
		if (path.startsWith("/cms")) {
			this.context.transitionTo(new cmsState(this.context));
		}
	}
}

let blogState = function (context) {
	this.context = context;
	this.enterState = function () {
		console.log("init blog");
		initBlog();
	}
	this.navigate = function (path) {
		if (path.length === 0 || path.startsWith("/vijf")) {
			this.context.transitionTo(new homeState(this.context));
			return;
		}
		if (path.startsWith("/map")) {
			this.context.transitionTo(new mapState(this.context));
			return;
		}
		if (path.startsWith("/avontuur")) {
			this.context.transitionTo(new blogState(this.context));
		}
		if (path.startsWith("/cms")) {
			this.context.transitionTo(new cmsState(this.context));
		}
	}
}

let mapState = function (context) {
	this.context = context;
	this.enterState = function () {
		initMap();
	}
	this.navigate = function (path) {
		if (path.length === 0 || path.startsWith("/vijf")) {
			this.context.transitionTo(new homeState(this.context));
			return;
		}
		if (path.startsWith("/map")) {
			// do nothing, I am already @map
			return;
		}
		if (path.startsWith("/avontuur")) {
			this.context.transitionTo(new blogState(this.context));
		}
		if (path.startsWith("/cms")) {
			this.context.transitionTo(new cmsState(this.context));
		}
	}
}

let cmsState = function (context) {
	this.context = context;
	this.enterState = function () {
		initCms();
	}
	this.navigate = function (path) {
		if (path.length === 0 || path.startsWith("/vijf")) {
			this.context.transitionTo(new homeState(this.context));
			return;
		}
		if (path.startsWith("/map")) {
			this.context.transitionTo(new mapState(this.context));
			return;
		}
		if (path.startsWith("/avontuur")) {
			this.context.transitionTo(new blogState(this.context));
		}
		if (path.startsWith("/cms")) {
			// do nothing, I am already @cms
		}
	}
}

export {stateContext};