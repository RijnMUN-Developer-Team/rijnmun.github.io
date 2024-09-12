// function  toggle_col_key() {
//     const collapsibles = document.getElementById('collapsible-cols')
//     const caret = document.getElementById('arrow');
//     const cont = document.getElementById('sunday-item');
//     caret.style.transition = "";
//     collapsibles.style.transition = "";
//     if (caret.classList.contains('0')) {
//         caret.style.transform = "rotate(-90deg)";
//         collapsibles.style.height = '';
//         caret.classList.remove('0');
//         caret.classList.add('1');
//         // setTimeout(() => {
//         collapsibles.style.display = 'block';
//         cont.style.height = `${cont.clientHeight - collapsibles.clientHeight}px`
//         cont.style.maxHeight = `${cont.clientHeight - collapsibles.clientHeight}px`
//         // }, 200)
//     } else {
//         caret.style.transform = "rotate(0deg)";
//         collapsibles.style.height = '0px';
//         caret.classList.remove('1');
//         caret.classList.add('0');
//         // setTimeout(() => {
//         collapsibles.style.display = 'none';
//         cont.style.height = ''
//         // }, 200)
//     }
// }

function  toggle_col_key() {
    const collapsibles = document.getElementById('collapsible-cols')
    const caret = document.getElementById('arrow');
    caret.style.transition = "";
    collapsibles.style.transition = "";
    if (caret.classList.contains('0')) {
        caret.style.transform = "rotate(-90deg)";
        collapsibles.style.height = '';
        caret.classList.remove('0');
        caret.classList.add('1');
        // setTimeout(() => {
        collapsibles.style.display = 'block';
        // }, 200)
    } else {
        caret.style.transform = "rotate(0deg)";
        collapsibles.style.height = '0px';
        caret.classList.remove('1');
        caret.classList.add('0');
        // setTimeout(() => {
        collapsibles.style.display = 'none';
        // }, 200)
    }
}

document.addEventListener('scroll', (e) => {
    const footer = Math.floor(document.querySelector('footer').getBoundingClientRect().height)
    const height = Math.floor(document.querySelector('html').getBoundingClientRect().height - window.innerHeight)
    const key = document.getElementById('key-parent')
    if (window.scrollY > height - footer) {
        key.style.bottom = `${10 + window.scrollY - (height - footer)}px`
    } else {
        key.style.bottom = `10px`
    }
})