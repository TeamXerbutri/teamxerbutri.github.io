const ApiBasePath = "http://localhost:5174/api";
const ImageBasePath = "http://localhost:5174/api";
export const versionBasePath = () =>{
	const basePath = window.location.origin ? window.location.origin + '/' : window.location.protocol + '/' + window.location.host + '/';
	return basePath + "data";
} 
export const DefaultLanguage = "nl";
export const SupportedLanguages = ["nl", "en", "fr"];

export const Version = "7.0.0";

const basePath = () => {
	return "";
}

export const apiBasePath = () => {
	return basePath() + ApiBasePath;
}
export const imageBasePath = () => {
	return basePath() + ImageBasePath;
}