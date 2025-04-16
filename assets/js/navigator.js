function lastUrl(){
	if (sessionStorage.urlHistory) {
		let urls = JSON.parse(sessionStorage.urlHistory);

		if (urls.length > 1) {
			// remove last url from history
			urls.pop()
			// return the one before.
			let lastUrl = urls.pop();
			sessionStorage.urlHistory = JSON.stringify(urls);
			return lastUrl;
		} else {
			return "";
		}
	} else {
		return "";
	}
}



function initHistory(){
	
	if (!sessionStorage.urlHistory) {
		let urls = [];
		sessionStorage.urlHistory = JSON.stringify(urls);
	}
}

export { initHistory, lastUrl};