function textToHex(text) {
    return Buffer.from(text, 'utf8').toString('base64');
}

module.exports = {
    textToHex,
    generateRandHexEncodedNamespaceID
}

// 1c415d6dab9d0f46
// a994bc4dde53e400
function generateRandHexEncodedNamespaceID() {
    const crypto = require('crypto'); // For Node.js; in browsers, 'crypto' is global
    const array = new Uint8Array(29); // Using 21 bytes
    crypto.randomFillSync(array); // For Node.js; use crypto.getRandomValues(array) in a web environment
    return Buffer.from(array).toString('base64');
}
