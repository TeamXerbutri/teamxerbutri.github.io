let isTouch = false;

export const isTouchDevice = () => {
	return isTouch;
}

export const initTouchFix = () => {
	if (!("ontouchstart" in document.documentElement)) {
		document.documentElement.classList.add("no-touch");
	}

	isTouch = ("ontouchstart" in document.documentElement);
}