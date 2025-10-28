import "./style.css"
import {domLoaded} from "./assets/program.js";
import {inject} from "@vercel/analytics";
import {initLanguage} from "./assets/language.js";
import {initialPageLoad} from "./assets/navigator.js";

inject();
console.time("index");
console.time("index-loaded");
initLanguage();

(function () {
	initialPageLoad();
	document.addEventListener("DOMContentLoaded", domLoaded);
	
})();