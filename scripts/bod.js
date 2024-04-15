// if the inspect element is opened, then redirect 
if ((window.outerHeight - window.innerHeight) > 150 || (window.outerWidth - window.innerWidth) > 100) {
    if (!csp_user()) {
        window.location.replace("/");
    }
}

window.onresize = function () {
    if ((window.outerHeight - window.innerHeight) > 100 || (window.outerWidth - window.innerWidth) > 20) {
        if (!csp_user()) {
            window.location.replace("/");
        }
    }
}

import { csp } from "./csp.js"
function csp_user() {
    if (localStorage.getItem(csp[0]) == csp[1]) {
        return true
    } else {
        return false
    }
}