let stateContext = function () {
	let currentState = new homeState(this);

	this.transitionTo = function (state) {
		currentState = state;
		currentState.enterState();
	}

	this.navigate = function () {
		currentState.navigate();
	}

	this.initState = function () {
		let path = window.location.pathname;
		console.log("Path: ", path);
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
		console.log("Entering home state");
		//initHome();
	}
	this.navigate = function () {
		let path = window.location.pathname;
		console.log("Path: ", path);
		if (path.length === 0 || path.startsWith("/vijf")) {
			// do nothing, I am already @home TODO redirect (sorta) to home by pushing empty path to history
			return;
		}
		if (path.startsWith("/avontuur")) {
			this.context.transitionTo(new blogState(this.context));
			return;
		}
		if (path.startsWith("/map")) {
			this.context.transitionTo(new mapState(this.context));
		}
	}
}

let blogState = function (context) {
	this.context = context;
	this.enterState = function () {
		console.log("Entering blog state");
		window.location.assign("/avontuur/");
		//initBlog();
	}
	this.navigate = function () {
		let path = window.location.pathname;
		console.log("Path: ", path);
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
	}
}

let mapState = function (context) {
	this.context = context;
	this.enterState = function () {
		console.log("Entering map state");
	}
	this.navigate = function () {
		let path = window.location.pathname;
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
	}
}

export {stateContext, homeState, blogState, mapState};