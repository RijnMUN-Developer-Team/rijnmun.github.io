// if the inspect element is opened, then redirect 
if ((window.outerHeight - window.innerHeight) > 150 || (window.outerWidth - window.innerWidth) > 100) {
    window.location.replace("/");
}

window.onresize = function () {
    if ((window.outerHeight - window.innerHeight) > 100 || (window.outerWidth - window.innerWidth) > 20) {
        window.location.replace("/");
    }
}