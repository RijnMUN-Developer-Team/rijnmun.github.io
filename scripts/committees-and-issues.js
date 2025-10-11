import { resos } from "./resos.js"

document.addEventListener("DOMContentLoaded", () => {
    try {
        on_DOM_loaded
    } catch(err) {}
})

function on_DOM_loaded() {
    const committees = Object.keys(resos)
    committees.forEach(committee => {
        // const reso_cont = document.getElementById(`resos-${committee}`)
        const approved_cont = document.getElementById(`approved-${committee}`)
        const active_cont = document.getElementById(`active-${committee}`)
        const passed_cont = document.getElementById(`passed-${committee}`)
        approved_cont.innerHTML = '<h4>Approved Resolutions</h4>'
        active_cont.innerHTML = '<h4>Resolution in Debate</h4>'
        passed_cont.innerHTML = '<h4>Passed Resolutions</h4>'
        if (resos[`${committee}`].approved.length == 0) {
            approved_cont.innerHTML += `<p class="no-resos">None found</p>`
        } else {
            for (const approved_reso of resos[`${committee}`].approved) {
                approved_cont.innerHTML += `<p class="reso-link"><a target="_blank" href="${approved_reso.link}">${approved_reso.name}</a></p>`
            }
        }
        if (resos[`${committee}`].active.length == 0) {
            active_cont.innerHTML += `<p class="no-resos">None found</p>`
        } else {
            for (const active_reso of resos[`${committee}`].active) {
                active_cont.innerHTML += `<p class="reso-link"><a target="_blank" href="${active_reso.link}">${active_reso.name}</a></p>`
            }
        }
        if (resos[`${committee}`].passed.length == 0) {
            passed_cont.innerHTML += `<p class="no-resos">None found</p>`
        } else {
            for (const passed_reso of resos[`${committee}`].passed) {
                passed_cont.innerHTML += `<p class="reso-link"><a target="_blank" href="${passed_reso.link}">${passed_reso.name}</a></p>`
            }
        }
    })
}