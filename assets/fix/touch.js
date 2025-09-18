export const isTouchDevice = () => {

	if (!("ontouchstart" in document.documentElement)) {
		document.documentElement.classList.add("no-touch");
	}

	return ("ontouchstart" in document.documentElement);
}