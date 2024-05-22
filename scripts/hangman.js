import { words } from "./words.js"

let previous_words = []
let game_over = false

try {
    previous_words = window.localStorage.getItem('previous_words').split(',')
} catch(err) {
    console.log(err)
    console.log(previous_words)
}

// GAME SETUP
// console.log(words.length)
let parsed_words = words.filter( ( x ) => !previous_words.includes( x ) );
if (parsed_words.length == 0) {
    parsed_words = words
    window.localStorage.setItem("previous_words", "")
}
// console.log(parsed_words.length)
// console.log(parsed_words)
let word = parsed_words[Math.floor(Math.random() * parsed_words.length)]
// word = word.toLocaleLowerCase()
// console.log(previous_words)
previous_words.push(word)
// console.log(previous_words)
let guessed_letters = []
// console.log(word)
const stickman = ['bottom', 'side', 'top', 'diagonal', 'rope', 'head', 'body', 'left_arm', 'right_arm', 'left_leg', 'right_leg']
function reveal(part) {
    document.getElementById(part).style.opacity = 1
}

const word_area = document.getElementById('word')
let inner_word_area = ""
for (let i = 0; i < word.length; i++) {
    inner_word_area += `<p id="char${i}">__</p>`
}
word_area.innerHTML = inner_word_area
let letters_guessed = 0
let errors = 0

if (document.cookie == '') {
    document.getElementById('score').innerHTML = "Words found: 0"
} else {
    let points = parseInt(document.cookie.split("=")[1], 10)
    document.getElementById('score').innerHTML = `Words found: ${points}`
}

// GAME
let allowed = "abcdefghijklmnopqrstuvwxyz"
document.onkeypress = function (e) {
    e = e || window.event;
    // alert(String.fromCharCode(e.keyCode))
    let letter = String.fromCharCode(e.keyCode)
    if (!game_over && allowed.includes(letter)) {
        if (!guessed_letters.includes(letter)) {
            guessed_letters.push(letter)
            document.getElementById(`char${letter}`).style.opacity = 0.3
            if (word.includes(letter)) {
                for (let x = 0; x < word.length; x++) {
                    if (word[x] == letter) {
                        document.getElementById(`char${x}`).innerHTML = letter.toUpperCase()
                        letters_guessed++
                    }
                }
            } else {
                reveal(stickman[errors])
                errors++
            }
            setTimeout(() => {
                if (letters_guessed == word.length) {
                    window.localStorage.setItem("previous_words", previous_words)
                    document.getElementById('msg').innerHTML = `<p>Congratulations! You guessed the word!</p>`
                    document.getElementById('new_game').style.display = "flex"
                    if (document.cookie == '') {
                        document.cookie = 'points=1; SameSite=Strict; Secure'
                        document.getElementById('score').innerHTML = "Words found: 1"
                    } else {
                        let points = parseInt(document.cookie.split("=")[1], 10)
                        points++
                        document.cookie = `points=${points}; SameSite=Strict; Secure`
                        document.getElementById('score').innerHTML = `Words found: ${points}`
                    }
                    game_over = true
                } else if (errors == stickman.length) {
                    game_over = true
                    window.localStorage.setItem("previous_words", previous_words)
                    document.getElementById('msg').innerHTML = `<p>The word was <strong>${word}</strong>. Better luck next time!</p>`
                    document.getElementById('new_game').style.display = "flex"
                }
            }, 10)
        }
    }
}   