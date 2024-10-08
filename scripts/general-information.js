function openTab(name) {
    let pages = document.getElementsByClassName("page");
    let btns = document.getElementsByTagName('button');
    let btn = document.getElementById(`${name}-btn`);

    for (let i = 0; i < pages.length; i++) {
        pages[i].style.display = "none";
        // btns[i].style.backgroundColor = getComputedStyle(document.body).getPropertyValue("--bg-rd");
        btns[i].style.backgroundColor = "";
    }

    document.getElementById(name).style.display = "block";
    btn.style.backgroundColor = getComputedStyle(document.body).getPropertyValue("--theme-rd");
}

document.addEventListener('DOMContentLoaded', () => {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has('tab')) {
        const tab = searchParams.get('tab')
        if (tab == 'guidelines') {
            openTab('guidelines')
        } else if (tab == 'guides') {
            openTab('guides')
        } else if (tab == 'resources') {
            openTab('resources')
        }
    }
})