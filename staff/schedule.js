const last_row = 87
const link = "https://docs.google.com/spreadsheets/d/18yXyhI0yQshZ4fUWypPzGXWJNaUNKwJBkXcEXavWxPI/pubhtml?gid=0&amp;single=false&amp;widget=false&amp;headers=false&amp;chrome=false&amp;range="

let categories = {
    0: {'name': 'BOD', 'column': 'C'},
    1: {'name': 'Lunch Team', 'column': 'D'},
    2: {'name': 'Admin Team A', 'column': 'E'},
    3: {'name': 'Admin Team B', 'column': 'F'},
    4: {'name': 'Admin Team C', 'column': 'G'},
    5: {'name': 'Admin Team D', 'column': 'H'},
    6: {'name': 'Admin Team E', 'column': 'I'},
    7: {'name': 'Admin Team F', 'column': 'J'},
    8: {'name': 'TC', 'column': 'K'},
    9: {'name': 'Approval Panel', 'column': 'L'},
    10: {'name': 'StOff', 'column': 'M'},
    11: {'name': 'GA1', 'column': 'N'},
    12: {'name': 'GA3', 'column': 'O'},
    13: {'name': 'GA4', 'column': 'P'},
    14: {'name': 'HRC', 'column': 'Q'},
    15: {'name': 'SC', 'column': 'R'},
    16: {'name': 'MUN Directors', 'column': 'S'}
}

// document.addEventListener('DOMContentLoaded', () => {
//     const range_form = document.getElementById('range-selection')
//     for (x of Object.keys(categories)) {
//         range_form.innerHTML += `<div class="range-opt-cont">
//             <input class="range-opt" type="checkbox" name="${categories[x].name}" checked>
//             <label for="${categories[x].name}">${categories[x].name}</label>
//         </div>`
//     }
//     range_form.addEventListener('change', () => {
//         const opts = document.getElementsByClassName('range-opt')
//         let range = `A1:A${last_row};B1:B${last_row}`
//         for (i of Object.keys(categories)) {
//             // console.log(opts[i].checked)
//             if (opts[i].checked) range += `;${categories[i].column}1:${categories[i].column}${last_row}`
//         }
//         console.log(link+range)
//         document.getElementById('timeline').setAttribute('src', link+range)
//         // document.getElementById('timeline').contentWindow.location.reload()
//     })
// })