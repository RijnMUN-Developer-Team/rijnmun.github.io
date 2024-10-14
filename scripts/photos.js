// number of photos; index 0 is day 1, index 1 is day 2...etc
const num_photos = [17, 53, 26]

for (let day=1; day<=num_photos.length; day++) {
    const day_photos_div = document.getElementById(`conference-day${day}`);
    day_photos_div.innerHTML = "";

    for (let i=1; i<=num_photos[day-1]; i++) {
        // day_photos_div.innerHTML += `<img loading="lazy" class="conference-photos" src="/images/conference-photos/day${day}/img${day}${("0"+i).slice(-2)}.JPG" alt="Day ${day} Image ${i}">`;
        day_photos_div.innerHTML += `<img class="conference-photos" src="/images/conference-photos/day${day}/img${day}${("0"+i).slice(-2)}.JPG" alt="Day ${day} Image ${i}">`;

    }
}