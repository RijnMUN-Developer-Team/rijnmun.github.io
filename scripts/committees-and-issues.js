function toggleResos(committee) {
    let cont = document.getElementById(`resos-${committee}`);
    let arrow = document.getElementById(`arrow-${committee}`);

    if (cont.style.display == "none") {
        // open the reso div

        cont.style.display = "block";
        cont.style.height = cont.scrollHeight + "px";
    } else {
        // close the reso div
        cont.style.height = 0;
        
        setTimeout(function() {
            cont.style.display = "none";
        }, 200, cont)
    }
}