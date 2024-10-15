// number of photos; index 0 is day 1, index 1 is day 2...etc
const num_photos = [17, 64, 26]
// const num_photos = [10]
let image = ''

for (let day=1; day<=num_photos.length; day++) {
    const day_photos_div = document.getElementById(`conference-day${day}`);
    day_photos_div.innerHTML = "";

    for (let i=1; i<=num_photos[day-1]; i++) {
        day_photos_div.innerHTML += `<img loading="lazy" class="conference-photos" onclick="enlarge(this.src)" src="/images/conference-photos/day${day}/img${day}${("0"+i).slice(-2)}.JPG" alt="Day ${day} Image ${i}">`;
        // day_photos_div.innerHTML += `<img class="conference-photos" src="/images/conference-photos/day${day}/img${day}${("0"+i).slice(-2)}.JPG" alt="Day ${day} Image ${i}">`;
    
    }
}

function enlarge(image_src) {
    const img_panel = document.getElementById('large-img')
    const img = document.getElementById('preview-img')
    if (image_src == '$CLOSE$') {
        img_panel.style.display = 'none'
    } else {
        img_panel.style.display = 'flex'
        image = image_src
        img.src = image_src
        img_size = img.getBoundingClientRect()
        img.style = `top: calc(90vh - ${img_size.h/2}px); left: calc(90vw - ${img_size.w/2}px);`
    }
}

async function download() {
    const imageSrc = document.getElementById('preview-img').src
    const image = await fetch(imageSrc)
    const imageBlog = await image.blob()
    const imageURL = URL.createObjectURL(imageBlog)
    // const date = new Date()
    const imageName = `RijnMUN 2024 Image Download`

    const link = document.createElement('a')
    link.href = imageURL
    link.download = imageName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}