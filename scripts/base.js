
// removes the "enable javascript" alert ------------------------------
window.onload = () => {
    document.querySelector('body').innerHTML += footerHTML
    document.querySelector('header').style = "display: flex !important;";
    document.querySelector('footer').style = "display: block !important;";    
    document.querySelector('main').style = "display: block !important;";
    // const isTablet = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(navigator.userAgent);
    if (window.screenX === 0 && navigator.maxTouchPoints > 0) {
        document.getElementById("dropbtn").href = "javascript: void(0)";
    }
    const is_staff = window.localStorage.getItem('staffID')
    if (is_staff === window.atob('VW1scWJrMVZUaUEyT1RReU1BPT0=') && window.location.href != 'https://www.rijnmun.org/staff/schedule') {
        // console.log('recognized staff member')
        // document.addEventListener('DOMContentLoaded', () => {
        document.getElementById('menu').innerHTML += '<a class="normal" href="/staff/schedule">Staff</a>'
        document.querySelector('#toggle ul').innerHTML += '<li class="main"><a href="/staff/schedule">Staff</a></li>'
        // })
    }
}

// transition for mobile support settings ------------------------
function show_bars() {
    var x = document.getElementById("toggle");
    let bar1 = document.getElementById('bar1')
    let bar2 = document.getElementById('bar2')
    let bar3 = document.getElementById('bar3')

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

// h key returns to home --------------------------------
document.onkeypress = function (key) {

    key = key || window.event;
    // console.log(key.keyCode);

    if (key.keyCode===104) {
        window.location.replace("/");
    }    
}

// COUNTDOWN TIMER -------------------------------------------------

var countDownDate = new Date("Oct 11, 2024 11:30:00").getTime();
var prev_days
var prev_hours
var prev_mins
var prev_sec
var min_prev
var hour_prev
var day_prev_0
var day_prev_1
var sec_li = []
var min_li = []
var hour_li = []
var day_li = []
var x = setInterval(function() {
    var now = new Date().getTime();
    var distance = now - countDownDate;
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); // the +2 is to accomodate for Dutch time zone (UTC+1 +1 for daylight saving time)
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    function transition(element, part) {
        if (part == 1) {
            document.getElementById(element).style.transition = "all 0.1s linear"
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
    if (days < 10) {
        var temp = days
        days = temp.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})
    }
    day_li = days.toString().split('')
    if (days < 100) {
        day_li = ["", day_li[0], day_li[1]]
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

    if (days != prev_days) {
        if (day_li[0] != day_prev_0) {
            transition('day1', 1)
        }
        if (day_li[1] != day_prev_1) {
            transition('day2', 1)
        }
        transition('day3', 1)
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
        document.getElementById('day1').innerHTML = '+' + day_li[0]
        document.getElementById('day2').innerHTML = day_li[1]
        document.getElementById('day3').innerHTML = day_li[2]
        document.getElementById('hr1').innerText = '+' + hour_li[0]
        document.getElementById('hr2').innerText = hour_li[1]
        document.getElementById('min1').innerText ='+' + min_li[0]
        document.getElementById('min2').innerText = min_li[1]
        document.getElementById('sec1').innerText = '+' + sec_li[0]
        document.getElementById('sec2').innerText = sec_li[1]
    }, "200")


    setTimeout(() => {
        if (days != prev_days) {
            if (day_li[0] != day_prev_0) {
                transition('day1', 2)
            }
            if (day_li[1] != day_prev_1) {
                transition('day2', 2)
            }
            transition('day3', 2)
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
            if (day_li[0] != day_prev_0) {
                transition('day1', 3)
            }
            if (day_li[1] != day_prev_1) {
                transition('day2', 3)
            }
            transition('day3', 3)
            day_prev_0 = day_li[0]
            day_prev_1 = day_li[1]
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
        document.getElementById('day1').innerHTML = "0"
        document.getElementById('day2').innerHTML = "0"
        document.getElementById('day3').innerHTML = "0"
        document.getElementById('hr1').innerText = "0"
        document.getElementById('hr2').innerText = "0"
        document.getElementById('min1').innerText = "0"
        document.getElementById('min2').innerText = "0"
        document.getElementById('sec1').innerText = "0"
        document.getElementById('sec2').innerText = "0"
    }
}, 1000);

// go to top arrow --------------------------------------------
window.addEventListener("scroll", function(){
    if(window.scrollY < 470){
        let scroll = document.getElementById('scrollup')
        scroll.style.opacity = 0
        scroll.onclick = null;
        scroll.style.cursor = "default"
    } else if(window.scrollY > 470) {
        let scroll = document.getElementById('scrollup')
        scroll.style.opacity = 0.9
        scroll.setAttribute('onclick', "scroll_up()");
        scroll.style.cursor = "pointer"
    }
});

function scroll_up() {
    window.scroll({top: 0, left: 0, behavior: 'smooth'});
}

// spam email protection------------------------------------
function email() {
    let recipient="info";
    let at = String.fromCharCode(64);
    let dotcom="rijnmun.org";
    let mail="mailto:";
    window.open(mail+recipient+at+dotcom);
}

const footerHTML = `
        <footer data-nosnippet>
            <div class="f_container">
                <div class="f">
                    <div class="ft">
                        <h4>GENERAL</h4>
                        <ul class="f_important">
                            <li>
                                <a href="/rijnmun-2024/programme-of-events">Agenda</a>
                            </li>
                            <li>
                                <a href="/uploads/RijnMUN_Delegate_Handbook.pdf" target="_blank" rel="noopener noreferrer">Handbook</a>
                            </li>
                            <li>
                                <a href="/rijnmun-2024/general-information?tab=resources">Resources</a>
                            </li>
                            <li>
                                <a href="/uploads/RijnMUN Privacy Policy.pdf">Privacy Policy</a>
                            </li>
                            <li>
                                <a href="/uploads/RijnMUN 2024 Resolution Template.odt" target="_blank" rel="noopener noreferrer">Resolution Template</a>
                            </li>
                        </ul>
                    </div>
                    <div class="ftr">
                        <h4>CONTACT</h4>
                        <ul class="f_contact">
                            <li>
                                <i class="fa fa-institution"></i>
                                <p>
                                    RijnMUN
                                </p>
                            </li>
                            <li>
                                <span class="spc"><i class="fa fa-home" style="font-size: 18px;"></i></span>
                                <a class="adress" href="https://maps.app.goo.gl/dN1XhpLJ43wm5kVo7" target="_blank" rel="noopener noreferrer">
                                    Apollolaan 1, 2341 BA<br>Oegstgeest, The Netherlands
                                </a>
                            </li>
                            <li>
                                <i class="fa fa-envelope"></i>
                                <div class="at" onclick="email()">&#105;&#110;&#102;&#111;&#64;&#114;&#105;&#106;&#110;&#109;&#117;&#110;&#46;&#111;&#114;&#103;</div>
                            </li>
                            <li>
                                <span class="spc>"><i class="fa fa-globe"></i></span>
                                <a href="/">
                                    www.rijnmun.org
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="timer">
                        <h4 title="Oh the pain that has gone into creating this countdown-">COUNTDOWN TO RIJNMUN</h4>
                        <div class="countdown">
                            <table class="tm_tbl">
                                <tr><td id="days"><div class="days_div"><p id="day1"></p><p id="day2"></p><p id="day3"></p></div></td><td id="hours"><div class="hours_div"><p id="hr1"></p><p id="hr2"></p></div></td><td id="minutes"><div class="mins_div"><p id="min1"></p><p id="min2"></p></div></td><td id="seconds"><div class="secs_div"><p id="sec1"></p><p id="sec2"></p></div></td></tr>
                                <tr><td class="days">Days</td><td class="hours">Hours</td><td class="minutes">Minutes</td><td class="seconds">Seconds</td></tr>
                            </table>
                        </div>
                        <div class="socials">
                            <a href="https://www.instagram.com/rijn.mun?igsh=cWtvcHhlZzN3N2R5" target="_blank" rel="noopener noreferrer"><img alt="Instagram" class="insta" src="/images/logos/instagram.webp" title="Follow us @rijn.mun on Instagram!"></a>
                            <h4>FOLLOW US</h4>
                            <a href="https://www.tiktok.com/@rijn_mun" target="_blank" rel="noopener noreferrer"><img alt="TikTok" class="tiktok" src="/images/logos/tiktok.webp" title="Follow @rijn_mun on TikTok!"></a>
                        </div>
                    </div>
                </div>
                <div class="map_div">
                    <iframe title="Location of Het Rijnlands Lyceum Oegstgeest" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2446.4324482451157!2d4.4591849122980225!3d52.181011671857384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c5c7261b8f7c3d%3A0x90ba89f8621db50!2sRijnlands%20Lyceum%20Oegstgeest!5e0!3m2!1sen!2snl!4v1709380750374!5m2!1sen!2snl" width="300" height="200" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
            <p class="copyright"><i>© RijnMUN 2024, all rights reserved</i></p>
        </footer>
`