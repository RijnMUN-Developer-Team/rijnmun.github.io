function collapse(option) {
    let cont = document.getElementById(`${option}-registration-info`);
    let heading = document.getElementById(`${option}-heading`);

    if (cont.style.display === 'none') {
        // shows text on click

        cont.style.display = 'block';
        cont.style.height = cont.scrollHeight + "px";                  
            
    } else {
        // closes text on click
        cont.style.height= 0;
        
        // pausing code for animation
        setTimeout(function(){
            cont.style.display = 'none'; 
        }, 200, cont)
        
    }

    let caret = document.getElementById(`${option}-arrow`);
    caret.style.transition = "0.2s ease-in-out";
    if (caret.classList.contains('0')) {
        caret.style.transform = "rotate(-90deg)";
        caret.classList.remove('0');
        caret.classList.add('1');
    } else {
        caret.style.transform = "rotate(0deg)";
        caret.classList.remove('1');
        caret.classList.add('0');
    }
}

// if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
// document.getElementById("tab_icon").href = "/images/logos/icon_white.ico";
// }

// window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
// const newColorScheme = event.matches ? "dark" : "light";
// if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
//     document.getElementById("tab_icon").href = "/images/logos/icon_white.ico";
// } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
//     document.getElementById("tab_icon").href = "/images/logos/icon.ico";
// }
// });