import { csp } from "./csp.js"
function csp_user() {
    if (localStorage.getItem(csp[0]) == csp[1]) {
        return true
    } else {
        return false
    }
}
// custom right click (without dev tools)
function getHighlightedText() {
  var text = "";
  if (window.getSelection) {
    text = window.getSelection().toString();
  } else if (document.selection && document.selection.type != "Control") {
    text = document.selection.createRange().text;
  }
  return text;
}

function copyHighlightedText() {
  var text = "";
  if (window.getSelection) {
    text = window.getSelection().toString();
  } else if (document.selection && document.selection.type != "Control") {
    text = document.selection.createRange().text;
  }
  navigator.clipboard.writeText(text); // Add to clipboard
  return text;
}

function highlightQuery() {
  var text = "";
  if (window.getSelection) {
    text = window.getSelection().toString();
  } else if (document.selection && document.selection.type != "Control") {
    text = document.selection.createRange().text;
  }
  let query = "https://www.google.com/search?q="
  text = text.replace(/ /g, "+")
  query = query + text
  query = query.replace("\n", "")
  return query
}

// function checkIfOverLink(e) {
//   let element_under_mouse = document.elementFromPoint(e.clientX, e.clientY)
//   if (element_under_mouse.href != undefined) {
//     return 'yes'
//   } else {
//     return 'no'
//   }
// }

// let setup = false

// window.addEventListener('keypress', (e) => {
//   console.log(e)
// }, {passive:true})

window.addEventListener('contextmenu', (e) => {
  e.preventDefault()
  if (csp_user()) {
      // document.getElementById("funcs").innerHTML += `<p id="temp" onclick="window.dispatchEvent(new KeyboardEvent('keypress',{'keycode': 102}))">Inspect</p>`
      // document.getElementById("funcs").innerHTML += `<p id="temp" onclick="window.dispatchEvent(new KeyboardEvent('keypress',{'isTrusted': true, 'key': 'F12', 'keyCode': 123, 'which': 123, 'code': 'F12', 'location': 0, 'altKey': false, 'ctrlKey': false, 'metaKey': false, 'shiftKey': false, 'repeat': false }))">Inspect</p>`
      // document.getElementById("funcs").innerHTML += `<p id="temp" onclick="window.dispatchEvent(new KeyboardEvent('keypress',{'key': 'c','keyCode': 67,'which': 67,'code': 'KeyC','location': 0,'altKey': false,'ctrlKey': true,'metaKey': false,'shiftKey': true,'repeat': false}))">Inspect</p>`
      // document.getElementById("funcs").innerHTML += `<p id="temp" onclick="window.dispatchEvent(new KeyboardEvent('keypress',{'key': 'c','keyCode': 67,'which': 67,'code': 'KeyC','location': 0,'altKey': false,'ctrlKey': false,'metaKey': true,'shiftKey': true,'repeat': false}))">Inspect</p>`
  }
  // let link_available = checkIfOverLink(e)
  let rcmenu = document.getElementById("rcmenu")
  let highlight = ""
  highlight = getHighlightedText()
  let test = document.getElementById("temp")
  if (highlight != "" && !test) {
      document.getElementById("funcs").innerHTML += `<p id="temp" onclick="navigator.clipboard.writeText(${copyHighlightedText()})">Copy</p>`
      document.getElementById("funcs").innerHTML += `<p id="temp" onclick="window.open('${highlightQuery()}')">Look up</p>`
  }
  let element_under_mouse = document.elementFromPoint(e.clientX, e.clientY)
  if (element_under_mouse.href != undefined) {
    document.getElementById("funcs").innerHTML += `<p id="temp" onclick="window.open('${element_under_mouse.href}')">Open in New Tab</p>`
  }
  let difYa = (document.getElementById("links").childElementCount * 26) + 10
  let difYb = (document.getElementById("funcs").childElementCount * 26)
  let difY = difYa + difYb + 20
  let mouseX = e.pageX
  let mouseY = e.pageY - difY
  if (mouseX > window.innerWidth-200) {
      mouseX -= 200
  }
  if (mouseY < difY) {
      mouseY += difY
  }
  rcmenu.style = `position: absolute; top: ${mouseY}px; left: ${mouseX}px`
  rcmenu.style.display = "block"
})

window.addEventListener('click', (e) => {
  document.getElementById("rcmenu").style.display = "none"
  let highlight = ""
  highlight = getHighlightedText()
  if (highlight == "") {
      try {
        let removed_child = document.getElementById("funcs").removeChild(document.getElementById("temp"))
        removed_child = document.getElementById("funcs").removeChild(document.getElementById("temp")) 
      } catch (error) {
        // irrelevant
      };
      highlight = ""
  }
})