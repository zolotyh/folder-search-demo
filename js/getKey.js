module.exports = function getKey() {
    var KEY = 'wrike.api.key',
        keyFromStorage = localStorage.getItem(KEY),
        key;

    if (keyFromStorage) {
        key = keyFromStorage;
    } else {
        key = prompt('For work you need to add permananent access token from Wrike API console');
        localStorage.setItem(KEY, key);
    }
    return key;
}
