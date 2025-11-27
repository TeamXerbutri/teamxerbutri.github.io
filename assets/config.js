// Use Vite environment variables when available, otherwise fall back to localhost defaults
const ApiBasePath = import.meta && import.meta.env && import.meta.env.VITE_API_BASE_PATH
	? import.meta.env.VITE_API_BASE_PATH
	: "https://teamxerbutri.github.io/teamxerbutri.api/api";
const ImageBasePath = import.meta && import.meta.env && import.meta.env.VITE_IMAGE_BASE_PATH
	? import.meta.env.VITE_IMAGE_BASE_PATH
	: ApiBasePath;
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