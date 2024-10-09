// Extract the UUID from the current URL
const url = window.location.href;
const uuidRegex = /https:\/\/dropdrive\.co\/file\/([a-zA-Z0-9-]+)/;
const match = url.match(uuidRegex);

if (match && match[1]) {
    const uuid = match[1];
    console.log("Detected UUID:", uuid);

    // Send the UUID to the background script to inject the modified JavaScript
    chrome.runtime.sendMessage({action: "injectScript", uuid: uuid});
}
