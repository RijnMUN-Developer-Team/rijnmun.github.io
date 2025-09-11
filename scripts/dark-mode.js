const body = document.body;

// Listen for keypress (example: "D" key for Dark mode)
document.addEventListener('keydown', (event) => {
    // You can change 'KeyD' to another key
    if (event.code === 'KeyD') {
        body.classList.toggle('dark');

        // Save preference
        if (body.classList.contains('dark')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    }
});

// Load saved theme on page load
window.addEventListener('load', () => {
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark');
    }
});
