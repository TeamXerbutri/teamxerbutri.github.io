import {initHome} from "../index/home.js";
import {initBlog} from "../blog/blog.js";
import {initMap} from "../map/map.js";
import {initCms} from "./cms.js";

let stateContext = function () {
	let currentState = new homeState(this);
	this.currentRoute = "init";

	this.transitionTo = function (state) {
		currentState = state;
		currentState.enterState();
	}

	this.navigateTo = function (route) {
		if(route === this.currentRoute) 
			return;
		
		this.currentRoute = route;
		if (route.startsWith("cms")) {
			this.transitionTo(new cmsState(this.context));
			return;
		}
		if (route.startsWith("map")) {
			this.transitionTo(new mapState(this.context));
			return;
		}
		if (route.startsWith("avontuur")) {
			this.transitionTo(new blogState(this.context));
			return;
		}
		if (route.startsWith("home")) {
			this.transitionTo(new homeState(this.context));
			return;
		}
		this.transitionTo(new homeState(this));
		
	}

	this.initState = function (route) {
		this.navigateTo(route);
	}
}

let homeState = function (context) {
	this.context = context;
	this.enterState = function () {
		initHome(this.context);
	}
	
	// this.navigateTo = function (route) { this.navigateTo(route); }
}

let blogState = function (context) {
	this.context = context;
	this.enterState = function () {
		initBlog(context);
	}
}

let mapState = function (context) {
	this.context = context;
	this.enterState = function () {
		initMap();
	}
}

let cmsState = function (context) {
	this.context = context;
	this.enterState = function () {
		initCms();
	}
}

export {stateContext, homeState, blogState, mapState, cmsState};