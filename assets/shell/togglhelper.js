export const hideItems = (key, type) => {
	let items = document.querySelectorAll(key);
	items.forEach((item) => {
		item.classList.add("hide");
		item.classList.remove(type);
	});
}

export const showItems = (key, type) => {
	let items = document.querySelectorAll(key);
	items.forEach((item) => {
		item.classList.add(type);
		item.classList.remove("hide");
	});
}