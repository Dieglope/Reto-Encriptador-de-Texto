document.addEventListener("DOMContentLoaded", () => {
    const inputTextArea = document.getElementById("input-text");
    const outputMessage = document.getElementById("output-message");
    const outputImage = document.getElementById("output-image");
    const outputText = document.getElementById("output-text");
    const instructionText = document.getElementById("instruction-text");
    const copyBtn = document.getElementById("copy-btn");

    const encryptBtn = document.querySelector(".encrypt-btn");
    const decryptBtn = document.querySelector(".decrypt-btn");

    const encryptionKeys = {
        "e": "enter",
        "i": "imes",
        "a": "ai",
        "o": "ober",
        "u": "ufat"
    };

    const decryptionKeys = Object.fromEntries(
        Object.entries(encryptionKeys).map(([key, value]) => [value, key])
    );

    function encryptText(text) {
        return text.replace(/[eioua]/g, match => encryptionKeys[match]);
    }

    function decryptText(text) {
        return text.replace(/enter|imes|ai|ober|ufat/g, match => decryptionKeys[match]);
    }

    function handleEncryption(isEncrypt) {
        const text = inputTextArea.value;
        let result = "";
        if (text) {
            result = isEncrypt ? encryptText(text) : decryptText(text);
            inputTextArea.value = ""; // Clear the input text area
            outputText.innerText = result;
            outputImage.style.display = "none";
            outputText.style.display = "block";
            instructionText.style.display = "none";
            copyBtn.style.display = "block";
        } else {
            outputText.innerText = "Ningún mensaje fue encontrado";
            outputImage.style.display = "block";
            instructionText.style.display = "block";
            copyBtn.style.display = "none";
        }
    }

    function selectText(element) {
        const range = document.createRange();
        range.selectNodeContents(element);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    }

    encryptBtn.addEventListener("click", () => handleEncryption(true));
    decryptBtn.addEventListener("click", () => handleEncryption(false));

    copyBtn.addEventListener("click", () => {
        selectText(outputText); // Select the text before copying
        navigator.clipboard.writeText(outputText.innerText).catch(err => {
            console.error("Error al copiar el texto: ", err);
        });
    });
});
