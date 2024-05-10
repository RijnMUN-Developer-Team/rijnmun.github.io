// updating the last-updated sidebar date automatically
// let lastUpdated = new Date(document.lastModified);
// document.getElementById("date").innerHTML = `Last Updated: ${String(lastUpdated.getDate()).padStart(2, '0')}/${String(lastUpdated.getMonth()+1).padStart(2, '0')}/${lastUpdated.getFullYear()}`;

let news_overflow_toggled = false;

function toggle_news_overflow() {
    let toggle_cont = document.getElementById("news-toggle-cont")
    let overflow_content = document.getElementById("news-overflow")
    let overflow_toggle = document.getElementById("news-toggle")
    let overflow_arrow = document.getElementById("nws-ovrflw-arrw")

    if (news_overflow_toggled) {
        overflow_content.style.display = "none";
        overflow_content.style.height = "0px";
        overflow_toggle.innerHTML = "Show more ";
        toggle_cont.style = "padding: 0 0 0 0;"
        overflow_arrow.style = "rotate: 0deg;";
        news_overflow_toggled = false;
    } else {
        overflow_content.style.display = "block";
        setTimeout(() => {
          overflow_content.style.height = "100%";
        }, 10); 
        overflow_toggle.innerHTML = "Show less ";
        toggle_cont.style = "padding: 10px 0 0 0;"
        overflow_arrow.style = "rotate: -180deg;";
        news_overflow_toggled = true;
    }
  }