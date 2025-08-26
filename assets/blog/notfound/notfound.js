function handleNotFound(translator, jsonHelper, routeId) {

	jsonHelper.fetchAlternativeRoutes().then((routes) => {
		if (routes[routeId] !== undefined) {
			routeId = routes[routeId];
			history.pushState({page: 1}, "", "/avontuur/" + routeId)
			window.location.reload();
			return;
		}
		
		setNotFound(translator);
	}).catch((error) => {
		console.error(`An error occured in getting the alternative routes: ${error}`);
		setNotFound(translator)
	})
	console.log("Hit this 404 page for routeId " + routeId);
	setNotFound(translator);
}

function setNotFound(translator) {
	const errorTitle = translator.translate("errors.404.title");
	const errorDescription = translator.translate("errors.404.content");
	document.title = "404 " + errorTitle + " - Xerbutri Urban Exploring";
	document.querySelector('meta[name="description"]').setAttribute("content", "This Xerbutri blog was not found");
	document.getElementById("article-title").innerHTML = `<h1>${errorTitle}</h1>`;
	// intro
	document.getElementById("article-intro").innerHTML = `<p>${errorDescription}</p>`;
}

export default handleNotFound;