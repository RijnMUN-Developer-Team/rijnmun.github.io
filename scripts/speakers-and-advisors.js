function resizeImgs() {
    let speakers_imgs = document.querySelectorAll('div.person div.photo img')
    let speakers_txt = document.querySelectorAll('div.person div.text')
    for (let i = 0; i < speakers_txt.length; i++) {
        let txt_height = speakers_txt[i].offsetHeight
        speakers_imgs[i].style.height = txt_height + "px"
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => resizeImgs(), 10)
    window.onresize = () => resizeImgs()
})
