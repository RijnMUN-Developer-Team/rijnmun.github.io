window.addEventListener('load', () => {
    const is_staff = window.localStorage.getItem('staffID')
    if (is_staff != window.atob('VW1scWJrMVZUaUEyT1RReU1BPT0=')) {
        const staff_key = window.prompt('Please enter the staff key:')
        if (staff_key === window.atob('MjAyNCBSaWpuTVVO')) {
            window.localStorage.setItem('staffID', window.atob('VW1scWJrMVZUaUEyT1RReU1BPT0='))
            // window.location.reload()
        } else {
            alert('Authentication failed')
            window.location.replace('/')
        }
    }
})