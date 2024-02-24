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
var x = setInterval(function() {
  var now = new Date().getTime();
  var distance = countDownDate - now;
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").innerHTML = days;
  document.getElementById("hours").innerHTML = hours;
  document.getElementById("minutes").innerHTML = minutes;
  document.getElementById("seconds").innerHTML = seconds;

  if (distance < 0) {
    clearInterval(x);
    document.getElementById("days").innerHTML = "00";
    document.getElementById("hours").innerHTML = "00";
    document.getElementById("minutes").innerHTML = "00";
    document.getElementById("seconds").innerHTML = "00";
  }
}, 1000);