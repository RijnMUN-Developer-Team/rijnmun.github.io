function collapse(option) {
    let cont = document.getElementById(`${option}-registration-info`);
    let heading = document.getElementById(`${option}-heading`);

    if (cont.style.display === 'none') {
        // shows text on click
        heading.style.borderBottomLeftRadius = "0"
        heading.style.borderBottomRightRadius = "0"
        cont.style.display = 'block';
        cont.style.height = cont.scrollHeight + "px";       
        const conts = ['sch', 'ind', 'stoff', 'rlo']
        conts.forEach(opt => {
            if (opt != option) {
                let temp_cont = document.getElementById(`${opt}-registration-info`);
                let temp_heading = document.getElementById(`${opt}-heading`);
                temp_cont.style.height= 0;
                temp_heading.style.borderBottomLeftRadius = "5px"
                temp_heading.style.borderBottomRightRadius = "5px"
                setTimeout(function(){
                    temp_cont.style.display = 'none'; 
                }, 200, cont)
                let temp_caret = document.getElementById(`${opt}-arrow`);
                temp_caret.style.transition = "0.2s ease-in-out";
                temp_caret.style.transform = "rotate(0deg)";
                temp_caret.classList.remove('1');
                temp_caret.classList.add('0');
            }
        })
    } else {
        // closes text on click
        cont.style.height= 0;
        heading.style.borderBottomLeftRadius = "5px"
        heading.style.borderBottomRightRadius = "5px"
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

document.addEventListener('DOMContentLoaded', () => {
    const url = new URL(document.location.toString())
    if (url.searchParams.has('opt')) {
        // const heading = document.getElementById(`${url.searchParams.get('opt')}-heading`).getBoundingClientRect()
        setTimeout(() => {
            collapse(url.searchParams.get('opt'))
            // window.scrollTo({top: heading.bottom, behavior: "smooth"})
        }, 100)
    }
})

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