function show_bars() {
    var x = document.getElementById("toggle");
    let bar1 = document.getElementById('bar1')
    let bar2 = document.getElementById('bar2')
    let bar3 = document.getElementById('bar3')
    // if (x.className === "toggle") {
    //     x.className += " responsive";
    // } else {
    //     x.className = "toggle";
    // }
    
    // the responsive class name is no longer used
    if (x.style.display === 'none') {
        x.style.display = 'block';
        x.style.height = x.scrollHeight + "px";
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

        x.style.height = 0;
        bar1.style.transition = "0.5s ease-in-out"
        bar2.style.transition = "0.5s ease-in-out"
        bar3.style.transition = "0.5s ease-in-out"
        bar1.style.transform = "rotate(0deg)"
        bar2.style.transform = "rotate(0deg)"
        bar3.style.transform = "rotate(0deg)"
        bar1.style.setProperty('--i', '0')
        bar2.style.setProperty('--i', '9')
        bar3.style.setProperty('--i', '18')

        setTimeout(function(){
            x.style.display = 'none'; 
        }, 200, x)
        
    }
}

function hide_bars() {
    var x = document.getElementById("toggle");

    // if (x.className != "toggle") {
    //     x.className = "toggle"
    // }

    x.style.height = 0;
    bar1.style.transition = "0.5s ease-in-out"
    bar2.style.transition = "0.5s ease-in-out"
    bar3.style.transition = "0.5s ease-in-out"
    bar1.style.transform = "rotate(0deg)"
    bar2.style.transform = "rotate(0deg)"
    bar3.style.transform = "rotate(0deg)"
    bar1.style.setProperty('--i', '0')
    bar2.style.setProperty('--i', '9')
    bar3.style.setProperty('--i', '18')

    setTimeout(function(){
        x.style.display = 'none'; 
    }, 200, x)
        
}

document.onkeypress = function (key) {
    // console.log(code);
    // console.log(lock);

    key = key || window.event;
    console.log(key.keyCode);

    if (key.keyCode===104) {
        window.location.replace("/");
    }    
}

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.getElementById("tab_icon").href = "/images/logos/icon_white.ico";
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    const newColorScheme = event.matches ? "dark" : "light";
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.getElementById("tab_icon").href = "/images/logos/icon_white.ico";
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        document.getElementById("tab_icon").href = "/images/logos/icon.ico";
    }
});

var countDownDate = new Date("Oct 12, 2024 8:00:00").getTime();
// let doc_days = document.getElementById('days')
// let doc_hours = document.getElementById('hours')
// let doc_mins = document.getElementById('minutes')
// let doc_secs = document.getElementById('seconds')
var prev_days
var prev_hours
var prev_mins
var prev_sec = '7'
var min_prev = '7'
var hour_prev = '7'
var sec_li = []
var x = setInterval(function() {
    var now = new Date().getTime();
    var distance = countDownDate - now;
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    function transition(element, part) {
        if (part == 1) {
            document.getElementById(element).style.transition = "all 0.2s linear"
            document.getElementById(element).style.transform = "translateY(15px) rotateX(-45deg)"
            document.getElementById(element).style.opacity = "0"
        } else if (part == 2) {
            document.getElementById(element).style.transform = "translateY(-15px) rotateX(45deg)"
        } else if (part == 3) {
            document.getElementById(element).style.transform = "translateY(0px) rotateX(0deg)"
            document.getElementById(element).style.opacity = "1"
        }
    }

    // updates seconds here (without transformations)
    // document.getElementById("seconds").innerHTML = seconds;
    if (days < 10) {
        var temp = days
        days = temp.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})
    }
    if (hours < 10) {
        var temp = hours
        hours = temp.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})
    }
    hour_li = hours.toString().split('')
    if (minutes < 10) {
        var temp = minutes
        minutes = temp.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})
    }
    min_li = minutes.toString().split('')
    if (seconds < 10) {
        var temp = seconds
        seconds = temp.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})
    }
    sec_li = seconds.toString().split('')

    console.log(sec_li)
    console.log(min_li)
    console.log(hour_li)
    // console.log()
    // console.log()

    if (days != prev_days) {
        transition('days', 1)
    } 
    if (hours != prev_hours) {
        if (hour_li[0] != hour_prev) {
            transition('hr1', 1)
        }
        transition('hr2', 1)
    } 
    if (minutes != prev_mins) {
        if (min_li[0] != min_prev){
            transition('min1', 1)
        }
        transition('min2', 1)
    }
    if (sec_li[0]  != prev_sec) {
        transition('sec1', 1)
    }
    transition('sec2', 1)

    setTimeout(() => {

        document.getElementById('days').innerHTML = days
        document.getElementById('hr1').innerText = hour_li[0]
        document.getElementById('hr2').innerText = hour_li[1]
        document.getElementById('min1').innerText = min_li[0]
        document.getElementById('min2').innerText = min_li[1]
        document.getElementById('sec1').innerText = sec_li[0]
        document.getElementById('sec2').innerText = sec_li[1]
    }, "200")


    setTimeout(() => {
        if (days != prev_days) {
            transition('days', 2)
        } 
        if (hours != prev_hours) {
            if (hour_li[0] != hour_prev) {
                transition('hr1', 2)
            }
            transition('hr2', 2)
        } 
        if (minutes != prev_mins) {
            if (min_li[0] != min_prev) {
                transition('min1', 2)
            }
            transition('min2', 2)
        }
        if (sec_li[0] != prev_sec) {
            transition('sec1', 2)
        }
        transition('sec2', 2)
    }, "300")


    setTimeout(() => {
        if (days != prev_days) {
            transition('days', 3)
            prev_days = days
        } 
        if (hours != prev_hours) {
            if (hour_li[0] != hour_prev) {
                transition('hr1', 3)
            }
            transition('hr2', 3)
            hour_prev = hour_li[0]
            prev_hours = hours
        } 
        if (minutes != prev_mins) {
            if (min_li[0] != min_prev){
                transition('min1', 3)
            }
            transition('min2', 3)
            min_prev = min_li[0]
            prev_mins = minutes
        }
        if (sec_li[0] != prev_sec) {
            transition('sec1', 3)
            prev_sec = sec_li[0]
        }
        transition('sec2', 3)
    }, "500")
    
    if (distance < 0) {
        clearInterval(x);
        document.getElementById('days').innerHTML = "00";
        document.getElementById('hr1').innerText = "0"
        document.getElementById('hr2').innerText = "0"
        document.getElementById('min1').innerText = "0"
        document.getElementById('min2').innerText = "0"
        document.getElementById('sec1').innerText = "0"
        document.getElementById('sec2').innerText = "0"
    }
}, 1000);