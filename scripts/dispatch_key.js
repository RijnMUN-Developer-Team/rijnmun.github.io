function press_key(x) {
    document.dispatchEvent(new KeyboardEvent('keypress', {'key': x, 'keyCode': x.charCodeAt(0), 'which': x.charCodeAt(0)}));
}