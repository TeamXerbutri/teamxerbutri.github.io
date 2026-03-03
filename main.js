import "./style.css"
import {inject} from "@vercel/analytics";
import {initLanguage} from "./assets/language.js";
import {initialPageLoad, initNavigator} from "./assets/navigator.js";
import {initTouchFix} from "./assets/fix/touch.js";

inject();

initNavigator();
initTouchFix();
initLanguage();
initialPageLoad();
