export function textToHex(text) {
    return btoa(unescape(encodeURIComponent(text)));
}

export function generateRandHexEncodedNamespaceID() {
    const array = new Uint8Array(29);
    (window.crypto || crypto).getRandomValues(array);
    let binary = '';
    for (let i = 0; i < array.byteLength; i++) {
        binary += String.fromCharCode(array[i]);
    }
    return btoa(binary);
}
