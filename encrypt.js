function modExp(base, exp, mod) {
    let result = 1;
    base = base % mod;
    while (exp > 0) {
        if (exp % 2 === 1) {
            result = (result * base) % mod;
        }
        exp = Math.floor(exp / 2);
        base = (base * base) % mod;
    }
    return result;
}

function encipher(publicKey, plainText) {
    const n = 3337;
    let cipherText = '';
    let numericValues = [];
    for (let char of plainText) {
        const i = char.charCodeAt(0);
        const cipher = modExp(i, publicKey, n);
        cipherText += String.fromCharCode(cipher);
        numericValues.push(cipher);
    }
    return { cipherText, numericValues: numericValues.join(' ') };
}

function decipher(privateKey, cipherText) {
    const n = 3337;
    let plainText = '';
    for (let char of cipherText) {
        const i = char.charCodeAt(0);
        const plainChar = String.fromCharCode(modExp(i, privateKey, n));
        plainText += plainChar;
    }
    return plainText;
}

// Handle form submission
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('encryptionForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = document.querySelector('input').value;
        const publicKey = 79;
        const { cipherText, numericValues } = encipher(publicKey, input);
        window.location.href = `result.html?encrypted=${encodeURIComponent(cipherText)}&numbers=${encodeURIComponent(numericValues)}`;
    });
});
