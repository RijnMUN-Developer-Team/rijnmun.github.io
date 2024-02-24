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
var x = setInterval(function() {
    var now = new Date().getTime();
    var distance = countDownDate - now;
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (days != prev_days) {
        document.getElementById('days').style.transition = "all 0.2s linear"
        document.getElementById('days').style.transform = "translateY(15px) rotateX(-45deg)"
        document.getElementById('days').style.opacity = "0"
    } 
    if (hours != prev_hours) {
        document.getElementById('hours').style.transition = "all 0.2s linear"
        document.getElementById('hours').style.transform = "translateY(15px) rotateX(-45deg)"
        document.getElementById('hours').style.opacity = "0"
    } 
    if (minutes != prev_mins) {
        document.getElementById('minutes').style.transition = "all 0.2s linear"
        document.getElementById('minutes').style.transform = "translateY(15px) rotateX(-45deg)"
        document.getElementById('minutes').style.opacity = "0"
    }
    document.getElementById('seconds').style.transition = "all 0.2s linear"
    document.getElementById('seconds').style.transform = "translateY(15px) rotateX(-45deg)"
    document.getElementById('seconds').style.opacity = "0"
    setTimeout(() => {
        if (days != prev_days) {
            if (days < 10) {
                var temp = days
                days = temp.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})
            }
            document.getElementById('days').innerHTML = days
        } 
        if (hours != prev_hours) {
            if (hours < 10) {
                var temp = hours
                hours = temp.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})
            }
            document.getElementById('hours').innerHTML = hours
        } 
        if (minutes != prev_mins) {
            if (minutes < 10) {
                var temp = minutes
                minutes = temp.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})
            }
            document.getElementById('minutes').innerHTML = minutes
        }
        if (seconds < 10) {
            var temp = seconds
            seconds = temp.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})
        }
        document.getElementById('seconds').innerHTML = seconds
    }, "200")
    setTimeout(() => {
        if (days != prev_days) {
            document.getElementById('days').style.transform = "translateY(-15px) rotateX(45deg)"
        } 
        if (hours != prev_hours) {
            document.getElementById('hours').style.transform = "translateY(-15px) rotateX(45deg)"
        } 
        if (minutes != prev_mins) {
            document.getElementById('minutes').style.transform = "translateY(-15px) rotateX(45deg)"
        }
        document.getElementById('seconds').style.transform = "translateY(-15px) rotateX(45deg)"
    }, "300")
    setTimeout(() => {
        if (days != prev_days) {
            document.getElementById('days').style.transform = "translateY(0px) rotateX(0deg)"
            document.getElementById('days').style.opacity = "1"
            // prev_days = parseInt(toString(days))
            prev_days = days
        } 
        if (hours != prev_hours) {
            document.getElementById('hours').style.transform = "translateY(0px) rotateX(0deg)"
            document.getElementById('hours').style.opacity = "1"
            // prev_hours = parseInt(toString(hours))
            prev_hours = hours
        } 
        if (minutes != prev_mins) {
            document.getElementById('minutes').style.transform = "translateY(0px) rotateX(0deg)"
            document.getElementById('minutes').style.opacity = "1"
            // prev_mins = parseInt(toString(minutes))
            prev_mins = minutes
        }
        document.getElementById('seconds').style.transform = "translateY(0px) rotateX(0deg)"
        document.getElementById('seconds').style.opacity = "1"
    }, "500")
    
    if (distance < 0) {
      clearInterval(x);
      document.getElementById('days').innerHTML = "00";
      document.getElementById('hours').innerHTML = "00";
      document.getElementById('minutes').innerHTML = "00";
      document.getElementById('seconds').innerHTML = "00";
    }
}, 1000);