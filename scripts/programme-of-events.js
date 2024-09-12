function toggle_col_key() {
    let eye = document.getElementById('eye')
    let key = document.getElementById('key')
    if (eye.classList.contains('fa-eye')) {
        eye.classList.remove('fa-eye')
        eye.classList.add('fa-eye-slash')
        key.style.transition = "opacity 0.2s linear"
        key.style.opacity = 0
        eye.style.opacity = 1
    } else {
        eye.classList.add('fa-eye')
        eye.classList.remove('fa-eye-slash')
        key.style.transition = "opacity 0.2s linear"
        eye.style.opacity = 1
        key.style.opacity = 1
    }
}