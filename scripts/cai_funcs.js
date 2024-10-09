function toggleResos(committee) {
    const cont = document.getElementById(`resos-${committee}`);
    const arrow = document.getElementById(`arrow-${committee}`);

    if (cont.style.display == "none") {
        // open the reso div
        arrow.style.transform = 'rotate(-90deg)';
        cont.style.display = "flex";
        cont.style.height = (cont.scrollHeight + 15)+ "px";
        // cont.style.height = "auto";
    } else {
        // close the reso div
        arrow.style.transform = 'rotate(0deg)';
        cont.style.height = '0px';
        setTimeout(function() {
            cont.style.display = "none";
        }, 200)
    }
}