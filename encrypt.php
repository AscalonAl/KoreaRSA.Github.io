<?php

function encipher($publicKey, $plainText) {
    $cipherText = [];
    $n = 3337; // The modulus value from the original Python code
    foreach (str_split($plainText) as $char) {
        $i = ord($char);
        $cipher = ($i ** $publicKey) % $n;
        $cipherText[] = $cipher;
    }
    return implode(' ', $cipherText);
}

function decipher($privateKey, $cipherText) {
    $plainText = '';
    $n = 3337; // The modulus value from the original Python code
    $cipherArray = explode(' ', $cipherText);
    foreach ($cipherArray as $cipher) {
        $i = (int)$cipher;
        $plainChar = chr(($i ** $privateKey) % $n);
        $plainText .= $plainChar;
    }
    return $plainText;
}

$publicKey = 79;
$privateKey = 1019;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $inputText = $_POST['inputText'] ?? '';
    $cipherText = encipher($publicKey, $inputText);
    echo "<h2>Encrypted Text:</h2><p>$cipherText</p>";
}

?>
