const ApiBasePath = "data";
const ImageBasePath = "data";

export const DefaultLanguage = "nl";
export const SupportedLanguages = ["nl", "en", "fr"];

export const Version = "7.0.0";

export const apiBasePath = () => {
	return basePath() + ApiBasePath;
}

const basePath = () => {
	return window.location.origin ? window.location.origin + '/' : window.location.protocol + '/' + window.location.host + '/';
}

export const imageBasePath = () => {
	return basePath() + ImageBasePath;
}