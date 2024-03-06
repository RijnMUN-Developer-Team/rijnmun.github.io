// function openKey() {
//     let keyTitle = document.getElementsByClassName("key-heading")[0];
//     // let keyH2 = document.getElementById('key-h2')
//     let cont = document.getElementsByClassName("key-cont")[0];
    
//     if (cont.style.display == "none") {
//         // open
//         // keyH2.style = "position: absolute; right: -80px;"
//         // keyH2.style.transition = "unset"
//         // setTimeout(function() {
//             cont.style.display = "block";
//             // cont.style.width = cont.scrollWidth + "px";
//             // keyH2.style.transition = "unset"
//             // keyH2.style = "writing-mode: revert !important; text-orientation: revert !important;"
//             // keyH2.style.transition = "all 0.4s linear"
//             setTimeout(function(){
//                 cont.style = "position: absolute; right: 100px;"
//                 // keyH2.style = "position: absolute; right: 0px;"
//             }, 10)
//         // }, 200)

//     } else {
//         //close
//         // cont.style.width = 0;
//         cont.style = "position: absolute; right: -10px;"
//         // keyH2.style = "writing-mode: vertical-rl !important; text-orientation: upright !important;"

//         setTimeout(function(){
//             cont.style.display = 'none'; 
//         }, 400)
//     }
// }

function toggle_col_key() {
    let eye = document.getElementById('eye')
    let key = document.getElementById('key')
    if (eye.classList.contains('fa-eye')) {
        eye.classList.remove('fa-eye')
        eye.classList.add('fa-eye-slash')
        key.style.transition = "opacity 0.2s linear"
        key.style.opacity = 0
        eye.style.opacity = 1
    } else {
        eye.classList.add('fa-eye')
        eye.classList.remove('fa-eye-slash')
        key.style.transition = "opacity 0.2s linear"
        eye.style.opacity = 1
        key.style.opacity = 1
    }
}
