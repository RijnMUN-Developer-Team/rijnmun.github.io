function panel() {
    let cont = document.getElementsByClassName("key-cont")[0];
    let bar1 = document.getElementById('bar1')
    let bar2 = document.getElementById('bar2')
    let bar3 = document.getElementById('bar3')
    // let caret = document.getElementById('side-button-i')
    // caret.style.transition = "0.2s ease-in-out"

    if (cont.style.getPropertyValue("--i") === '0') {
        // open the contents
        cont.style.display = 'block';
        cont.style.height = cont.scrollHeight + "px";
        cont.style.width = cont.scrollWidth + "px"
        cont.style.setProperty('--i', '1')
        // caret.style.transform = "rotate(-90deg)"
        // document.getElementById("side-button").innerHTML = "<";
        bar1.style.transition = "0.5s ease-in-out"
        bar2.style.transition = "0.5s ease-in-out"
        bar3.style.transition = "0.5s ease-in-out"
        bar1.style.transform = "rotate(315deg)"
        bar2.style.transform = "rotate(315deg)"
        bar3.style.transform = "rotate(225deg)"
        bar1.style.setProperty('--i', '13')
        bar2.style.setProperty('--i', '9')
        bar3.style.setProperty('--i', '5')
    } else {
        // close the contents
        cont.style.height = 0;
        cont.style.width = 0
        cont.style.setProperty('--i', '0')
        // pausing code for animation
        setTimeout(function(){
            cont.style.display = 'none'; 
        }, 200, cont)
        // caret.style.transform = "rotate(0deg)"

        // document.getElementById("side-button").innerHTML = ">";
        bar1.style.transition = "0.5s ease-in-out"
        bar2.style.transition = "0.5s ease-in-out"
        bar3.style.transition = "0.5s ease-in-out"
        bar1.style.transform = "rotate(0deg)"
        bar2.style.transform = "rotate(0deg)"
        bar3.style.transform = "rotate(0deg)"
        bar1.style.setProperty('--i', '0')
        bar2.style.setProperty('--i', '9')
        bar3.style.setProperty('--i', '18')
    }
}