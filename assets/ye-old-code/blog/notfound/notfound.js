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
	
	setNotFound(translator);
}

function setNotFound(translator) {
	const errorTitle = translator.translate("errors.404.title");
	const errorDescription = translator.translate("errors.404.content");
	document.title = "404 " + errorTitle + " - Xerbutri Urban Exploring";
	document.querySelector('meta[name="description"]').setAttribute("content", "This Xerbutri blog was not found");
	document.querySelector(".blog__title").innerHTML = `<h1>${errorTitle}</h1>`;
	// intro
	document.querySelector(".blog__intro").innerHTML = `<p>${errorDescription}</p>`;
}

export default handleNotFound;