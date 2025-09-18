let translations = {};

export const addTranslations = (newTranslations) => {
	translations = { ...translations, ...newTranslations };
}

export const translate = (key) => {
	const text = key.split('.').reduce((obj, i) => obj[i], translations);
	return text || key;
}