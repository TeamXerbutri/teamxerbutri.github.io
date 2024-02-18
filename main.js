import './style.css'
import txLogo from './assets/images/tx.gif'
import {showContactModal, hideContactModal, showPrivacyModal, hidePrivacyModal, showBackToTop, hideBackToTop, showMenu, hideMenu} from './assets/js/header.js'
import {stateContext} from "./assets/js/statemachine";


let appState = {};
appState.language = "nl";
// TODO: get language from browser like:
let futureLanguage = navigator.language;


const route = (event) => {
    event = event || window.event; // get window.event if event argument not provided
    event.preventDefault();
    // window.history.pushState(state, unused, target link);
    window.history.pushState({}, "", event.target.href);
    stateContext.navigate();
};

(function(){
    document.addEventListener('DOMContentLoaded', init);

    function init() {
        // load image
        document.getElementById("tx").src = `${txLogo}`;
        
        // set events
        hidePrivacyModal();
        hideContactModal();
        hideBackToTop();
        document.addEventListener("click", hideMenu);
        document.addEventListener("click", hidePrivacyModal);
        document.addEventListener("click", hideContactModal);
        document.getElementById("menu").addEventListener("click", showMenu);
        document.getElementById("contact").addEventListener("click", showContactModal);
        document.getElementById("privacy").addEventListener("click", showPrivacyModal);
        stateContext.init();
        //ToDo I am not sure what to do with route const
    }})();