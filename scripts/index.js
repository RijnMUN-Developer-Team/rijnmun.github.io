// updating the last-updated sidebar date automatically
// let lastUpdated = new Date(document.lastModified);
// document.getElementById("date").innerHTML = `Last Updated: ${String(lastUpdated.getDate()).padStart(2, '0')}/${String(lastUpdated.getMonth()+1).padStart(2, '0')}/${lastUpdated.getFullYear()}`;

// hides the news "Show more" toggle when there is nothing to overflow
function update_news_toggle() {
    const toggle_cont = document.getElementById('news-toggle-cont');
    if (!toggle_cont) return;
    if (document.querySelectorAll('div#news-overflow div[data-cs-rendered]').length < 1) {
        toggle_cont.style.display = 'none'
    } else {
        toggle_cont.style.display = ''
    }
}

document.addEventListener('DOMContentLoaded', update_news_toggle);
// re-check once the sheet content engine has rendered the news items
document.addEventListener('cs:ready', update_news_toggle);

let news_overflow_toggled = false;

function toggle_news_overflow() {
    let toggle_cont = document.getElementById("news-toggle-cont")
    let overflow_content = document.getElementById("news-overflow")
    let overflow_toggle = document.getElementById("news-toggle")
    let overflow_arrow = document.getElementById("nws-ovrflw-arrw")

    if (news_overflow_toggled) {
        // transitioning the arrow
        overflow_toggle.innerHTML = "Show more ";
        overflow_arrow.style = "rotate: 0deg;";
        news_overflow_toggled = false;

        // closing the panel
        overflow_content.style.height = "0px";

        setTimeout(function() {
          overflow_content.style.display = "none";
        }, 200, overflow_content)
        toggle_cont.style = "padding: 0 0 0 0;"



    } else {
        // transitioning the arrow
        overflow_toggle.innerHTML = "Show less ";
        toggle_cont.style = "padding: 10px 0 0 0;"
        overflow_arrow.style = "rotate: -180deg;";
        news_overflow_toggled = true;

        // opening the panel
        overflow_content.style.display = "block";
        overflow_content.style.height = overflow_content.scrollHeight + "px";
    }
  }