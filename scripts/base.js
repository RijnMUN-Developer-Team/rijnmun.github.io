
// Google Sheet content source ----------------------------------------
// Single place to configure the content spreadsheet: content.js reads
// window.CS_SHEET_ID, and base.js uses it to fill the footer + countdown.
window.CS_SHEET_ID = "1zwSIutFtt_bld4UvOV4sFnVSrzSZm3MZn_aUzu5LzH8";

// removes the "enable javascript" alert ------------------------------
window.onload = () => {
    if (!document.querySelector('footer[data-base-footer]')) {
        document.body.insertAdjacentHTML('beforeend', footerHTML)
    }
    document.querySelector('header').style = "display: flex !important;";
    document.querySelector('footer').style = "display: block !important;";    
    document.querySelector('main').style = "display: block !important;";
    // const isTablet = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(navigator.userAgent);
    if (window.screenX === 0 && navigator.maxTouchPoints > 0) {
        document.getElementById("dropbtn").href = "javascript: void(0)";
    }
    const is_staff = window.localStorage.getItem('staffID')
    if (is_staff === window.atob('VW1scWJrMVZUaUEyT1RReU1BPT0=') && !window.location.href.includes("staff")) {
        // console.log('recognized staff member')
        // document.addEventListener('DOMContentLoaded', () => {
        document.getElementById('menu').innerHTML += '<a class="normal" href="/staff/schedule">Staff</a>'
        document.querySelector('#toggle ul').innerHTML += '<li class="main"><a href="/staff/schedule">Staff</a></li>'
        // })
    }
    boot_footer()
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

// ---------------------------------------------------------------------
// Footer content engine (Google Sheets)
// base.js runs on every page, so it fills the footer's social links and
// email address and the countdown target from the content sheet. When
// content.js is also on the page we reuse its data (window.CS) and never
// fetch twice; on pages without it we fetch just the settings + contact
// tabs. Failures are silent: we fall back to the last cached values and
// then to the defaults below. content.js stays the only error reporter.
// ---------------------------------------------------------------------

var BASE_CACHE_KEY = "base_cache_v1";
var BASE_FETCH_TIMEOUT = 7000;

var BASE_DEFAULTS = {
    instagram_url: "https://www.instagram.com/rijn.mun?igsh=cWtvcHhlZzN3N2R5",
    tiktok_url: "https://www.tiktok.com/@rijn_mun",
    email: "info@rijnmun.org",
    countdown_date: "2026-11-20T11:30:00"
};

/* compact RFC-4180 CSV parser (quoted fields, escaped quotes, newlines) */
function baseParseCSV(text) {
    var rows = [], row = [], field = "", inQuotes = false, i = 0;
    if (typeof text !== "string") return rows;
    if (text.charCodeAt(0) === 0xFEFF) i = 1; // strip BOM
    for (; i < text.length; i++) {
        var c = text[i];
        if (inQuotes) {
            if (c === '"') {
                if (text[i + 1] === '"') { field += '"'; i++; }
                else { inQuotes = false; }
            } else { field += c; }
        } else if (c === '"') {
            inQuotes = true;
        } else if (c === ",") {
            row.push(field); field = "";
        } else if (c === "\r") {
            /* skip */
        } else if (c === "\n") {
            row.push(field); rows.push(row); row = []; field = "";
        } else {
            field += c;
        }
    }
    row.push(field); rows.push(row);
    return rows;
}

/* "key,value" CSV rows -> plain object (header row optional) */
function baseKvFromCSV(text) {
    var out = {};
    baseParseCSV(text).forEach(function (r) {
        var k = String(r[0] == null ? "" : r[0]).trim();
        if (!k || k.toLowerCase() === "key") return;
        out[k] = String(r[1] == null ? "" : r[1]).trim();
    });
    return out;
}

function baseFetchKV(tab) {
    var url = "https://docs.google.com/spreadsheets/d/" + window.CS_SHEET_ID +
        "/gviz/tq?tqx=out:csv&headers=1&sheet=" + encodeURIComponent(tab);
    var ctrl = typeof AbortController !== "undefined" ? new AbortController() : null;
    var timer = setTimeout(function () { if (ctrl) ctrl.abort(); }, BASE_FETCH_TIMEOUT);
    return fetch(url, ctrl ? { signal: ctrl.signal } : undefined)
        .then(function (res) {
            if (!res.ok) throw new Error("HTTP " + res.status);
            return res.text();
        })
        .then(function (text) {
            // an unpublished sheet answers with the sign-in page, not CSV
            if (/^\s*<!doctype|^\s*<html/i.test(String(text))) {
                throw new Error("Tab not published");
            }
            return baseKvFromCSV(text);
        })
        .finally(function () { clearTimeout(timer); });
}

/* pull the fields we care about out of a {settings, contact} object */
function baseFieldsFrom(raw) {
    if (!raw) return {};
    var s = raw.settings || {};
    var c = raw.contact || {};
    return {
        instagram_url: s.instagram_url,
        tiktok_url: s.tiktok_url,
        email: c.email,
        countdown_date: s.countdown_date,
        conference_dates: s.conference_dates
    };
}

function baseCleanFields(f) {
    var out = {};
    Object.keys(f || {}).forEach(function (k) {
        if (f[k] != null && String(f[k]).trim() !== "") out[k] = String(f[k]).trim();
    });
    return out;
}

function baseReadJSON(key) {
    try {
        var raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw).data || null : null;
    } catch (e) { return null; }
}

/* last known values: content.js's full cache first, then our own */
function baseCachedFields() {
    var full = baseReadJSON("cs_cache_v1");
    if (full) {
        var f = baseCleanFields(baseFieldsFrom(full));
        if (Object.keys(f).length) return f;
    }
    var own = baseReadJSON(BASE_CACHE_KEY);
    return own ? baseCleanFields(own) : {};
}

function baseCacheFields(f) {
    try { localStorage.setItem(BASE_CACHE_KEY, JSON.stringify({ ts: Date.now(), data: f })); }
    catch (e) { /* storage full/blocked — not fatal */ }
}

/* Resolve the footer fields. Reuse content.js when it is on the page;
   otherwise fetch the two small tabs ourselves. Never rejects. */
function baseGetSheetData() {
    if (window.CS) {
        return new Promise(function (resolve) {
            if (window.CS.ready) { resolve(baseCleanFields(baseFieldsFrom(window.CS.data))); return; }
            var done = false;
            function finish() {
                if (done) return;
                done = true;
                resolve(baseCleanFields(baseFieldsFrom(window.CS.data)));
            }
            document.addEventListener("cs:ready", finish);
            setTimeout(finish, 8000); // never wait forever on a broken engine
        });
    }
    if (!window.CS_SHEET_ID) return Promise.resolve({});
    return Promise.all([baseFetchKV("settings"), baseFetchKV("contact")])
        .then(function (res) {
            var fields = baseCleanFields({
                instagram_url: res[0].instagram_url,
                tiktok_url: res[0].tiktok_url,
                countdown_date: res[0].countdown_date,
                conference_dates: res[0].conference_dates,
                email: res[1].email
            });
            if (Object.keys(fields).length) baseCacheFields(fields);
            return fields;
        })
        .catch(function () { return {}; });
}

/* Obfuscate the email with numeric HTML entities (anti-scraper). */
function baseEncodeEmail(email) {
    return String(email).split("").map(function (ch) {
        return "&#" + ch.charCodeAt(0) + ";";
    }).join("");
}

function baseSafeUrl(url) {
    var u = String(url || "").trim();
    return /^https?:\/\//i.test(u) ? u : "";
}

function apply_footer_data(fields) {
    var f = {};
    Object.keys(BASE_DEFAULTS).forEach(function (k) { f[k] = BASE_DEFAULTS[k]; });
    Object.keys(fields || {}).forEach(function (k) {
        if (fields[k] != null && String(fields[k]).trim() !== "") f[k] = String(fields[k]).trim();
    });

    var insta = document.getElementById("footer-instagram");
    var tiktok = document.getElementById("footer-tiktok");
    var email = document.getElementById("footer-email");

    var iu = baseSafeUrl(f.instagram_url);
    if (insta && iu) insta.setAttribute("href", iu);
    var tu = baseSafeUrl(f.tiktok_url);
    if (tiktok && tu) tiktok.setAttribute("href", tu);
    if (email && f.email) {
        email.setAttribute("href", "mailto:" + f.email);
        email.innerHTML = baseEncodeEmail(f.email);
    }

    // precedence: explicit countdown_date → conference_dates → hardcoded default
    set_countdown_target(fields && fields.countdown_date,
        fields && fields.conference_dates, BASE_DEFAULTS.countdown_date);
}

function boot_footer() {
    var cached = baseCachedFields();
    apply_footer_data(cached); // cached values, else defaults
    baseGetSheetData().then(function (fresh) {
        if (fresh && Object.keys(fresh).length) apply_footer_data(fresh);
    });
}

// COUNTDOWN TIMER -------------------------------------------------

var DEFAULT_COUNTDOWN = "2026-11-20T11:30:00";
var DEFAULT_COUNTDOWN_HOUR = 12; // noon when no time is given

var BASE_MONTHS = {
    jan: 0, january: 0, feb: 1, february: 1, mar: 2, march: 2, apr: 3, april: 3,
    may: 4, jun: 5, june: 5, jul: 6, july: 6, aug: 7, august: 7,
    sep: 8, sept: 8, september: 8, oct: 9, october: 9,
    nov: 10, november: 10, dec: 11, december: 11
};

/* Parse a date written by a human. Accepts ISO (2026-11-20T11:30),
   day-first (20/11/2026 11:30) and month-name forms (20 November 2026,
   Nov 20, 2026), with or without a time, and even a date range such as
   "20^{th} to 22^{nd} November 2026" (the first day is used). If no time
   is found it defaults to noon. Returns 0 when unparseable. */
function baseParseDate(v) {
    var s = String(v == null ? "" : v).trim();
    if (!s) return 0;

    // strip superscript markup (^{th}) and ordinal suffixes (20th -> 20)
    s = s.replace(/\^\{[^}]*\}/g, "").replace(/\^/g, "");
    s = s.replace(/(\d+)(st|nd|rd|th)\b/gi, "$1");
    s = s.replace(/\s+/g, " ").trim();

    // optional time; defaults to noon
    var hour = DEFAULT_COUNTDOWN_HOUR, min = 0, sec = 0;
    var tm = s.match(/(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(am|pm)?/i);
    if (tm) {
        hour = +tm[1];
        min = +tm[2];
        sec = +(tm[3] || 0);
        var ap = (tm[4] || "").toLowerCase();
        if (ap === "pm" && hour < 12) hour += 12;
        if (ap === "am" && hour === 12) hour = 0;
        s = s.replace(tm[0], " ");
    }
    s = s.replace(/\s+/g, " ").trim();

    var m, y, mo, d;
    // numeric day-first: 20/11/2026, 20-11-2026, 20.11.2026
    if ((m = s.match(/^(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{4})/))) {
        d = +m[1]; mo = +m[2] - 1; y = +m[3];
    // numeric ISO: 2026-11-20
    } else if ((m = s.match(/^(\d{4})[\/\-\.](\d{1,2})[\/\-\.](\d{1,2})/))) {
        y = +m[1]; mo = +m[2] - 1; d = +m[3];
    // "20 to 22 November 2026" / "20-22 Nov 2026" (range → first day)
    } else if ((m = s.match(/^(\d{1,2})\s*(?:to|-|–|—|&)\s*\d{1,2}\s+(?:of\s+)?([A-Za-z]+)\.?\s+(\d{4})/))) {
        d = +m[1]; mo = BASE_MONTHS[m[2].toLowerCase()]; y = +m[3];
    // "20 November 2026"
    } else if ((m = s.match(/^(\d{1,2})\s+(?:of\s+)?([A-Za-z]+)\.?\s+(\d{4})/))) {
        d = +m[1]; mo = BASE_MONTHS[m[2].toLowerCase()]; y = +m[3];
    // "November 20, 2026" / "Nov 20 2026"
    } else if ((m = s.match(/([A-Za-z]+)\.?\s+(\d{1,2})(?:,)?\s+(\d{4})/))) {
        mo = BASE_MONTHS[m[1].toLowerCase()]; d = +m[2]; y = +m[3];
    } else {
        var t = Date.parse(s);
        return isNaN(t) ? 0 : t;
    }
    if (mo == null || isNaN(mo)) return 0;
    return new Date(y, mo, d, hour, min, sec).getTime();
}

/* Try each candidate in order and use the first one that parses. */
function set_countdown_target() {
    for (var i = 0; i < arguments.length; i++) {
        var t = baseParseDate(arguments[i]);
        if (t > 0) { countDownDate = t; return; }
    }
}

var countDownDate = baseParseDate(DEFAULT_COUNTDOWN) || new Date("Nov 20, 2026 11:30:00").getTime();
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
    // count up
    // var distance = now - countDownDate; 

    // count down
    var distance = countDownDate - now;
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
        // document.getElementById('day1').innerHTML = '+' + day_li[0] // countup
        document.getElementById('day1').innerHTML = day_li[0] // countdown
        document.getElementById('day2').innerHTML = day_li[1]
        document.getElementById('day3').innerHTML = day_li[2]
        // document.getElementById('hr1').innerText = '+' + hour_li[0] // countup
        document.getElementById('hr1').innerText = hour_li[0] // countdown
        document.getElementById('hr2').innerText = hour_li[1]
        // document.getElementById('min1').innerText ='+' + min_li[0] // countup
        document.getElementById('min1').innerText =min_li[0] // countdown
        document.getElementById('min2').innerText = min_li[1]
        // document.getElementById('sec1').innerText = '+' + sec_li[0] // count up
        document.getElementById('sec1').innerText = sec_li[0] // count down
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

const footerHTML = `
        <footer data-nosnippet data-base-footer>
            <div class="f_container">
                <div class="f">
                    <div class="ft">
                        <h4>GENERAL</h4>
                        <ul class="f_important">
                            <li>
                                <a href="/rijnmun-2026/programme-of-events">Agenda</a>
                            </li>

                            <!-- <li> -->
                                <!-- <a href="/uploads/RijnMUN_Delegate_Handbook.pdf" target="_blank" rel="noopener noreferrer">Handbook</a> -->
                            <!-- </li> --> 
                            

                            <li>
                                <a href="/rijnmun-2026/general-information?tab=resources">Resources</a>
                            </li>
                            <li>
                                <a href="/uploads/RijnMUN Privacy Policy.pdf">Privacy Policy</a>
                            </li>
                            <li>
                                <a href="/uploads/RijnMUN 2024 Resolution Template.odt" target="_blank" rel="noopener noreferrer">Resolution Template</a>
                            </li>
                            <li>
                                <a href="https://archive.rijnmun.org" target="_blank" rel="noopener noreferrer">Past Editions & Photos</a>
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
                                <a id="footer-email" href="mailto:info@rijnmun.org">&#105;&#110;&#102;&#111;&#64;&#114;&#105;&#106;&#110;&#109;&#117;&#110;&#46;&#111;&#114;&#103;</a>
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
                            <a id="footer-instagram" href="https://www.instagram.com/rijn.mun?igsh=cWtvcHhlZzN3N2R5" target="_blank" rel="noopener noreferrer"><img alt="Instagram" class="insta" src="/images/logos/instagram.webp" title="Follow us @rijn.mun on Instagram!"></a>
                            <h4>FOLLOW US</h4>
                            <a id="footer-tiktok" href="https://www.tiktok.com/@rijn_mun" target="_blank" rel="noopener noreferrer"><img alt="TikTok" class="tiktok" src="/images/logos/tiktok.webp" title="Follow @rijn_mun on TikTok!"></a>
                        </div>
                    </div>
                </div>
                <div class="map_div">
                    <iframe title="Location of Het Rijnlands Lyceum Oegstgeest" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2446.4324482451157!2d4.4591849122980225!3d52.181011671857384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c5c7261b8f7c3d%3A0x90ba89f8621db50!2sRijnlands%20Lyceum%20Oegstgeest!5e0!3m2!1sen!2snl!4v1709380750374!5m2!1sen!2snl" width="300" height="200" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
            <p class="copyright"><i>© RijnMUN 2026, all rights reserved</i></p>
        </footer>
`