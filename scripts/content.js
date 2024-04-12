sendMessage();

function sendMessage() {
    // `document.querySelector` may return null if the selector doesn't match anything.
    let frameElement = document.querySelector("iframe");
    if (frameElement) {
        chrome.runtime.sendMessage({
            type: 'pdfUrl',
            data: frameElement.getAttribute("src").replace("https://legislation.mt//Pdf/web/viewer.html?file=", "")
        });
    }
}